<?php

namespace app\modules\egs\controllers;

use app\modules\egs\models\EgsActionDocument;
use app\modules\egs\models\EgsActionOnStatus;
use app\modules\egs\models\EgsAdvisor;
use app\modules\egs\models\EgsBranch;
use app\modules\egs\models\EgsBranchBinder;
use app\modules\egs\models\EgsCommittee;
use app\modules\egs\models\EgsCommitteeFee;
use app\modules\egs\models\EgsDefense;
use app\modules\egs\models\EgsDefenseDocument;
use app\modules\egs\models\EgsLevelBinder;
use app\modules\egs\models\EgsLoad;
use app\modules\egs\models\EgsPlanBinder;
use app\modules\egs\models\EgsRequestDocument;
use app\modules\egs\models\EgsRequestFee;
use app\modules\egs\models\EgsUserRequest;
use Yii;

use app\modules\egs\models\EgsActionItem;
use app\modules\egs\models\EgsCalendar;
use app\modules\egs\models\EgsCalendarItem;

use yii\base\Module;
use yii\helpers\Json;
use yii\web\Controller;


class UserRequestController extends Controller
{
    private $COMMITTEE_MAIN_FEE_PERCENTAGE = .4;
    private $COMMITTEE_CO_FEE_PERCENTAGE = .6;

    public function actionFindAll()
    {
        $user_request = EgsUserRequest::find()->andWhere(['!=', 'student_id', Config::$SYSTEM_ID])->all();
        $user = Config::get_current_user();
        $format = new Format();
        return Json::encode(Format::userRequestForListing($user_request, $user['user_type_id']));
    }

    private function committeeFeeCalculator($action_id, $branch_id, $level_id, $plan_type_id, $committee_amount)
    {
        $amount = [];
        $committee_fee = EgsCommitteeFee::findOne([
            'action_id' => $action_id,
            'branch_id' => $branch_id,
            'level_id' => $level_id,
            'plan_type_id' => $plan_type_id
        ]);
        if (empty($committee_fee)) {
            $amount[Config::$COMMITTEE_MAIN_POSITION] = 0;
            $amount[Config::$COMMITTEE_CO_POSITION] = 0;
        } else {
            $amount[Config::$COMMITTEE_MAIN_POSITION] = $committee_fee->committee_fee_amount * $this->COMMITTEE_MAIN_FEE_PERCENTAGE;
            $amount[Config::$COMMITTEE_CO_POSITION] = ($committee_fee->committee_fee_amount * $this->COMMITTEE_CO_FEE_PERCENTAGE) / $committee_amount;
        }
        return $amount;
    }

    public function actionUpdateFee()
    {
        $post = Json::decode(Yii::$app->request->post('json'));
        $user_request = EgsUserRequest::findOne([
            'student_id' => $post['studentId'],
            'calendar_id' => $post['calendarId'],
            'action_id' => $post['actionId'],
            'level_id' => $post['levelId'],
            'semester_id' => $post['semesterId'],
            'owner_id' => $post['owner_id']
        ]);
        $user_request->request_fee_status_id = $post['paid'] ? Config::$FEE_STATUS_PAID : Config::$FEE_STATUS_NOT_PAY;
        if (!$user_request->save()) return $user_request->errors;
        return Json::encode(Format::userRequestForListing($user_request));
    }

    public function actionInsert()
    {
        /* NOTE: INITIALIZE DATA */
        $post = Json::decode(Yii::$app->request->post('json'));
        $calendar_item_ = $post['calendarItem'];
        $is_defense = $post['isDefense'];
        $teachers = $post['teachers'];
        $defenses = $post['defenses'];
        $init = $post['init'];
        $student = Config::get_current_user();
        $student_id = (int)$student['user_type_id'] === Config::$PERSON_STAFF_TYPE ? Config::$SYSTEM_ID : $student['id'];
        $program_id = $student['program_id'];
        $branch = EgsBranchBinder::find()->where(['reg_program_id' => $program_id])->one();
        $level = EgsLevelBinder::find()->where(['reg_program_id' => $program_id])->one();
        $plan_type = EgsPlanBinder::find()->where(['reg_program_id' => $program_id])->one();
        $branch_id = empty($branch) ? null : $branch->branch_id;
        $level_id = empty($level) ? null : $level->level_id;
        $plan_type_id = empty($plan_type) ? null : $plan_type->plan->plan_type_id;
        /* NOTE: FIND IF USER REQUEST EXIST */
        $user_request = EgsUserRequest::findOne([
            'student_id' => $student_id,
            'calendar_id' => $calendar_item_['calendarId'],
            'action_id' => $calendar_item_['actionId'],
            'level_id' => $calendar_item_['levelId'],
            'semester_id' => $calendar_item_['semesterId'],
            'owner_id' => $calendar_item_['owner_id']
        ]);
        if (empty($user_request)) {
            /* NOTE: IF NOT INSERT */
            $user_request = new EgsUserRequest();
            $user_request->student_id = $student_id;
            $user_request->calendar_id = $calendar_item_['calendarId'];
            $user_request->action_id = $calendar_item_['actionId'];
            $user_request->level_id = $calendar_item_['levelId'];
            $user_request->semester_id = $calendar_item_['semesterId'];
            $user_request->owner_id = $calendar_item_['owner_id'];
        } else {
            /* NOTE: IF EXIST DELETE ALL CHILDS */
            foreach ($user_request->egsRequestDocuments as $request_document) $request_document->delete();
            foreach ($user_request->egsAdvisors as $advisor) $advisor->delete();
            foreach ($user_request->egsDefenses as $defense) {
                foreach ($defense->egsDefenseDocuments as $defense_document)
                    $defense_document->delete();
                foreach ($defense->egsCommittees as $committee)
                    $committee->delete();
                $defense->delete();
            }
        }
        $request_fee = EgsRequestFee::findOne([
            'plan_id' => empty($plan_type) ? null : $plan_type->plan_id,
            'branch_id' => $branch_id,
            'action_id' => $calendar_item_['actionId']
        ]);
        $user_request->request_fee = empty($request_fee) ? 0 : $request_fee->request_fee_amount;
        $user_request->request_fee_status_id = $user_request->request_fee === 0 ? Config::$DONT_NEED_TO_PAY : Config::$FEE_STATUS_NOT_PAY;
        /* NOTE: IF SAVE AND NOT INITAILIZE */
        if ($user_request->save()) {
            if (!$init) {
                /* NOTE: FIND & INSERT DOCUMENT OF THIS ACTION */
                $action_documents = EgsActionDocument::findAll([
                    'action_id' => $user_request->action_id
                ]);
                foreach ($action_documents as $action_document) {
                    $request_document = new EgsRequestDocument();
                    $request_document->student_id = $student_id;
                    $request_document->calendar_id = $user_request->calendar_id;
                    $request_document->action_id = $user_request->action_id;
                    $request_document->level_id = $user_request->level_id;
                    $request_document->semester_id = $user_request->semester_id;
                    $request_document->owner_id = $user_request->owner_id;
                    $request_document->document_id = $action_document->document_id;
                    $request_document->request_document_status_id = Config::$DOC_STATUS_NOT_SUBMITTED;
                    if (!$request_document->save()) return Json::encode($request_document->errors);
                }
            }
            if (!$is_defense) {
                /* NOTE: IF NOT DEFENSE INSERT ADVISOR */
                foreach ($teachers as $teacher) {
                    $advisor = new EgsAdvisor();
                    $advisor->teacher_id = $teacher['teacher'];
                    $advisor->position_id = $teacher['position'];
                    $advisor->student_id = $user_request->student_id;
                    $advisor->action_id = $user_request->action_id;
                    $advisor->calendar_id = $user_request->calendar_id;
                    $advisor->level_id = $user_request->level_id;
                    $advisor->semester_id = $user_request->semester_id;
                    $advisor->student_id = $user_request->student_id;
                    $advisor->owner_id = $user_request->owner_id;
                    $advisor->load_id = $plan_type_id;
                    if (!$advisor->save()) return Json::encode($advisor->errors);
                }
            } else {
                /* NOTE: IF DEFENSE INSERT DEFENSE & COMMITEE */
                foreach ($defenses as $defense_) {
                    $defense_type_id = $defense_['type'];
                    $defense = new EgsDefense();
                    $defense->student_id = $user_request->student_id;
                    $defense->calendar_id = $user_request->calendar_id;
                    $defense->action_id = $user_request->action_id;
                    $defense->level_id = $user_request->level_id;
                    $defense->semester_id = $user_request->semester_id;
                    $defense->owner_id = $user_request->owner_id;
                    $defense->defense_type_id = $defense_type_id;
                    $defense->defense_date = $defense_['date'];
                    $defense->defense_time_start = $defense_['start'];
                    $defense->defense_time_end = $defense_['end'];
                    $defense->room_id = $defense_['room'];
                    $defense->defense_status_id = Config::$DEFENSE_STATUS_DEFAULT;
                    if ($defense->save()) {
                        if (!$init) {
                            $action_documents = EgsActionDocument::findAll([
                                'action_id' => $defense->defense_type_id
                            ]);
                            foreach ($action_documents as $action_document) {
                                $defense_document = new EgsDefenseDocument();
                                $defense_document->defense_type_id = $defense->defense_type_id;
                                $defense_document->student_id = $student_id;
                                $defense_document->calendar_id = $user_request->calendar_id;
                                $defense_document->action_id = $user_request->action_id;
                                $defense_document->level_id = $user_request->level_id;
                                $defense_document->semester_id = $user_request->semester_id;
                                $defense_document->owner_id = $user_request->owner_id;
                                $defense_document->document_id = $action_document->document_id;
                                $defense_document->defense_document_status_id = Config::$DOC_STATUS_NOT_SUBMITTED;
                                if (!$defense_document->save()) return Json::encode($defense_document->errors);
                            }
                        }
                        $fee = $this->committeeFeeCalculator($defense->defense_type_id, $branch_id, $level_id, $plan_type_id, sizeof($teachers));
                        foreach ($teachers as $teacher) {
                            $committee = new EgsCommittee();
                            $committee->teacher_id = $teacher['teacher'];
                            $committee->position_id = $teacher['position'];
                            $committee->student_id = $defense->student_id;
                            $committee->action_id = $defense->action_id;
                            $committee->calendar_id = $defense->calendar_id;
                            $committee->level_id = $defense->level_id;
                            $committee->semester_id = $defense->semester_id;
                            $committee->defense_type_id = $defense->defense_type_id;
                            $committee->owner_id = $defense->owner_id;
                            $committee->committee_fee = $fee[$teacher['position']];
                            if (!$committee->save()) return Json::encode($committee->errors);
                        }
                    } else {
                        return Json::encode($defense->errors);
                    }
                }
            }
        } else {
            return Json::encode($user_request->errors);
        }

        if ($init) {
            $calendar_item = EgsCalendarItem::findOne([
                'calendar_id' => $calendar_item_['calendarId'],
                'action_id' => $calendar_item_['actionId'],
                'level_id' => $calendar_item_['levelId'],
                'semester_id' => $calendar_item_['semesterId'],
                'owner_id' => Config::$SYSTEM_ID
            ]);
            $calendar_item->calendar_item_date_start = $defenses[0]['date'];
            $calendar_item->calendar_item_date_end = $defenses[0]['date'];
            if (!$calendar_item->save()) return Json::encode($calendar_item->errors);
            return Json::encode($calendar_item);
        }
        return Json::encode(null);
    }

}