<?php

namespace app\modules\egs\controllers;

use app\modules\egs\models\EgsActionOnStatus;
use app\modules\egs\models\EgsAdvisor;
use app\modules\egs\models\EgsCommittee;
use app\modules\egs\models\EgsDefense;
use app\modules\egs\models\EgsUserRequest;
use Yii;

use app\modules\egs\models\EgsActionItem;
use app\modules\egs\models\EgsCalendar;
use app\modules\egs\models\EgsCalendarItem;

use yii\base\Module;
use yii\helpers\Json;
use yii\web\Controller;

class DefenseController extends Controller
{
    private $FINAL_REQUEST_PLUS_DATE = 365;
    private $FINAL_DEFENSE_PLUS_DATE = 730;

    public function actionEvent()
    {
        $post = Json::decode(Yii::$app->request->post('json'));
        $defenses = EgsDefense::find()->where([
            'calendar_id' => $post['calendarId'],
            'level_id' => $post['levelId'],
            'semester_id' => $post['semesterId'],
            'defense_type_id' => $post['defenseTypeId'],
            'owner_id' => $post['ownerId']
        ])->all();
        $teachers = [];
        foreach ($post['teachers'] as $teacher) {
            $person = Config::get_one_user($teacher['teacher']);
            $teacher_ = Format::personNameOnly($person);
            array_push($teachers, $teacher_);
        }
        return Json::encode(Format::defenseEvent($defenses, $teachers));
    }

    public function actionFind()
    {
        $user = Config::get_current_user();
        $user_id = (int)$user['user_type_id'] === Config::$PERSON_STAFF_TYPE ? Config::$SYSTEM_ID : $user['id'];
        $post = Json::decode(Yii::$app->request->post('json'));
        $defense = EgsDefense::findOne([
            'student_id' => $user_id,
            'calendar_id' => $post['calendar_id'],
            'level_id' => $post['level_id'],
            'semester_id' => $post['semester_id'],
            'defense_type_id' => $post['action_id'],
            'owner_id' => $post['owner_id']
        ]);
        if (empty($defense)) return Json::encode(null);
        return Json::encode(Format::defense($defense));
    }

    public function actionUpdateResult()
    {
        $user = Config::get_current_user();
        $post = Json::decode(Yii::$app->request->post('json'));
        $cond = $post['cond'];
        $comment = preg_replace('/[\n\r]/', '<br/>', $post['comment']);
        $defense_pass = $post['score'] >= Config::$PASS_DEFENSE_SCORE;
        $defense = EgsDefense::findOne([
            'student_id' => $post['studentId'],
            'calendar_id' => $post['calendarId'],
            'action_id' => $post['actionId'],
            'level_id' => $post['levelId'],
            'semester_id' => $post['semesterId'],
            'defense_type_id' => $post['defenseTypeId'],
            'owner_id' => $post['ownerId']
        ]);
        $defense->defense_score = $post['score'];
        $defense->defense_credit = $defense->defenseType->action_credit ? $post['credit'] : null;
        $defense->defense_comment = $comment;
        $defense->defense_status_id = $defense_pass ? $cond ? Config::$DEFENSE_STATUS_PASS_CON : Config::$DEFENSE_STATUS_PASS : Config::$DEFENSE_STATUS_FAIL;
        if (!$defense->save()) return Json::encode($defense->errors);
        $redo = $defense->defenseType->action_redo;
        if ($redo && $defense->owner_id === Config::$SYSTEM_ID) {
            $calendar_item = EgsCalendarItem::findOne([
                'calendar_id' => $defense->calendar_id,
                'action_id' => $defense->action_id,
                'level_id' => $defense->level_id,
                'semester_id' => $defense->semester_id,
                'owner_id' => $defense->student_id
            ]);
            if ($defense_pass) {
                if (!empty($calendar_item)) {
                    foreach ($calendar_item->semester->action->egsRequestDefenses0 as $request_defense) {
                        $calendar_item_ = EgsCalendarItem::findOne([
                            'calendar_id' => $defense->calendar_id,
                            'action_id' => $request_defense->defense_type_id,
                            'level_id' => $defense->level_id,
                            'semester_id' => $defense->semester_id,
                            'owner_id' => $defense->student_id
                        ]);
                        $calendar_item_->delete();
                    }
                    $calendar_item->delete();
                }
            } else {
                if (empty($calendar_item)) {
                    $calendar_item = new EgsCalendarItem();
                    $calendar_item->calendar_id = $defense->calendar_id;
                    $calendar_item->action_id = $defense->action_id;
                    $calendar_item->level_id = $defense->level_id;
                    $calendar_item->semester_id = $defense->semester_id;
                    $calendar_item->owner_id = $defense->student_id;
                    $calendar_item->calendar_item_date_start = $defense->defense_date;
                    $calendar_item->calendar_item_date_end = date('Y-m-d', strtotime($defense->defense_date . ' + ' . $this->FINAL_REQUEST_PLUS_DATE . ' days'));
                    if ($calendar_item->save()) {
                        foreach ($calendar_item->semester->action->egsRequestDefenses0 as $request_defense) {
                            $calendar_item_ = EgsCalendarItem::findOne([
                                'calendar_id' => $defense->calendar_id,
                                'action_id' => $request_defense->defenseType->action_id,
                                'level_id' => $defense->level_id,
                                'semester_id' => $defense->semester_id,
                                'owner_id' => $defense->student_id
                            ]);
                            if (empty($calendar_item_)) {
                                $calendar_item_ = new EgsCalendarItem();
                                $calendar_item_->calendar_id = $defense->calendar_id;
                                $calendar_item_->action_id = $request_defense->defense_type_id;
                                $calendar_item_->level_id = $defense->level_id;
                                $calendar_item_->semester_id = $defense->semester_id;
                                $calendar_item_->owner_id = $defense->student_id;
                            }
                            $calendar_item_->calendar_item_date_start = $defense->defense_date;
                            $calendar_item_->calendar_item_date_end = date('Y-m-d', strtotime($defense->defense_date . ' + ' . $this->FINAL_DEFENSE_PLUS_DATE . ' days'));
                            if (!$calendar_item_->save()) return Json::encode($calendar_item_->errors);
                        }
                    } else {
                        return Json::encode($calendar_item->errors);
                    }
                }
            }
        }
        foreach ($defense->calendar->egsRequestDocuments as $request_document) {
            if ($request_document->document->submit_type_id === Config::$SUBMIT_TYPE_AFTER) {
                $request_document->request_document_id = null;
                $request_document->request_document_status_id = !$defense_pass ? Config::$DOC_STATUS_NO_NEED : Config::$DOC_STATUS_NOT_SUBMITTED;
                $request_document->save();
            }
        }
        foreach ($defense->egsDefenseDocuments as $defense_document) {
            if ($defense_document->document->submit_type_id === Config::$SUBMIT_TYPE_AFTER) {
                $defense_document->defense_document_path = null;
                $defense_document->defense_document_status_id = ($defense_pass && !$cond) || !$defense_pass ? Config::$DOC_STATUS_NO_NEED : Config::$DOC_STATUS_NOT_SUBMITTED;
                $defense_document->save();
            }
        }
        return Json::encode(Format::userRequestForListing($defense->calendar));
    }
}