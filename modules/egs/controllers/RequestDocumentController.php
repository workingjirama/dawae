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
    public function actionUpdatePetition()
    {
        $post = Json::decode(Yii::$app->request->post('json'));
        $request_document = EgsRequestDocument::findOne([
            'student_id' => $post['studentId'],
            'calendar_id' => $post['calendarId'],
            'action_id' => $post['actionId'],
            'level_id' => $post['levelId'],
            'semester_id' => $post['semesterId'],
            'document_id' => $post['documentId'],
            'owner_id' => $post['owner_id']
        ]);
        $request_document->request_document_id = $post['requestDocumentId'];
        if ($request_document->save()) {
            $all_petition_not_null = true;
            $defense_ready = true;
            $user_request = $request_document->calendar;
            foreach ($user_request->egsRequestDocuments as $request_document_) {
                if ($request_document_->document->document_type_id === Config::$DOCUMENT_PETITION_TYPE)
                    if ($request_document_->request_document_id === null) {
                        $all_petition_not_null = false;
                        $defense_ready = false;
                    }
                if ($request_document_->document->document_type_id === Config::$DOCUMENT_PAPER_TYPE)
                    if ($request_document_->request_document_path === null) {
                        $defense_ready = false;
                    }
            }
            if (!$user_request->request_fee_paid) $defense_ready = false;
            $user_request->petition_status_id = EgsActionOnStatus::find()
                ->joinWith(['status s'])
                ->where([
                    'action_id' => $request_document->action_id,
                    'on_status_id' => $all_petition_not_null ? Config::$ON_SUCCESS : Config::$ON_FAIL,
                    's.status_type_id' => Config::$STATUS_PETITION_TYPE
                ])->one()->status_id;
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
            $user_request->save();
            return Json::encode(Format::userRequestForListing($user_request));
        } else {
            return Json::encode(false);
        }
    }

    public function actionUpdatePaper()
    {
        $post = Json::decode(Yii::$app->request->post('json'));
        $request_document = $request_document = EgsRequestDocument::findOne([
            'student_id' => $post['studentId'],
            'calendar_id' => $post['calendarId'],
            'action_id' => $post['actionId'],
            'level_id' => $post['levelId'],
            'semester_id' => $post['semesterId'],
            'document_id' => $post['documentId'],
            'owner_id' => $post['owner_id']
        ]);
        if ($path = $this->upload($request_document)) {
            $request_document->request_document_path = $path;
            if ($request_document->save()) {
                $all_paper_uploaded = true;
                $defense_ready = true;
                $user_request = $request_document->calendar;
                foreach ($user_request->egsRequestDocuments as $request_document_) {
                    if ($request_document_->document->document_type_id === Config::$DOCUMENT_PAPER_TYPE)
                        if ($request_document_->request_document_path === null) {
                            $defense_ready = false;
                            $all_paper_uploaded = false;
                        }
                    if ($request_document_->document->document_type_id === Config::$DOCUMENT_PETITION_TYPE)
                        if ($request_document_->request_document_id === null) {
                            $defense_ready = false;
                        }
                }
                if (!$user_request->request_fee_paid) $defense_ready = false;
                $user_request->paper_status_id = EgsActionOnStatus::find()
                    ->joinWith(['status s'])
                    ->where([
                        'action_id' => $request_document->action_id,
                        'on_status_id' => $all_paper_uploaded ? Config::$ON_SUCCESS : Config::$ON_FAIL,
                        's.status_type_id' => Config::$STATUS_PAPER_TYPE
                    ])->one()->status_id;
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
                $user_request->save();
                $format = new Format();
                return Json::encode(Format::userRequestForListing($user_request));
            } else
                return Json::encode(false);
        } else {
            $request_document->request_document_path = null;
            $request_document->save();
            return Json::encode(false);
        }
    }

    private function upload($request_document)
    {
        $file_name = $request_document->student_id . $request_document->calendar_id . $request_document->action_id . $request_document->level_id . $request_document->semester_id . $request_document->document_id . ' . pdf';
        $source = $_FILES['paper']['tmp_name'];
        $target_dir = Yii::getAlias('@egsweb/uploads/papers/' . $request_document->student_id . '/');
        if (!is_dir($target_dir)) {
            mkdir($target_dir, 0777, true);
        }
        if (file_exists($target_dir . $file_name)) {
            unlink($target_dir . $file_name);
        }
        move_uploaded_file($source, $target_dir . $file_name);
        return $target_dir . $file_name;
    }
}
