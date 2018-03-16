<?php

namespace app\modules\egs\controllers;

use app\modules\egs\models\EgsAdvisor;
use app\modules\egs\models\EgsCommittee;
use app\modules\egs\models\EgsDefense;
use app\modules\egs\models\EgsUserRequest;
use Yii;

use app\modules\egs\models\EgsActionItem;
use app\modules\egs\models\EgsCalendar;
use app\modules\egs\models\EgsCalendarItem;

use yii\base\Module;
use yii\helpers\Json;
use yii\web\Controller;


class DefenseController extends Controller
{

    public function actionFindAll()
    {
        $defense = EgsDefense::find()->all();
        $format = new Format();
        return Json::encode($format->defenseForListing($defense));
    }
}
