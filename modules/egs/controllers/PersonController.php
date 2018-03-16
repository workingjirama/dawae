<?php

namespace app\modules\egs\controllers;


use app\modules\egs\models\EgsCalendar;
use Yii;

use yii\base\Module;
use yii\helpers\Json;
use yii\web\Controller;


class PersonController extends Controller
{

    private $TEACHER_TYPE = 1;

    public function actionFindTeacher()
    {
        $teachers = Yii::$app->getDb()->createCommand('SELECT * FROM view_pis_user WHERE user_type_id=' . $this->TEACHER_TYPE)->queryAll();
        $format = new Format();
        return Json::encode($format->personNameOnly($teachers));
    }
}
