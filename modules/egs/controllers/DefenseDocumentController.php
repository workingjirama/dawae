<?php

namespace app\modules\egs\controllers;

use app\modules\egs\models\EgsActionOnStatus;
use app\modules\egs\models\EgsAdvisor;
use app\modules\egs\models\EgsCommittee;
use app\modules\egs\models\EgsDefense;
use app\modules\egs\models\EgsDefenseDocument;
use app\modules\egs\models\EgsRequestDocument;
use app\modules\egs\models\EgsUserRequest;
use Yii;

use app\modules\egs\models\EgsActionItem;
use app\modules\egs\models\EgsCalendar;
use app\modules\egs\models\EgsCalendarItem;

use yii\base\Module;
use yii\helpers\Json;
use yii\web\Controller;


class DefenseDocumentController extends Controller
{
    public function actionUpdate()
    {
        $user = Config::get_current_user();
        $post = Json::decode(Yii::$app->request->post('json'));
        $defense_document = EgsDefenseDocument::findOne([
            'student_id' => $post['studentId'],
            'calendar_id' => $post['calendarId'],
            'action_id' => $post['actionId'],
            'level_id' => $post['levelId'],
            'semester_id' => $post['semesterId'],
            'document_id' => $post['documentId'],
            'owner_id' => $post['ownerId'],
            'defense_type_id' => $post['defenseTypeId']
        ]);
        $post_defense_document = $defense_document->document->submit_type_id === Config::$SUBMIT_TYPE_AFTER;
        $defense = $defense_document->defenseType;
        if ($path = $this->upload($defense_document)) {
            $defense_document->defense_document_path = $path;
            if ($defense_document->save()) {
                $all_paper_uploaded = true;
                $defense_ready = true;
                $user_request = $defense->calendar;
                foreach ($user_request->egsRequestDocuments as $request_document)
                    if ($request_document->document->submit_type_id === Config::$SUBMIT_TYPE_BEFORE)
                        if ($request_document->request_document_id === null)
                            $defense_ready = false;
                foreach ($user_request->egsDefenses as $defense_)
                    foreach ($defense_->egsDefenseDocuments as $defense_document_) {
                        if ($defense_document_->document->submit_type_id === Config::$SUBMIT_TYPE_BEFORE)
                            if ($defense_document_->defense_document_path === null)
                                $defense_ready = false;
                        if ($defense_document_->document->submit_type_id === $defense_document->document->submit_type_id)
                            if ($defense_document_->defense_document_path === null)
                                $all_paper_uploaded = false;
                    }
                if (!$user_request->request_fee_paid) $defense_ready = false;


                $status_id = EgsActionOnStatus::find()
                    ->joinWith(['status s'])
                    ->where([
                        'action_id' => $defense->defense_type_id,
                        'on_status_id' => $all_paper_uploaded ? Config::$ON_SUCCESS : Config::$ON_FAIL,
                        's.status_type_id' => $post_defense_document ? Config::$STATUS_POST_DEFENSE_DOCUMENT_TYPE : Config::$STATUS_DEFENSE_DOCUMENT_TYPE
                    ])->one()->status_id;
                $post_defense_document ? $defense->post_document_status_id = $status_id : $defense->document_status_id = $status_id;
                if (!$post_defense_document) {
                    $defense->defense_status_id = EgsActionOnStatus::find()
                        ->joinWith(['status s'])
                        ->where([
                            'action_id' => $defense->defense_type_id,
                            'on_status_id' => $defense_ready ? Config::$ON_READY : Config::$ON_DEFAULT,
                            's.status_type_id' => Config::$STATUS_DEFENSE_TYPE
                        ])->one()->status_id;
                    $defense->save();
                }
                return Json::encode(Format::defenseForListing($defense, $user));
            } else
                return Json::encode($defense_document->errors);
        } else {
            $defense_document->defense_document_path = null;
            $defense_document->save();
            return Json::encode(false);
        }
    }

    private function upload($request_document)
    {
        $file_name = $request_document->student_id . $request_document->calendar_id . $request_document->action_id . $request_document->level_id . $request_document->semester_id . $request_document->document_id . '.pdf';
        $source = $_FILES['paper']['tmp_name'];
        $target_dir = Yii::getAlias('@egswebdir/uploads/papers/' . $request_document->student_id . '/');
        if (!is_dir($target_dir)) {
            mkdir($target_dir, 0777, true);
        }
        if (file_exists($target_dir . $file_name)) {
            unlink($target_dir . $file_name);
        }
        move_uploaded_file($source, $target_dir . $file_name);
        $path = Yii::getAlias('@egsweb/uploads/papers/' . $request_document->student_id . '/');
        return $path . $file_name;
    }
}
