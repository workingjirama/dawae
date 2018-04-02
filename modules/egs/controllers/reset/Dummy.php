<?php

namespace app\modules\egs\controllers\reset;

use app\modules\egs\controllers\Config;
use app\modules\egs\models\EgsActionDocument;
use app\modules\egs\models\EgsActionItem;
use app\modules\egs\models\EgsActionType;
use app\modules\egs\models\EgsCalendar;
use app\modules\egs\models\EgsCalendarItem;
use app\modules\egs\models\EgsCalendarLevel;
use app\modules\egs\models\EgsCommittee;
use app\modules\egs\models\EgsCommitteeFee;
use app\modules\egs\models\EgsDefense;
use app\modules\egs\models\EgsDocument;
use app\modules\egs\models\EgsDocumentType;
use app\modules\egs\models\EgsLevel;
use app\modules\egs\models\EgsLevelBinder;
use app\modules\egs\models\EgsRequestDefense;
use app\modules\egs\models\EgsAction;
use app\modules\egs\models\EgsSemester;
use app\modules\egs\models\EgsSubmitType;
use app\modules\egs\models\EgsUserRequest;
use yii\helpers\Json;


class Dummy
{

    public function insert()
    {
        $this->INITIAL_CALENDAR_PLS_DELETE_THIS_IN_PRODUCTION();
    }

    PRIVATE FUNCTION INITIAL_CALENDAR_PLS_DELETE_THIS_IN_PRODUCTION()
    {
        $calendar = new EgsCalendar();
        $calendar->calendar_id = 2569;
        $calendar->calendar_active = 1;
        if (!$calendar->save()) return Json::encode($calendar->errors);
        $this->INIT_CALENDAR_ITEM_PLS_DELETE_THIS_IN_PRODUCTION($calendar->calendar_id, 1, 1, '2018-01-01', '2018-12-31', [
            1,
            2, 3,
            4, 5, 6, 7,
            8, 9,
            10, 11, 12
        ]);
        $this->INIT_CALENDAR_ITEM_PLS_DELETE_THIS_IN_PRODUCTION($calendar->calendar_id, 1, 2, '2019-01-01', '2019-12-31', [
            1,
            2, 3,
            4, 5, 6, 7,
            8, 9,
            10, 11, 12
        ]);
        $this->INIT_CALENDAR_ITEM_PLS_DELETE_THIS_IN_PRODUCTION($calendar->calendar_id, 1, 3, '2020-01-01', '2020-12-31', [
            10, 11, 12
        ]);
        $this->INIT_CALENDAR_ITEM_PLS_DELETE_THIS_IN_PRODUCTION($calendar->calendar_id, 2, 1, '2018-01-01', '2018-12-31', [
            1,
            2, 3,
            4, 5, 6, 7,
            8, 9,
            10, 11, 12
        ]);
        $this->INIT_CALENDAR_ITEM_PLS_DELETE_THIS_IN_PRODUCTION($calendar->calendar_id, 2, 2, '2019-01-01', '2019-12-31', [
            1,
            2, 3,
            4, 5, 6, 7,
            8, 9,
            10, 11, 12
        ]);
        $this->INIT_CALENDAR_ITEM_PLS_DELETE_THIS_IN_PRODUCTION($calendar->calendar_id, 2, 3, '2020-01-01', '2020-12-31', [
            10, 11, 12
        ]);
    }

    PRIVATE FUNCTION INIT_CALENDAR_ITEM_PLS_DELETE_THIS_IN_PRODUCTION($calendar_id, $level_id, $semster_id, $start, $end, $actions)
    {
        foreach ($actions as $action) {
            $calendar_item = new EgsCalendarItem();
            $calendar_item->calendar_id = $calendar_id;
            $calendar_item->action_id = $action;
            $calendar_item->level_id = $level_id;
            $calendar_item->semester_id = $semster_id;
            $calendar_item->calendar_item_date_start = $start;
            $calendar_item->calendar_item_date_end = $end;
            $calendar_item->owner_id = Config::$SYSTEM_ID;
            if (!$calendar_item->save()) {
                echo Json::encode($calendar_item->errors);
                exit();
            };
            if ($calendar_item->semester->action->action_default) {
                $calendar_item->calendar_item_date_start = $start;
                $calendar_item->calendar_item_date_end = $start;
                if (!$calendar_item->save()) {
                    echo $calendar_item->errors;
                    exit();
                };
                $user_request = new EgsUserRequest();
                $user_request->student_id = Config::$SYSTEM_ID;
                $user_request->calendar_id = $calendar_item->calendar_id;
                $user_request->action_id = $calendar_item->action_id;
                $user_request->level_id = $calendar_item->level_id;
                $user_request->semester_id = $calendar_item->semester_id;
                $user_request->owner_id = $calendar_item->owner_id;
                $user_request->petition_status_id = 1;
                $user_request->paper_status_id = 1;
                $user_request->fee_status_id = 1;
                $user_request->request_fee = 0;
                $user_request->request_fee_paid = 0;
                if (!$user_request->save()) {
                    echo Json::encode($user_request->errors);
                    exit();
                };
                $defense = new EgsDefense();
                $defense->student_id = $user_request->student_id;
                $defense->calendar_id = $user_request->calendar_id;
                $defense->action_id = $user_request->action_id;
                $defense->level_id = $user_request->level_id;
                $defense->semester_id = $user_request->semester_id;
                $defense->defense_type_id = $user_request->action_id;
                $defense->defense_date = $start;
                $defense->owner_id = $user_request->owner_id;
                $defense->defense_time_start = '12:00';
                $defense->defense_time_end = '14:00';
                $defense->room_id = 1;
                $defense->defense_status_id = 1;
                if (!$defense->save()) {
                    echo Json::encode($defense->errors);
                    exit();
                };
                $committee = new EgsCommittee();
                $committee->student_id = $defense->student_id;
                $committee->calendar_id = $defense->calendar_id;
                $committee->action_id = $defense->action_id;
                $committee->level_id = $defense->level_id;
                $committee->semester_id = $defense->semester_id;
                $committee->defense_type_id = $defense->action_id;
                $committee->owner_id = $defense->owner_id;
                $committee->committee_fee = 0;
                $committee->teacher_id = 2;
                $committee->position_id = 3;
                if (!$committee->save()) {
                    echo Json::encode($committee->errors);
                    exit();
                };
            }
        }
    }
}