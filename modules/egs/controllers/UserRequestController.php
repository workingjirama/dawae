<?php

namespace app\modules\egs\controllers;

use app\modules\egs\models\EgsActionDocument;
use app\modules\egs\models\EgsAdvisor;
use app\modules\egs\models\EgsBranch;
use app\modules\egs\models\EgsBranchBinder;
use app\modules\egs\models\EgsCommittee;
use app\modules\egs\models\EgsCommitteeFee;
use app\modules\egs\models\EgsDefense;
use app\modules\egs\models\EgsLevelBinder;
use app\modules\egs\models\EgsPlanBinder;
use app\modules\egs\models\EgsRequestDocument;
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


    private $COMMITTEE_MAIN_POSITION = 3;
    private $COMMITTEE_CO_POSITION = 4;
    private $COMMITTEE_MAIN_FEE_PERCENTAGE = .4;
    private $COMMITTEE_CO_FEE_PERCENTAGE = .6;
    private $SUBMIT_TYPE_BEFORE = 1;
    private $SUBMIT_TYPE_AFTER = 2;

    public function actionFindAll()
    {
        $user_request = EgsUserRequest::find()->all();
        $format = new Format();
        return Json::encode($format->userRequestForListing($user_request));
    }

    private function committeeFeeCalculator($action_id, $committee_amount)
    {
        $value = [];
        $user_id = Yii::$app->session->get('id');
        $program_id = Yii::$app->getDb()->createCommand('SELECT * FROM view_pis_user WHERE id=' . $user_id)->queryOne()['program_id'];
        $branch_id = EgsBranchBinder::find()->where(['reg_program_id' => $program_id])->one()->branch_id;
        $level_id = EgsLevelBinder::find()->where(['reg_program_id' => $program_id])->one()->level_id;
        $plan_type_id = EgsPlanBinder::find()->where(['reg_program_id' => $program_id])->one()->plan->plan_type_id;
        $committee_fee = EgsCommitteeFee::findOne([
            'action_id' => $action_id,
            'branch_id' => $branch_id,
            'level_id' => $level_id,
            'plan_type_id' => $plan_type_id
        ]);
        $committee_fee->committee_fee_amount;
        $value[$this->COMMITTEE_MAIN_POSITION] = $committee_fee->committee_fee_amount * $this->COMMITTEE_MAIN_FEE_PERCENTAGE;
        $value[$this->COMMITTEE_CO_POSITION] = ($committee_fee->committee_fee_amount * $this->COMMITTEE_CO_FEE_PERCENTAGE) / $committee_amount;
        return $value;
    }

    public function actionInsert()
    {
        $user_id = Yii::$app->session->get('id');
        $post = Json::decode(Yii::$app->request->post('json'));
        $calendar_item_ = $post['calendarItem'];
        $is_defense = $post['isDefense'];
        $teachers = $post['teachers'];
        $defenses = $post['defenses'];
        $user_request = EgsUserRequest::findOne([
            'student_id' => $user_id,
            'calendar_id' => $calendar_item_['calendarId'],
            'action_id' => $calendar_item_['actionId'],
            'level_id' => $calendar_item_['levelId'],
            'semester_id' => $calendar_item_['semesterId']
        ]);
        if (empty($user_request)) {
            $user_request = new EgsUserRequest();
            $user_request->student_id = $user_id;
            $user_request->calendar_id = $calendar_item_['calendarId'];
            $user_request->action_id = $calendar_item_['actionId'];
            $user_request->level_id = $calendar_item_['levelId'];
            $user_request->semester_id = $calendar_item_['semesterId'];
            $user_request->doc_status_id = ($is_defense) ? 1 : 3;
            $user_request->pet_status_id = 4;
            if ($user_request->save()) {
                $action_documents = EgsActionDocument::find()->joinWith(['document d'])->where([
                    'action_id' => $user_request->action_id,
                    'd.submit_type_id' => $this->SUBMIT_TYPE_BEFORE
                ])->all();
                foreach ($action_documents as $action_document) {
                    $request_document = new EgsRequestDocument();
                    $request_document->student_id = $user_id;
                    $request_document->calendar_id = $user_request->calendar_id;
                    $request_document->action_id = $user_request->action_id;
                    $request_document->level_id = $user_request->level_id;
                    $request_document->semester_id = $user_request->semester_id;
                    $request_document->document_id = $action_document->document_id;
                    $request_document->save();
                }
            }
        } else {
            foreach ($user_request->egsRequestDocuments as $request_document) {
                $request_document->delete();
            }
            foreach ($user_request->egsAdvisors as $advisor) {
                $advisor->delete();
            }
            foreach ($user_request->egsDefenses as $defense) {
                foreach ($defense->egsCommittees as $committee) {
                    $committee->delete();
                }
                $defense->delete();
            }
        }
        if (!$is_defense) {
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
                if (!$advisor->save()) return Json::encode($advisor->errors);
            }
        } else {
            foreach ($defenses as $defense_) {
                $defense = new EgsDefense();
                $defense->student_id = $user_request->student_id;
                $defense->calendar_id = $user_request->calendar_id;
                $defense->action_id = $user_request->action_id;
                $defense->level_id = $user_request->level_id;
                $defense->semester_id = $user_request->semester_id;
                $defense->defense_type_id = $defense_['type'];
                $defense->defense_date = $defense_['date'];
                $defense->defense_time_start = $defense_['start'];
                $defense->defense_time_end = $defense_['end'];
                $defense->room_id = $defense_['room'];
                $defense->defense_status_id = 7;
                if ($defense->save()) {
                    $fee = $this->committeeFeeCalculator($defense->defense_type_id, sizeof($teachers));
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
                        $committee->committee_fee = $fee[$teacher['position']];
                        if (!$committee->save()) return Json::encode($committee->errors);
                    }
                } else {
                    return Json::encode($defense->errors);
                }
            }
        }
        return Json::encode(1);
    }
}
