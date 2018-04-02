<?php

namespace app\modules\egs\controllers;


use app\modules\egs\controllers\Format;
use app\modules\egs\models\EgsAction;
use app\modules\egs\models\EgsActionItem;
use app\modules\egs\models\EgsCalendar;
use app\modules\egs\models\EgsSemester;
use Yii;

use yii\base\Module;
use yii\helpers\Json;
use yii\web\Controller;

class ActionController extends Controller
{

    public function actionFindAll($is_defense)
    {
        $action = EgsAction::find()->where(['action_type_id' => ($is_defense) ? Config::$ACTION_DEFENSE_TYPE : Config::$ACTION_REQUEST_TYPE])->all();
        return Json::encode(Format::actionNoDetail($action));
    }
}