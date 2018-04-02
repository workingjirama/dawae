<?php

namespace app\modules\egs\controllers;

use Yii;

class Config
{
    static public $DEFAULT_LANGUAGE = 'th';
    static public $COMPLETE_PETITION_STATUS = 5; /* TEMPORARY: NEED WORKING */
    static public $SYSTEM_ID = -99;

    static public $PRINTING_TYPE_REVIEW = 1;

    static public $DONT_HAVE_TO_PAY_STATUS = 12;

    static public $ACTION_REQUEST_TYPE = 1;
    static public $ACTION_DEFENSE_TYPE = 2;

    static public $DOCUMENT_PETITION_TYPE = 1;
    static public $DOCUMENT_PAPER_TYPE = 2;

    static public $STATUS_PETITION_TYPE = 1;
    static public $STATUS_PAPER_TYPE = 2;
    static public $STATUS_DEFENSE_TYPE = 3;
    static public $STATUS_FEE_TYPE = 4;

    static public $COMMITTEE_MAIN_POSITION = 3;
    static public $COMMITTEE_CO_POSITION = 4;
    static public $COMMITTEE_MAIN_FEE_PERCENTAGE = .4;
    static public $COMMITTEE_CO_FEE_PERCENTAGE = .6;

    static public $SUBMIT_TYPE_BEFORE = 1;
    static public $SUBMIT_TYPE_AFTER = 2;

    static public $ON_DEFAULT = 1;
    static public $ON_SUCCESS = 2;
    static public $ON_FAIL = 3;
    static public $ON_READY = 4;
    static public $PASS_DEFENSE_SCORE = 50;
    static public $FINAL_REQUEST_PLUS_DATE = 365;
    static public $FINAL_DEFENSE_PLUS_DATE = 730;

    static public $PERSON_STUDENT_TYPE = 0;
    static public $PERSON_TEACHER_TYPE = 1;
    static public $PERSON_STAFF_TYPE = 2;

    static public $POSITION_COMMITTEE_TYPE = 1;
    static public $POSITION_ADVISOR_TYPE = 2;

    static public function get_language()
    {
        $lang = Config::$DEFAULT_LANGUAGE;
        if (Yii::$app->session->has('lang'))
            $lang = Yii::$app->session->get('lang');
        return $lang;
    }

    static public function get_user_id()
    {
        return (int)Yii::$app->session->get('id');
    }

    static public function get_one_user($id)
    {
        return Yii::$app->getDb()->createCommand('SELECT * FROM view_pis_user WHERE id=' . $id)->queryOne();
    }

    static public function get_current_user()
    {
        $current_user = Yii::$app->getDb()->createCommand('SELECT * FROM view_pis_user WHERE id=' . Config::get_user_id())->queryOne();
        return $current_user;
    }

    static public function get_all_user()
    {
        return Yii::$app->getDb()->createCommand('SELECT * FROM view_pis_user')->queryAll();
    }

    static public function get_all_teacher()
    {
        return Yii::$app->getDb()->createCommand('SELECT * FROM view_pis_user WHERE user_type_id = ' . Config::$PERSON_TEACHER_TYPE)->queryAll();
    }
}
