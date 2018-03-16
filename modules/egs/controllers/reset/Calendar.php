<?php

namespace app\modules\egs\controllers\reset;

use app\modules\egs\models\EgsActionDocument;
use app\modules\egs\models\EgsActionItem;
use app\modules\egs\models\EgsActionType;
use app\modules\egs\models\EgsCalendar;
use app\modules\egs\models\EgsCalendarItem;
use app\modules\egs\models\EgsCalendarLevel;
use app\modules\egs\models\EgsDocument;
use app\modules\egs\models\EgsDocumentType;
use app\modules\egs\models\EgsLevel;
use app\modules\egs\models\EgsLevelBinder;
use app\modules\egs\models\EgsRequestDefense;
use app\modules\egs\models\EgsAction;
use app\modules\egs\models\EgsSemester;
use app\modules\egs\models\EgsSubmitType;
use yii\helpers\Json;

class Calendar
{
    public function delete()
    {
        EgsActionDocument::deleteAll();
        EgsDocument::deleteAll();
        EgsDocumentType::deleteAll();
        EgsSubmitType::deleteAll();
        EgsCalendarItem::deleteAll();
        EgsCalendar::deleteAll();
        EgsActionItem::deleteAll();
        EgsRequestDefense::deleteAll();
        EgsAction::deleteAll();
        EgsActionType::deleteAll();
        EgsSemester::deleteAll();
        EgsLevelBinder::deleteAll();
        EgsLevel::deleteAll();
    }

    public function insert()
    {
        $this->action_type();
        $this->action();
        $this->request_defense();
        $this->semester();
        $this->level();
        $this->level_binder();
        $this->action_item();
        $this->INITIAL_CALENDAR_PLS_DELETE_THIS_IN_PRODUCTION();
        $this->document_type();
        $this->submit_type();
        $this->document();
        $this->action_document();
    }

    private function document_type()
    {
        $document_type = new EgsDocumentType();
        $document_type->document_type_id = 1;
        $document_type->document_type_name_th = 'ใบคำร้อง';
        $document_type->document_type_name_en = 'Petition';
        $document_type->save();
        $document_type = new EgsDocumentType();
        $document_type->document_type_id = 2;
        $document_type->document_type_name_th = 'เอกสาร';
        $document_type->document_type_name_en = 'Paper';
        $document_type->save();
    }

    private function submit_type()
    {
        $submit_type = new EgsSubmitType();
        $submit_type->submit_type_id = 1;
        $submit_type->submit_type_name_th = 'ก่อนสอบ';
        $submit_type->submit_type_name_en = 'BEFORE';
        if (!$submit_type->save()) {
            echo Json::encode($submit_type->errors);
            exit();
        }
        $submit_type = new EgsSubmitType();
        $submit_type->submit_type_id = 2;
        $submit_type->submit_type_name_th = 'หลังสอบ';
        $submit_type->submit_type_name_en = 'AFTER';
        if (!$submit_type->save()) {
            echo Json::encode($submit_type->errors);
            exit();
        }
    }

    private function document()
    {
        $doc_type_id = 1;
        $document = new EgsDocument();
        $document->document_id = 1;
        $document->document_name_th = "บว.21 คำร้องขอเสนอชื่ออาจารย์ที่ปรึกษา/เปลี่ยนแปลงอาจารย์ที่ปรึกษาวิทยานิพนธ์";
        $document->document_name_en = "GS21 [NAME ENG]";
        $document->document_type_id = $doc_type_id;
        $document->submit_type_id = 1;
        $document->save();
        $document = new EgsDocument();
        $document->document_id = 2;
        $document->document_name_th = "วท.บศ.05 แบบเสนอแต่งตั้งคณะกรรมการสอบเค้าโครงวิทยานิพนธ์/การศึกษาอิสระ";
        $document->document_name_en = "GS05 [NAME ENG]";
        $document->document_type_id = $doc_type_id;
        $document->submit_type_id = 1;
        $document->save();
        $document = new EgsDocument();
        $document->document_id = 3;
        $document->document_name_th = "บว.23 แบบเสนอเค้าโครงวิทยานิพนธ์/การศึกษาอิสระ";
        $document->document_name_en = "GS23 [NAME ENG]";
        $document->document_type_id = $doc_type_id;
        $document->submit_type_id = 1;
        $document->save();
        $document = new EgsDocument();
        $document->document_id = 4;
        $document->document_name_th = "บว.26 แบบเสนอแต่งตั้งคณะกรรมการสอบวิทยานิพนธ์/การศึกษาอิสระ";
        $document->document_name_en = "GS26 [NAME ENG]";
        $document->document_type_id = $doc_type_id;
        $document->submit_type_id = 1;
        $document->save();
        $document = new EgsDocument();
        $document->document_id = 5;
        $document->document_name_th = "บว.25 คำร้องขอสอบวิทยานิพนธ์/การศึกษาอิสระ";
        $document->document_name_en = "GS25 [NAME ENG]";
        $document->document_type_id = $doc_type_id;
        $document->submit_type_id = 1;
        $document->save();
        $document = new EgsDocument();
        $document->document_id = 6;
        $document->document_name_th = "แบบเสนอแต่งตั้งคณะกรรมการสอบความก้าวหน้าดุษฎีนิพนธ์";
        $document->document_name_en = "GS[XX] [NAME ENG]";
        $document->document_type_id = $doc_type_id;
        $document->submit_type_id = 1;
        $document->save();
        $document = new EgsDocument();
        $document->document_id = 7;
        $document->document_name_th = "บว.30 คำร้องขอสอบประมวลความรู้/สอบวัดคุณสมบัติ";
        $document->document_name_en = "GS30 [NAME ENG]";
        $document->document_type_id = $doc_type_id;
        $document->submit_type_id = 1;
        $document->save();
        $document = new EgsDocument();
        $document->document_id = 8;
        $document->document_name_th = "บว.31 แบบเสนอแต่งตั้งคณะกรรมการสอบประมวลความรู้ฯ";
        $document->document_name_en = "GS31 [NAME ENG]";
        $document->document_type_id = $doc_type_id;
        $document->submit_type_id = 1;
        $document->save();

        $doc_type_id = 2;
        $document = new EgsDocument();
        $document->document_id = 9;
        $document->document_name_th = "รายงานเค้าโครงงาน";
        $document->document_name_en = "Proposal's Paper";
        $document->document_type_id = $doc_type_id;
        $document->submit_type_id = 1;
        $document->save();
        $document = new EgsDocument();
        $document->document_id = 10;
        $document->document_name_th = "เอกสารโครงงาน";
        $document->document_name_en = "Final's Paper";
        $document->document_type_id = $doc_type_id;
        $document->submit_type_id = 1;
        $document->save();
        $document = new EgsDocument();
        $document->document_id = 11;
        $document->document_name_th = "เอกสารโครงงานที่แก้ไขแล้ว";
        $document->document_name_en = "Edited Final's Paper";
        $document->document_type_id = $doc_type_id;
        $document->submit_type_id = 2;
        $document->save();
        $document = new EgsDocument();
        $document->document_id = 12;
        $document->document_name_th = "รายงานความก้าวหน้าโครงงาน";
        $document->document_name_en = "Progress's Paper";
        $document->document_type_id = $doc_type_id;
        $document->submit_type_id = 1;
        $document->save();
    }

    private function action_document()
    {
        $action_document = new EgsActionDocument();
        $action_document->document_id = 1;
        $action_document->action_id = 1;
        $action_document->save();
        $action_document = new EgsActionDocument();
        $action_document->document_id = 2;
        $action_document->action_id = 2;
        $action_document->save();
        $action_document = new EgsActionDocument();
        $action_document->document_id = 3;
        $action_document->action_id = 2;
        $action_document->save();
        $action_document = new EgsActionDocument();
        $action_document->document_id = 4;
        $action_document->action_id = 4;
        $action_document->save();
        $action_document = new EgsActionDocument();
        $action_document->document_id = 4;
        $action_document->action_id = 5;
        $action_document->save();
        $action_document = new EgsActionDocument();
        $action_document->document_id = 5;
        $action_document->action_id = 4;
        $action_document->save();
        $action_document = new EgsActionDocument();
        $action_document->document_id = 5;
        $action_document->action_id = 5;
        $action_document->save();

        $action_document = new EgsActionDocument();
        $action_document->document_id = 6;
        $action_document->action_id = 8;
        $action_document->save();
        $action_document = new EgsActionDocument();
        $action_document->document_id = 7;
        $action_document->action_id = 10;
        $action_document->save();
        $action_document = new EgsActionDocument();
        $action_document->document_id = 8;
        $action_document->action_id = 10;
        $action_document->save();
        $action_document = new EgsActionDocument();
        $action_document->document_id = 9;
        $action_document->action_id = 2;
        $action_document->save();
        $action_document = new EgsActionDocument();
        $action_document->document_id = 10;
        $action_document->action_id = 4;
        $action_document->save();
        $action_document = new EgsActionDocument();
        $action_document->document_id = 10;
        $action_document->action_id = 5;
        $action_document->save();
        $action_document = new EgsActionDocument();
        $action_document->document_id = 11;
        $action_document->action_id = 4;
        $action_document->save();
        $action_document = new EgsActionDocument();
        $action_document->document_id = 11;
        $action_document->action_id = 5;
        $action_document->save();
        $action_document = new EgsActionDocument();
        $action_document->document_id = 12;
        $action_document->action_id = 8;
        $action_document->save();
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
            if (!$calendar_item->save()) return Json::encode($calendar_item->errors);
        }
    }

    private function semester()
    {
        $semester = new EgsSemester();
        $semester->semester_id = 1;
        $semester->semester_name_th = "ภาคต้น";
        $semester->semester_name_en = "1st Semester";
        if (!$semester->save()) return Json::encode($semester->errors);
        $semester = new EgsSemester();
        $semester->semester_id = 2;
        $semester->semester_name_th = "ภาคปลาย";
        $semester->semester_name_en = "2nd Semester";
        if (!$semester->save()) return Json::encode($semester->errors);
        $semester = new EgsSemester();
        $semester->semester_id = 3;
        $semester->semester_name_th = "พิเศษ";
        $semester->semester_name_en = "Summer Semester";
        if (!$semester->save()) return Json::encode($semester->errors);

    }

    private function level_binder()
    {
        $level_id = 1;
        $level_binder = new EgsLevelBinder();
        $level_binder->level_id = $level_id;
        $level_binder->reg_program_id = '510208113160';
        if (!$level_binder->save()) return Json::encode($level_binder->errors);
        $level_binder = new EgsLevelBinder();
        $level_binder->level_id = $level_id;
        $level_binder->reg_program_id = '510265460';
        if (!$level_binder->save()) return Json::encode($level_binder->errors);
        $level_binder = new EgsLevelBinder();
        $level_binder->level_id = $level_id;
        $level_binder->reg_program_id = '540263460';
        if (!$level_binder->save()) return Json::encode($level_binder->errors);
        $level_binder = new EgsLevelBinder();
        $level_binder->level_id = $level_id;
        $level_binder->reg_program_id = '540264460';
        if (!$level_binder->save()) return Json::encode($level_binder->errors);
        $level_binder = new EgsLevelBinder();
        $level_binder->level_id = $level_id;
        $level_binder->reg_program_id = '550208122159';
        if (!$level_binder->save()) return Json::encode($level_binder->errors);
        $level_binder = new EgsLevelBinder();
        $level_binder->level_id = $level_id;
        $level_binder->reg_program_id = '550208123154';
        if (!$level_binder->save()) return Json::encode($level_binder->errors);
        $level_binder = new EgsLevelBinder();
        $level_binder->level_id = $level_id;
        $level_binder->reg_program_id = '550208132154';
        if (!$level_binder->save()) return Json::encode($level_binder->errors);
        $level_binder = new EgsLevelBinder();
        $level_binder->level_id = $level_id;
        $level_binder->reg_program_id = '550208133047';
        if (!$level_binder->save()) return Json::encode($level_binder->errors);

        $level_id = 2;
        $level_binder = new EgsLevelBinder();
        $level_binder->level_id = $level_id;
        $level_binder->reg_program_id = '710208112055';
        if (!$level_binder->save()) return Json::encode($level_binder->errors);
        $level_binder = new EgsLevelBinder();
        $level_binder->level_id = $level_id;
        $level_binder->reg_program_id = '710208211051';
        if (!$level_binder->save()) return Json::encode($level_binder->errors);
        $level_binder = new EgsLevelBinder();
        $level_binder->level_id = $level_id;
        $level_binder->reg_program_id = '770208211051';
        if (!$level_binder->save()) return Json::encode($level_binder->errors);
    }

    private function level()
    {
        $level = new EgsLevel();
        $level->level_id = 1;
        $level->level_name_th = "ปริญญาโท";
        $level->level_name_en = "Master's degree";
        if (!$level->save()) return Json::encode($level->errors);
        $level = new EgsLevel();
        $level->level_id = 2;
        $level->level_name_th = "ปริญญาเอก";
        $level->level_name_en = "Doctor's degree";
        if (!$level->save()) return Json::encode($level->errors);
    }

    private function action_type()
    {
        $action_type = new EgsActionType();
        $action_type->action_type_id = 1;
        $action_type->action_type_name_th = "ยื่นเสนอ";
        $action_type->actiont_type_name_en = "Request";
        if (!$action_type->save()) return Json::encode($action_type->errors);
        $action_type = new EgsActionType();
        $action_type->action_type_id = 2;
        $action_type->action_type_name_th = "สอบ";
        $action_type->actiont_type_name_en = "Defense";
        if (!$action_type->save()) return Json::encode($action_type->errors);
    }

    private function action()
    {
        $action = new EgsAction();
        $action->action_id = 1;
        $action->action_name_th = "ขอแต่งตั้งอาจารย์ที่ปรึกษา";
        $action->action_name_en = "Request for Appointment Advisor";
        $action->action_detail_th = "รายละเอียด รายละเอียด รายละเอียด รายละเอียด รายละเอียด รายละเอียด รายละเอียด รายละเอียด รายละเอียด รายละเอียด รายละเอียด รายละเอียด รายละเอียด รายละเอียด รายละเอียด";
        $action->action_detail_en = "detail detail detail detail detail detail detail detail detail detail detail detail detail";
        $action->action_type_id = 1;
        if (!$action->save()) return Json::encode($action->errors);

        $action = new EgsAction();
        $action->action_id = 2;
        $action->action_name_th = "ขอสอบเค้าโครงการศึกษาอิสระ/วิทยานิพนธ์";
        $action->action_name_en = "Request for Defense of Thesis/ Independent Study's Proposal";
        $action->action_detail_th = "รายละเอียด รายละเอียด รายละเอียด รายละเอียด รายละเอียด รายละเอียด รายละเอียด รายละเอียด รายละเอียด รายละเอียด รายละเอียด รายละเอียด รายละเอียด รายละเอียด รายละเอียด";
        $action->action_detail_en = "detail detail detail detail detail detail detail detail detail detail detail detail detail";
        $action->action_type_id = 1;
        if (!$action->save()) return Json::encode($action->errors);
        $action = new EgsAction();
        $action->action_id = 3;
        $action->action_name_th = "สอบเค้าโครงการศึกษาอิสระ/วิทยานิพนธ์";
        $action->action_name_en = "Defense of Thesis/Independent Study's Proposal";
        $action->action_type_id = 2;
        if (!$action->save()) return Json::encode($action->errors);

        $action = new EgsAction();
        $action->action_id = 4;
        $action->action_name_th = "ขอสอบการศึกษาอิสระ/วิทยานิพนธ์ (ยื่นขอครั้งที่ 1)";
        $action->action_name_en = "Request for Defense of Thesis/ Independent Study (1st)";
        $action->action_detail_th = "รายละเอียด รายละเอียด รายละเอียด รายละเอียด รายละเอียด รายละเอียด รายละเอียด รายละเอียด รายละเอียด รายละเอียด รายละเอียด รายละเอียด รายละเอียด รายละเอียด รายละเอียด";
        $action->action_detail_en = "detail detail detail detail detail detail detail detail detail detail detail detail detail";
        $action->action_type_id = 1;
        if (!$action->save()) return Json::encode($action->errors);
        $action = new EgsAction();
        $action->action_id = 5;
        $action->action_name_th = "ขอสอบการศึกษาอิสระ/วิทยานิพนธ์ (ยื่นขอครั้งที่ 2)";
        $action->action_name_en = "Request for Defense of Thesis/ Independent Study (2nd)";
        $action->action_detail_th = "รายละเอียด รายละเอียด รายละเอียด รายละเอียด รายละเอียด รายละเอียด รายละเอียด รายละเอียด รายละเอียด รายละเอียด รายละเอียด รายละเอียด รายละเอียด รายละเอียด รายละเอียด";
        $action->action_detail_en = "detail detail detail detail detail detail detail detail detail detail detail detail detail";
        $action->action_type_id = 1;
        if (!$action->save()) return Json::encode($action->errors);
        $action = new EgsAction();
        $action->action_id = 6;
        $action->action_name_th = "สอบการศึกษาอิสระ/วิทยานิพนธ์ (ครั้งที่ 1)";
        $action->action_name_en = "Defense of Thesis/Independent Study (1st)";
        $action->action_type_id = 2;
        if (!$action->save()) return Json::encode($action->errors);
        $action = new EgsAction();
        $action->action_id = 7;
        $action->action_name_th = "สอบการศึกษาอิสระ/วิทยานิพนธ์ (ครั้งที่ 2)";
        $action->action_name_en = "Defense of Thesis/Independent Study (2nd)";
        $action->action_type_id = 2;
        if (!$action->save()) return Json::encode($action->errors);

        $action = new EgsAction();
        $action->action_id = 8;
        $action->action_name_th = "ขอสอบความก้าวหน้าดุษฎีนิพนธ์";
        $action->action_name_en = "Request for Taking Dissertation Progressing Examination";
        $action->action_detail_th = "รายละเอียด รายละเอียด รายละเอียด รายละเอียด รายละเอียด รายละเอียด รายละเอียด รายละเอียด รายละเอียด รายละเอียด รายละเอียด รายละเอียด รายละเอียด รายละเอียด รายละเอียด";
        $action->action_detail_en = "detail detail detail detail detail detail detail detail detail detail detail detail detail";
        $action->action_type_id = 1;
        if (!$action->save()) return Json::encode($action->errors);
        $action = new EgsAction();
        $action->action_id = 9;
        $action->action_name_th = "สอบความก้าวหน้าดุษฎีนิพนธ์";
        $action->action_name_en = "Dissertation Progressing Examination";
        $action->action_type_id = 2;
        if (!$action->save()) return Json::encode($action->errors);

        $action = new EgsAction();
        $action->action_id = 10;
        $action->action_name_th = "ขอสอบประมวลความรู้/วัดคุณสมบัติ";
        $action->action_name_en = "Request for Taking Comprehensive/Qualifying Examination";
        $action->action_detail_th = "รายละเอียด รายละเอียด รายละเอียด รายละเอียด รายละเอียด รายละเอียด รายละเอียด รายละเอียด รายละเอียด รายละเอียด รายละเอียด รายละเอียด รายละเอียด รายละเอียด รายละเอียด";
        $action->action_detail_en = "detail detail detail detail detail detail detail detail detail detail detail detail detail";
        $action->action_type_id = 1;
        if (!$action->save()) return Json::encode($action->errors);
        $action = new EgsAction();
        $action->action_id = 11;
        $action->action_name_th = "สอบประมวลความรู้/วัดคุณสมบัติ (ข้อเขียน)";
        $action->action_name_en = "Take Comprehensive/Qualifying Examination (Writing)";
        $action->action_type_id = 2;
        if (!$action->save()) return Json::encode($action->errors);
        $action = new EgsAction();
        $action->action_id = 12;
        $action->action_name_th = "สอบประมวลความรู้/วัดคุณสมบัติ (ปากเปล่า)";
        $action->action_name_en = "Take Comprehensive/Qualifying Examination (Oral)";
        $action->action_type_id = 2;
        if (!$action->save()) return Json::encode($action->errors);
    }

    private function request_defense()
    {
        $request_defense = new EgsRequestDefense();
        $request_defense->request_type_id = 2;
        $request_defense->defense_type_id = 3;
        if (!$request_defense->save()) return Json::encode($request_defense->errors);
        $request_defense = new EgsRequestDefense();
        $request_defense->request_type_id = 4;
        $request_defense->defense_type_id = 6;
        if (!$request_defense->save()) return Json::encode($request_defense->errors);
        $request_defense = new EgsRequestDefense();
        $request_defense->request_type_id = 5;
        $request_defense->defense_type_id = 7;
        if (!$request_defense->save()) return Json::encode($request_defense->errors);
        $request_defense = new EgsRequestDefense();
        $request_defense->request_type_id = 8;
        $request_defense->defense_type_id = 9;
        if (!$request_defense->save()) return Json::encode($request_defense->errors);
        $request_defense = new EgsRequestDefense();
        $request_defense->request_type_id = 10;
        $request_defense->defense_type_id = 11;
        if (!$request_defense->save()) return Json::encode($request_defense->errors);
        $request_defense = new EgsRequestDefense();
        $request_defense->request_type_id = 10;
        $request_defense->defense_type_id = 12;
        if (!$request_defense->save()) return Json::encode($request_defense->errors);
    }

    private function action_item()
    {
        $this->insert_action_item(1, 1, [
            1,
            2, 3,
            4, 5, 6, 7,
            8, 9,
            10, 11, 12
        ]);
        $this->insert_action_item(1, 2, [
            1,
            2, 3,
            4, 5, 6, 7,
            8, 9,
            10, 11, 12
        ]);
        $this->insert_action_item(1, 3, [
            10, 11, 12
        ]);
        $this->insert_action_item(2, 1, [
            1,
            2, 3,
            4, 5, 6, 7,
            8, 9,
            10, 11, 12
        ]);
        $this->insert_action_item(2, 2, [
            1,
            2, 3,
            4, 5, 6, 7,
            8, 9,
            10, 11, 12
        ]);
        $this->insert_action_item(2, 3, [
            10, 11, 12
        ]);
    }

    private function insert_action_item($level, $semester, $actions)
    {
        foreach ($actions as $action) {
            $action_item = new EgsActionItem();
            $action_item->action_id = $action;
            $action_item->semester_id = $semester;
            $action_item->level_id = $level;
            $action_item->action_item_active = 1;
            if (!$action_item->save()) return Json::encode($action_item->errors);
        }
    }

}