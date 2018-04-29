<?php

namespace app\modules\egs\controllers;


use app\modules\egs\models\EgsCalendar;
use Yii;

use yii\base\Module;
use yii\helpers\Json;
use yii\web\Controller;


class PersonController extends Controller
{
    public function actionFindTeacher()
    {
        $teachers = Config::get_all_teacher();
        return Json::encode(Format::personNameOnly($teachers));
    }

    public function actionCurrent()
    {
        $current_user = Config::get_current_user();
        if (!$current_user) {
            return Json::encode(['user_type_id' => -1]);
        }
        return Json::encode(Format::personNameOnly($current_user));
    }
}
