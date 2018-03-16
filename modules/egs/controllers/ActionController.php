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
    private $ACTION_TYPE_REQUEST = 1;
    private $ACTION_TYPE_DEFENSE = 2;

    public function actionFindAll($is_defense)
    {
        $action = EgsAction::find()->where(['action_type_id' => ($is_defense) ? $this->ACTION_TYPE_DEFENSE : $this->ACTION_TYPE_REQUEST])->all();
        $format = new Format();
        return Json::encode($format->actionNoDetail($action));
    }
}
