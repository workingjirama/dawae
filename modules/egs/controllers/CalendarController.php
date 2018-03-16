<?php

namespace app\modules\egs\controllers;

use Yii;

use app\modules\egs\models\EgsActionItem;
use app\modules\egs\models\EgsCalendar;
use app\modules\egs\models\EgsCalendarItem;

use yii\base\Module;
use yii\helpers\Json;
use yii\web\Controller;


class CalendarController extends Controller
{
    private $CALENDAR_DEFAULT_ACTIVE = 0;
    private $CALENDAR_ACTIVE = 1;
    private $ACTION_ITEM_ACTIVE = 1;

    public function actionFindAll()
    {
        $calendar = EgsCalendar::find()->all();
        return Json::encode($calendar);
    }

    public function actionFind($calendar_id)
    {
        $calendar = EgsCalendar::findOne($calendar_id);
        return Json::encode($calendar);
    }

    public function actionActivate()
    {
        $post = Json::decode(Yii::$app->request->post('json'));
        $old_calendar = EgsCalendar::find()->where(['calendar_active' => $this->CALENDAR_ACTIVE])->one();
        if (!empty($old_calendar)) {
            $old_calendar->calendar_active = $this->CALENDAR_DEFAULT_ACTIVE;
            $old_calendar->save();
        }
        $calendar = EgsCalendar::findOne($post['calendar_id']);
        $calendar->calendar_active = $this->CALENDAR_ACTIVE;
        if (!$calendar->save()) return Json::encode($calendar->errors);
        return Json::encode(1);
    }

    public function actionCalendarInsert()
    {
        $post = Json::decode(Yii::$app->request->post('json'));
        $year = $post['year'];
        if (EgsCalendar::findOne($year) !== null)
            return Json::encode(0);
        $calendar = new EgsCalendar();
        $calendar->calendar_id = $year;
        $calendar->calendar_active = $this->CALENDAR_DEFAULT_ACTIVE;
        if ($calendar->save()) {
            $action_items = EgsActionItem::find()
                ->joinWith(['action a'])
                ->where([
                    'action_item_active' => $this->ACTION_ITEM_ACTIVE,
                ])
                ->all();
            foreach ($action_items as $action_item) {
                $calendar_item = new EgsCalendarItem();
                $calendar_item->calendar_id = $calendar->calendar_id;
                $calendar_item->action_id = $action_item->action_id;
                $calendar_item->level_id = $action_item->level_id;
                $calendar_item->semester_id = $action_item->semester_id;
                if (!$calendar_item->save()) return Json::encode($calendar_item->errors);
            }
        } else {
            return Json::encode($calendar->errors);
        }
        return Json::encode(1);
    }
}
