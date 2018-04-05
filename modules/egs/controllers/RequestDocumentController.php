<?php

namespace app\modules\egs\controllers;

use app\modules\egs\models\EgsActionOnStatus;
use app\modules\egs\models\EgsAdvisor;
use app\modules\egs\models\EgsCommittee;
use app\modules\egs\models\EgsDefense;
use app\modules\egs\models\EgsRequestDocument;
use app\modules\egs\models\EgsUserRequest;
use Yii;

use app\modules\egs\models\EgsActionItem;
use app\modules\egs\models\EgsCalendar;
use app\modules\egs\models\EgsCalendarItem;

use yii\base\Module;
use yii\helpers\Json;
use yii\web\Controller;


class RequestDocumentController extends Controller
{
    public function actionUpdate()
    {
        $post = Json::decode(Yii::$app->request->post('json'));
        $user = Config::get_current_user();
        $request_document = EgsRequestDocument::findOne([
            'student_id' => $post['studentId'],
            'calendar_id' => $post['calendarId'],
            'action_id' => $post['actionId'],
            'level_id' => $post['levelId'],
            'semester_id' => $post['semesterId'],
            'document_id' => $post['documentId'],
            'owner_id' => $post['ownerId']
        ]);
        $post_request_document = $request_document->document->submit_type_id === Config::$SUBMIT_TYPE_AFTER;
        $request_document->request_document_id = $post['requestDocumentId'];
        if ($request_document->save()) {
            $all_doc_not_null = true;
            $defense_ready = true;
            $user_request = $request_document->calendar;
            /* NOTE: CHECK REQUEST_DOCUMENT */
            foreach ($user_request->egsRequestDocuments as $request_document_) {
                if ($request_document_->document->submit_type_id === Config::$SUBMIT_TYPE_BEFORE)
                    if ($request_document_->request_document_id === null)
                        $defense_ready = false;
                if ($request_document_->document->submit_type_id === $request_document->document->submit_type_id)
                    if ($request_document_->request_document_id === null)
                        $all_doc_not_null = false;
            }
            foreach ($user_request->egsDefenses as $defense)
                foreach ($defense->egsDefenseDocuments as $defense_document)
                    if ($defense_document->document->submit_type_id === Config::$SUBMIT_TYPE_BEFORE)
                        if ($defense_document->defense_document_path === null)
                            $defense_ready = false;
            if (!$user_request->request_fee_paid) $defense_ready = false;
            $status_id = EgsActionOnStatus::find()
                ->joinWith(['status s'])
                ->where([
                    'action_id' => $request_document->action_id,
                    'on_status_id' => $all_doc_not_null ? Config::$ON_SUCCESS : Config::$ON_FAIL,
                    's.status_type_id' => $post_request_document ? Config::$STATUS_POST_REQUEST_DOCUMENT_TYPE : Config::$STATUS_REQUEST_DOCUMENT_TYPE
                ])->one()->status_id;
            $post_request_document ? $user_request->post_document_status_id = $status_id : $user_request->document_status_id = $status_id;
            if (!$post_request_document) {
                foreach ($user_request->egsDefenses as $defense) {
                    $defense->defense_status_id = EgsActionOnStatus::find()
                        ->joinWith(['status s'])
                        ->where([
                            'action_id' => $defense->defense_type_id,
                            'on_status_id' => $defense_ready ? Config::$ON_READY : Config::$ON_DEFAULT,
                            's.status_type_id' => Config::$STATUS_DEFENSE_TYPE
                        ])->one()->status_id;
                    if (!$defense_ready) {
                        $defense->defense_score = null;
                        $defense->defense_credit = null;
                        $defense->defense_comment = null;
                    }
                    $defense->save();
                }
            }
            $user_request->save();
            return Json::encode(Format::userRequestForListing($user_request, $user['user_type_id']));
        } else {
            return Json::encode(false);
        }
    }
}
