<?php

namespace app\modules\egs\controllers;


use app\modules\egs\controllers\Format;
use app\modules\egs\models\EgsActionItem;
use app\modules\egs\models\EgsCalendar;
use app\modules\egs\models\EgsSemester;
use Yii;

use yii\base\Module;
use yii\helpers\Json;
use yii\web\Controller;

class ActionItemController extends Controller
{

    private $ACTION_ITEM_ACTIVE = 1;

    public function findAll()
    {
        return EgsActionItem::find()->all();
    }

    public function actionFind()
    {
        $semester = EgsSemester::find()->one();
        $action_items = EgsActionItem::find()
            ->where([
                'action_item_active' => $this->ACTION_ITEM_ACTIVE,
                'semester_id' => $semester->semester_id
            ])
            ->all();
        $format = new Format();
        return Json::encode($format->actionItemActionOnly($action_items));
    }
}
