<?php

namespace app\modules\egs\controllers;

use app\modules\egs\models\EgsCalendar;
use app\modules\egs\models\EgsPosition;
use app\modules\egs\models\EgsPositionType;
use app\modules\egs\models\EgsRequestDefense;
use Yii;

use yii\base\Module;
use yii\helpers\Json;
use yii\web\Controller;

class PositionController extends Controller
{

    private $DEFENSE_TYPE_COMMITTEE = 1;
    private $DEFENSE_TYPE_ADVISOR = 2;

    public function actionFind($action_id)
    {
        $egs_request_defense = EgsRequestDefense::find()->where(['request_type_id' => $action_id])->all();
        $position = EgsPosition::find()
            ->where([
                'position_type_id' => !empty($egs_request_defense) ? $this->DEFENSE_TYPE_COMMITTEE : $this->DEFENSE_TYPE_ADVISOR
            ])->all();
        $format = new Format();
        return Json::encode($format->position($position));
    }
}
