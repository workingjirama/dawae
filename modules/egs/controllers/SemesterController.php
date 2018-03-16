<?php

namespace app\modules\egs\controllers;


use app\modules\egs\controllers\Format;
use app\modules\egs\models\EgsActionItem;
use app\modules\egs\models\EgsCalendar;
use app\modules\egs\models\EgsSemester;
use Yii;

use yii\base\Module;
use yii\helpers\ArrayHelper;
use yii\helpers\Json;
use yii\web\Controller;

class SemesterController extends Controller
{
    public function actionAll()
    {
        $format = new Format();
        $semesters = EgsSemester::find()->all();
        return Json::encode($format->semester($semesters));
    }

    public function actionFind($calendar_level)
    {
        $format = new Format();
        $semesters = EgsSemester::find()
            ->joinWith(['egsActionItems ai'])
            ->where(['ai.calendar_level_id' => $calendar_level])
            ->all();
        return Json::encode($format->semesterWithActionItem($semesters));
    }
}
