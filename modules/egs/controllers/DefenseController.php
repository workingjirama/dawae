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
    public function actionFindAll()
    {
        $defense = EgsDefense::find()->where(['!=', 'student_id', Config::$SYSTEM_ID])->all();
        return Json::encode(Format::defenseForListing($defense));
    }

    public function actionEvent()
    {
        $post = Json::decode(Yii::$app->request->post('json'));
        $defenses = EgsDefense::find()->where([
            'calendar_id' => $post['calendarId'],
            'level_id' => $post['levelId'],
            'semester_id' => $post['semesterId'],
            'defense_type_id' => $post['defenseTypeId'],
            'room_id' => $post['roomId'],
            'owner_id' => $post['ownerId']
        ])->all();
        return Json::encode(Format::defenseEvent($defenses));
    }

    public function actionFind()
    {
        $user = Config::get_current_user();
        $user_id = (int)$user['user_type_id'] === Config::$PERSON_STAFF_TYPE ? Config::$SYSTEM_ID : $user['id'];
        $post = Json::decode(Yii::$app->request->post('json'));
        $defense = EgsDefense::findOne([
            'student_id' => $user_id,
            'calendar_id' => $post['calendarId'],
            'action_id' => $post['actionId'],
            'level_id' => $post['levelId'],
            'semester_id' => $post['semesterId'],
            'defense_type_id' => $post['defenseTypeId'],
            'owner_id' => $post['ownerId']
        ]);
        if (empty($defense)) return Json::encode(null);
        $format = new Format();
        return Json::encode(Format::defense($defense));
    }

    public function actionUpdateResult()
    {
        $post = Json::decode(Yii::$app->request->post('json'));
        $comment = preg_replace('/[\n\r]/', '<br/>', $post['comment']);
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
        $defense->defense_credit = $post['credit'];
        $defense->defense_comment = $post['comment'];
        $defense_pass = $defense->defense_score >= Config::$PASS_DEFENSE_SCORE;
        $defense->defense_status_id = EgsActionOnStatus::find()
            ->joinWith(['status s'])
            ->where([
                'action_id' => $defense->defense_type_id,
                'on_status_id' => $defense_pass ? Config::$ON_SUCCESS : Config::$ON_FAIL,
                's.status_type_id' => Config::$STATUS_DEFENSE_TYPE
            ])->one()->status_id;
        $redo = $defense->defenseType->redo;
        if (!$defense_pass && $redo && $defense->owner_id === Config::$SYSTEM_ID) {
            $calendar_item = EgsCalendarItem::findOne([
                'calendar_id' => $defense->calendar_id,
                'action_id' => $defense->action_id,
                'level_id' => $defense->level_id,
                'semester_id' => $defense->semester_id,
                'owner_id' => $defense->student_id
            ]);
            if (empty($calendar_item)) {
                $calendar_item = new EgsCalendarItem();
                $calendar_item->calendar_id = $defense->calendar_id;
                $calendar_item->action_id = $defense->action_id;
                $calendar_item->level_id = $defense->level_id;
                $calendar_item->semester_id = $defense->semester_id;
                $calendar_item->owner_id = $defense->student_id;
                $calendar_item->calendar_item_date_start = $defense->defense_date;
                $calendar_item->calendar_item_date_end = date('Y-m-d', strtotime($defense->defense_date . ' + ' . Config::$FINAL_REQUEST_PLUS_DATE . ' days'));
                if (!$calendar_item->save()) return Json::encode($calendar_item->errors);
            } else {
                foreach ($defense->calendar->calendar->semester->action->egsRequestDefenses0 as $request_defense) {
                    $calendar_item_ = EgsCalendarItem::findOne([
                        'calendar_id' => $defense->calendar_id,
                        'action_id' => $request_defense->defense_type_id,
                        'level_id' => $defense->level_id,
                        'semester_id' => $defense->semester_id,
                        'owner_id' => $defense->student_id
                    ]);
                    if (!empty($calendar_item_)) {
                        $calendar_item_->delete();
                    }
                }
            }
            foreach ($defense->calendar->calendar->semester->action->egsRequestDefenses0 as $request_defense) {
                $calendar_item_ = new EgsCalendarItem();
                $calendar_item_->calendar_id = $defense->calendar_id;
                $calendar_item_->action_id = $request_defense->defense_type_id;
                $calendar_item_->level_id = $defense->level_id;
                $calendar_item_->semester_id = $defense->semester_id;
                $calendar_item_->owner_id = $defense->student_id;
                $calendar_item_->calendar_item_date_start = $defense->defense_date;
                $calendar_item_->calendar_item_date_end = date('Y-m-d', strtotime($defense->defense_date . ' + ' . Config::$FINAL_DEFENSE_PLUS_DATE . ' days'));
                if (!$calendar_item_->save()) return Json::encode($calendar_item_->errors);
            }
        }
        $defense->save();
        return Json::encode(Format::defenseForListing($defense));
    }
}