<?php

namespace app\modules\egs\controllers;

use app\modules\egs\models\EgsLevel;
use app\modules\egs\models\EgsLevelBinder;
use Yii;

use app\modules\egs\models\EgsActionItem;
use app\modules\egs\models\EgsCalendar;
use app\modules\egs\models\EgsCalendarItem;

use yii\base\Module;
use yii\helpers\Json;
use yii\web\Controller;

class CalendarItemController extends Controller
{
    private $CALENDAR_ACTIVE = 1;
    private $ACTION_TYPE_REQ_ID = 1;

    private function current_user_level_id()
    {
        $user_id = Yii::$app->session->get('id');
        $user = Yii::$app->getDb()->createCommand('SELECT * FROM view_pis_user WHERE id=' . $user_id)->queryOne();
        $program_id = $user['program_id'];
        return EgsLevelBinder::find()->where(['reg_program_id' => $program_id])->one()->level_id;
    }

    public function actionFind($calendar_id)
    {
        $calendar_items = EgsCalendarItem::find()
            ->where([
                'calendar_id' => $calendar_id
            ])
            ->all();
        $format = new Format();
        return Json::encode($format->calendarItem($calendar_items));
    }

    public function actionFindOne($calendar_id, $semester_id, $action_id)
    {
        $calendar_item = EgsCalendarItem::findOne([
            'calendar_id' => $calendar_id,
            'level_id' => $this->current_user_level_id(),
            'semester_id' => $semester_id,
            'action_id' => $action_id,
        ]);
        $format = new Format();
        return Json::encode($format->calendarItemFull($calendar_item));
    }

    public function actionFindWithStatus()
    {
        $calendar_items = EgsCalendarItem::find()
            ->joinWith(['calendar c'])
            ->joinWith(['semester.action a'])
            ->where([
                'a.action_type_id' => $this->ACTION_TYPE_REQ_ID,
                'c.calendar_active' => $this->CALENDAR_ACTIVE,
                'egs_calendar_item.level_id' => $this->current_user_level_id()
            ])
            ->all();
        $format = new Format();
        return Json::encode($format->calendarItemWithStatus($calendar_items));
    }

    public function actionUpdate()
    {
        $post = Json::decode(Yii::$app->request->post('json'));
        $calendar_item = EgsCalendarItem::findOne([
            'calendar_id' => $post['calendar_id'],
            'action_id' => $post['action_id'],
            'level_id' => $post['level_id'],
            'semester_id' => $post['semester_id']
        ]);
        $calendar_item->calendar_item_date_start = $post['calendar_item_date_start'];
        $calendar_item->calendar_item_date_end = $post['calendar_item_date_end'];
        if (!$calendar_item->save()) {
            return Json::encode($calendar_item->errors);
        }
        return Json::encode(1);
    }
}