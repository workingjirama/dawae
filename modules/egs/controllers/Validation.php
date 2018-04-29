<?php

namespace app\modules\egs\controllers;

use app\modules\egs\models\EgsActionStep;
use app\modules\egs\models\EgsUserRequest;
use Yii;

class Validation
{

    static public function current_step($user_request)
    {
        $action_steps = EgsActionStep::find()->where(['action_id' => $user_request->action_id])->all();
        foreach ($action_steps as $action_step) {
            $validator = $action_step->step->step_validation;
            if ($validator !== null)
                if (!Validation::$validator($user_request))
                    return $action_step->step->step_id;
        }
//        return null;
        return $action_steps[sizeof($action_steps) - 1]->step->step_id;
    }

    static public function request_document_before_and_fee_all_submit($user_request)
    {
        /* @var $user_request EgsUserRequest */
        $fee_valid = true;
        if ($user_request->request_fee_status_id === Config::$FEE_STATUS_NOT_PAY)
            $fee_valid = false;
        $doc_valid = true;
        foreach ($user_request->egsRequestDocuments as $request_document)
            if ($request_document->document->submit_type_id === Config::$SUBMIT_TYPE_BEFORE)
                if ($request_document->request_document_status_id === Config::$DOC_STATUS_NOT_SUBMITTED)
                    $doc_valid = false;
        return $fee_valid && $doc_valid;
    }

    static public function request_document_after_all_submit($user_request)
    {
        /* @var $user_request EgsUserRequest */
        $valid = true;
        foreach ($user_request->egsRequestDocuments as $request_document)
            if ($request_document->document->submit_type_id === Config::$SUBMIT_TYPE_AFTER)
                if ($request_document->request_document_status_id === Config::$DOC_STATUS_NOT_SUBMITTED)
                    $valid = false;
        return $valid;
    }

    static public function defense_resulted($user_request)
    {
        /* @var $user_request EgsUserRequest */
        $valid = true;
        foreach ($user_request->egsDefenses as $defense)
            if ($defense->defense_status_id === Config::$DEFENSE_STATUS_DEFAULT)
                $valid = false;
        return $valid;
    }

    static public function defense_document_before_all_submit($user_request)
    {
        /* @var $user_request EgsUserRequest */
        $valid = true;
        foreach ($user_request->egsDefenses as $defense)
            foreach ($defense->egsDefenseDocuments as $defense_document)
                if ($defense_document->document->submit_type_id === Config::$SUBMIT_TYPE_BEFORE)
                    if ($defense_document->defense_document_status_id === Config::$DOC_STATUS_NOT_SUBMITTED)
                        $valid = false;
        return $valid;
    }

    static public function defense_document_after_all_submit($user_request)
    {
        /* @var $user_request EgsUserRequest */
        $valid = true;
        foreach ($user_request->egsDefenses as $defense)
            foreach ($defense->egsDefenseDocuments as $defense_document)
                if ($defense_document->document->submit_type_id = Config::$SUBMIT_TYPE_AFTER)
                    if ($defense_document->defense_document_status_id === Config::$DOC_STATUS_NOT_SUBMITTED)
                        $valid = false;
        return $valid;
    }
}
