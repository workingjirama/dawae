<?php

namespace app\modules\egs\controllers\reset;

use app\modules\egs\models\EgsActionDocument;
use app\modules\egs\models\EgsActionFor;
use app\modules\egs\models\EgsActionItem;
use app\modules\egs\models\EgsActionOnStatus;
use app\modules\egs\models\EgsActionType;
use app\modules\egs\models\EgsCalendar;
use app\modules\egs\models\EgsCalendarItem;
use app\modules\egs\models\EgsCalendarLevel;
use app\modules\egs\models\EgsDefense;
use app\modules\egs\models\EgsDocument;
use app\modules\egs\models\EgsDocumentType;
use app\modules\egs\models\EgsLevel;
use app\modules\egs\models\EgsLevelBinder;
use app\modules\egs\models\EgsOnStatus;
use app\modules\egs\models\EgsProgram;
use app\modules\egs\models\EgsProgramBinder;
use app\modules\egs\models\EgsRequestDefense;
use app\modules\egs\models\EgsAction;
use app\modules\egs\models\EgsSemester;
use app\modules\egs\models\EgsStatus;
use app\modules\egs\models\EgsStatusLabel;
use app\modules\egs\models\EgsStatusType;
use app\modules\egs\models\EgsSubmitType;
use app\modules\egs\models\EgsUserRequest;
use yii\helpers\Json;


class Calendar
{
    public function delete()
    {
        EgsActionFor::deleteAll();
        EgsActionOnStatus::deleteAll();
        EgsStatus::deleteAll();
        EgsStatusType::deleteAll();
        EgsStatusLabel::deleteAll();
        EgsOnStatus::deleteAll();
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
    }

    public function insert()
    {
        $this->status_type();
        $this->status_label();
        $this->request_status();
        $this->action_type();
        $this->action();
        $this->request_defense();
        $this->semester();
        $this->action_item();
        $this->document_type();
        $this->submit_type();
        $this->document();
        $this->action_document();
        $this->on_status();
        $this->action_on_status();
        $this->action_for();
    }


    private function action_for_insert($action_id, $plans, $programs)
    {
        foreach ($plans as $plan) {
            foreach ($programs as $program) {
                $action_for = new EgsActionFor();
                $action_for->action_id = $action_id;
                $action_for->plan_id = $plan;
                $action_for->program_id = $program;
                if (!$action_for->save()) {
                    echo Json::encode($action_for->errors);
                    exit();
                }
            }
        }
    }

    private function action_for()
    {
        $this->action_for_insert(1, [1, 2, 3, 4, 5, 6, 7], [1, 2, 3]);
        $this->action_for_insert(2, [1, 2, 3, 4, 5, 6, 7], [1, 2, 3]);
        $this->action_for_insert(3, [1, 2, 3, 4, 5, 6, 7], [1, 2, 3]);
        $this->action_for_insert(4, [1, 2, 3, 4, 5, 6, 7], [1, 2, 3]);
        $this->action_for_insert(5, [1, 2, 3, 4, 5, 6, 7], [1, 2, 3]);
        $this->action_for_insert(6, [1, 2, 3, 4, 5, 6, 7], [1, 2, 3]);
        $this->action_for_insert(7, [1, 2, 3, 4, 5, 6, 7], [1, 2, 3]);
        $this->action_for_insert(8, [4, 5, 6, 7], [1, 2, 3]);
        $this->action_for_insert(9, [4, 5, 6, 7], [1, 2, 3]);
        $this->action_for_insert(10, [3, 4, 5, 6, 7], [1, 2, 3]);
        $this->action_for_insert(11, [3, 4, 5, 6, 7], [1, 2, 3]);
        $this->action_for_insert(12, [3], [1]);
        $this->action_for_insert(12, [4, 5, 6, 7], [1, 2, 3]);
    }

    private function status_type()
    {
        $status_type = new EgsStatusType();
        $status_type->status_type_id = 1;
        $status_type->status_type_name = 'PETITION';
        if (!$status_type->save()) return Json::encode($status_type->errors);
        $status_type = new EgsStatusType();
        $status_type->status_type_id = 2;
        $status_type->status_type_name = 'PAPER';
        if (!$status_type->save()) return Json::encode($status_type->errors);
        $status_type = new EgsStatusType();
        $status_type->status_type_id = 3;
        $status_type->status_type_name = 'DEFENSE';
        if (!$status_type->save()) return Json::encode($status_type->errors);
        $status_type = new EgsStatusType();
        $status_type->status_type_id = 4;
        $status_type->status_type_name = 'FEE';
        if (!$status_type->save()) return Json::encode($status_type->errors);
    }

    private function request_status()
    {
        $status = new EgsStatus();
        $status->status_id = 4;
        $status->status_name_th = 'ยังไม่ได้ส่งใบคำร้อง';
        $status->status_name_en = 'YANG MAI DAI SONG PET';
        $status->status_type_id = 1;
        $status->status_label_id = 2;
        if (!$status->save()) return Json::encode($status->errors);
        $status = new EgsStatus();
        $status->status_id = 5;
        $status->status_name_th = 'ส่งใบคำร้องแล้ว';
        $status->status_name_en = 'SONG PET LAEW';
        $status->status_type_id = 1;
        $status->status_label_id = 1;
        if (!$status->save()) return Json::encode($status->errors);
        $status = new EgsStatus();
        $status->status_id = 6;
        $status->status_name_th = 'ไม่ต้องส่งใบคำร้อง';
        $status->status_name_en = 'MAI TONG SONG PET';
        $status->status_type_id = 1;
        $status->status_label_id = 1;
        if (!$status->save()) return Json::encode($status->errors);

        $status = new EgsStatus();
        $status->status_id = 1;
        $status->status_name_th = 'ยังไม่ได้อัพโหลดเอกสารสอบ';
        $status->status_name_en = 'YANG MAI DAI UPLOAD DOC';
        $status->status_type_id = 2;
        $status->status_label_id = 2;
        if (!$status->save()) return Json::encode($status->errors);
        $status = new EgsStatus();
        $status->status_id = 2;
        $status->status_name_th = 'อัพโหลดเอกสารสอบแล้ว';
        $status->status_name_en = 'UPLOAD DOC LAEW';
        $status->status_type_id = 2;
        $status->status_label_id = 1;
        if (!$status->save()) return Json::encode($status->errors);
        $status = new EgsStatus();
        $status->status_id = 3;
        $status->status_name_th = 'ไม่ต้องอัพโหลดเอกสาร';
        $status->status_name_en = 'MAI TONG UPLOAD DOC';
        $status->status_type_id = 2;
        $status->status_label_id = 1;
        if (!$status->save()) return Json::encode($status->errors);

        $status = new EgsStatus();
        $status->status_id = 7;
        $status->status_name_th = 'ยังไม่พร้อมสอบ';
        $status->status_name_en = 'YANG MAI PROM SORB';
        $status->status_type_id = 3;
        $status->status_label_id = 2;
        if (!$status->save()) return Json::encode($status->errors);
        $status = new EgsStatus();
        $status->status_id = 8;
        $status->status_name_th = 'ยังไม่มีผลสอบ';
        $status->status_name_en = 'YANG MAI MEE PON SORB';
        $status->status_type_id = 3;
        $status->status_label_id = 4;
        if (!$status->save()) return Json::encode($status->errors);
        $status = new EgsStatus();
        $status->status_id = 9;
        $status->status_name_th = 'สอบผ่าน(ต้องส่งเอกสารหลังสอบ)';
        $status->status_name_en = 'PASS WITH DOC';
        $status->status_type_id = 3;
        $status->status_label_id = 3;
        if (!$status->save()) return Json::encode($status->errors);
        $status = new EgsStatus();
        $status->status_id = 10;
        $status->status_name_th = 'สอบผ่าน';
        $status->status_name_en = 'PASS';
        $status->status_type_id = 3;
        $status->status_label_id = 1;
        if (!$status->save()) return Json::encode($status->errors);
        $status = new EgsStatus();
        $status->status_id = 11;
        $status->status_name_th = 'สอบไม่ผ่าน';
        $status->status_name_en = 'YOU SHALL NOT PASS';
        $status->status_type_id = 3;
        $status->status_label_id = 2;
        if (!$status->save()) return Json::encode($status->errors);

        $status = new EgsStatus();
        $status->status_id = 12;
        $status->status_name_th = 'ไม่ต้องจ่าย';
        $status->status_name_en = 'DONT HAVE TO PAY';
        $status->status_type_id = 4;
        $status->status_label_id = 1;
        if (!$status->save()) return Json::encode($status->errors);
        $status = new EgsStatus();
        $status->status_id = 13;
        $status->status_name_th = 'จ่ายแล้ว';
        $status->status_name_en = 'PAID';
        $status->status_type_id = 4;
        $status->status_label_id = 1;
        if (!$status->save()) return Json::encode($status->errors);
        $status = new EgsStatus();
        $status->status_id = 14;
        $status->status_name_th = 'ยังไม่ได้จ่าย';
        $status->status_name_en = 'NOT PAID YET';
        $status->status_type_id = 4;
        $status->status_label_id = 2;
        if (!$status->save()) return Json::encode($status->errors);

    }

    private function status_label()
    {
        $status_label = new EgsStatusLabel();
        $status_label->status_label_id = 1;
        $status_label->status_label_name = 'success';
        if (!$status_label->save()) return Json::encode($status_label->errors);
        $status_label = new EgsStatusLabel();
        $status_label->status_label_id = 2;
        $status_label->status_label_name = 'danger';
        if (!$status_label->save()) return Json::encode($status_label->errors);
        $status_label = new EgsStatusLabel();
        $status_label->status_label_id = 3;
        $status_label->status_label_name = 'warning';
        if (!$status_label->save()) return Json::encode($status_label->errors);
        $status_label = new EgsStatusLabel();
        $status_label->status_label_id = 4;
        $status_label->status_label_name = 'info';
        if (!$status_label->save()) return Json::encode($status_label->errors);
    }

    private function on_status()
    {
        $on_status = new EgsOnStatus();
        $on_status->on_status_id = 1;
        $on_status->on_status_name_th = 'DEFAULT';
        $on_status->on_status_name_en = 'DEFAULT';
        $on_status->save();
        $on_status = new EgsOnStatus();
        $on_status->on_status_id = 2;
        $on_status->on_status_name_th = 'SUCCESS';
        $on_status->on_status_name_en = 'SUCCESS';
        $on_status->save();
        $on_status = new EgsOnStatus();
        $on_status->on_status_id = 3;
        $on_status->on_status_name_th = 'FAIL';
        $on_status->on_status_name_en = 'FAIL';
        $on_status->save();
        $on_status = new EgsOnStatus();
        $on_status->on_status_id = 4;
        $on_status->on_status_name_th = 'READY';
        $on_status->on_status_name_en = 'READY';
        $on_status->save();
    }

    private function action_on_status_insert($action_id, $statuses)
    {
        foreach ($statuses as $on => $status) {
            $action_on_status = new EgsActionOnStatus();
            $action_on_status->action_id = $action_id;
            $action_on_status->on_status_id = $on;
            $action_on_status->status_id = $status;
            if (!$action_on_status->save()) {
                echo Json::encode($action_on_status->errors);
                exit();
            };
        }
    }

    private function action_on_status()
    {
        /* NOTE:  PETITION TYPE */
        $this->action_on_status_insert(1, [
            1 => 4,
            2 => 5,
            3 => 4
        ]);
        $this->action_on_status_insert(2, [
            1 => 4,
            2 => 5,
            3 => 4
        ]);
        $this->action_on_status_insert(4, [
            1 => 4,
            2 => 5,
            3 => 4
        ]);
        $this->action_on_status_insert(5, [
            1 => 4,
            2 => 5,
            3 => 4
        ]);
        $this->action_on_status_insert(8, [
            1 => 4,
            2 => 5,
            3 => 4
        ]);
        $this->action_on_status_insert(10, [
            1 => 4,
            2 => 5,
            3 => 4
        ]);
        /* NOTE: PAPER TYPE */
        $this->action_on_status_insert(1, [
            1 => 3
        ]);
        $this->action_on_status_insert(2, [
            1 => 1,
            2 => 2,
            3 => 1
        ]);
        $this->action_on_status_insert(4, [
            1 => 1,
            2 => 2,
            3 => 1
        ]);
        $this->action_on_status_insert(5, [
            1 => 1,
            2 => 2,
            3 => 1
        ]);
        $this->action_on_status_insert(8, [
            1 => 1,
            2 => 2,
            3 => 1
        ]);
        $this->action_on_status_insert(10, [
            1 => 3
        ]);
        /* NOTE: DEFENSE TYPE */
        $this->action_on_status_insert(3, [
            1 => 7,
            2 => 9,
            2 => 10,
            3 => 11,
            4 => 8
        ]);
        $this->action_on_status_insert(6, [
            1 => 7,
            2 => 9,
            2 => 10,
            3 => 11,
            4 => 8
        ]);
        $this->action_on_status_insert(7, [
            1 => 7,
            2 => 9,
            2 => 10,
            3 => 11,
            4 => 8
        ]);
        $this->action_on_status_insert(9, [
            1 => 7,
            2 => 10,
            3 => 11,
            4 => 8
        ]);
        $this->action_on_status_insert(11, [
            1 => 7,
            2 => 10,
            3 => 11,
            4 => 8
        ]);
        $this->action_on_status_insert(12, [
            1 => 7,
            2 => 10,
            3 => 11,
            4 => 8,
        ]);
        /* NOTE: FEE TYPE */
        $this->action_on_status_insert(1, [
            1 => 12
        ]);
        $this->action_on_status_insert(2, [
            1 => 12
        ]);
        $this->action_on_status_insert(4, [
            1 => 14,
            2 => 13,
            3 => 14
        ]);
        $this->action_on_status_insert(5, [
            1 => 14,
            2 => 13,
            3 => 14
        ]);
        $this->action_on_status_insert(8, [
            1 => 12
        ]);
        $this->action_on_status_insert(10, [
            1 => 14,
            2 => 13,
            3 => 14
        ]);
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
        $document->document_name_th = 'บว.21 คำร้องขอเสนอชื่ออาจารย์ที่ปรึกษา/เปลี่ยนแปลงอาจารย์ที่ปรึกษาวิทยานิพนธ์';
        $document->document_name_en = 'GS21 [NAME ENG]';
        $document->document_type_id = $doc_type_id;
        $document->submit_type_id = 1;
        $document->save();
        $document = new EgsDocument();
        $document->document_id = 2;
        $document->document_name_th = 'วท.บศ.05 แบบเสนอแต่งตั้งคณะกรรมการสอบเค้าโครงวิทยานิพนธ์/การศึกษาอิสระ';
        $document->document_name_en = 'GS05 [NAME ENG]';
        $document->document_type_id = $doc_type_id;
        $document->submit_type_id = 1;
        $document->save();
        $document = new EgsDocument();
        $document->document_id = 3;
        $document->document_name_th = 'บว.23 แบบเสนอเค้าโครงวิทยานิพนธ์/การศึกษาอิสระ';
        $document->document_name_en = 'GS23 [NAME ENG]';
        $document->document_type_id = $doc_type_id;
        $document->submit_type_id = 2;
        $document->save();
        $document = new EgsDocument();
        $document->document_id = 4;
        $document->document_name_th = 'บว.26 แบบเสนอแต่งตั้งคณะกรรมการสอบวิทยานิพนธ์/การศึกษาอิสระ';
        $document->document_name_en = 'GS26 [NAME ENG]';
        $document->document_type_id = $doc_type_id;
        $document->submit_type_id = 1;
        $document->save();
        $document = new EgsDocument();
        $document->document_id = 5;
        $document->document_name_th = 'บว.25 คำร้องขอสอบวิทยานิพนธ์/การศึกษาอิสระ';
        $document->document_name_en = 'GS25 [NAME ENG]';
        $document->document_type_id = $doc_type_id;
        $document->submit_type_id = 1;
        $document->save();
        $document = new EgsDocument();
        $document->document_id = 6;
        $document->document_name_th = 'แบบเสนอแต่งตั้งคณะกรรมการสอบความก้าวหน้าดุษฎีนิพนธ์';
        $document->document_name_en = 'GS[XX] [NAME ENG]';
        $document->document_type_id = $doc_type_id;
        $document->submit_type_id = 1;
        $document->save();
        $document = new EgsDocument();
        $document->document_id = 7;
        $document->document_name_th = 'บว.30 คำร้องขอสอบประมวลความรู้/สอบวัดคุณสมบัติ';
        $document->document_name_en = 'GS30 [NAME ENG]';
        $document->document_type_id = $doc_type_id;
        $document->submit_type_id = 1;
        $document->save();
        $document = new EgsDocument();
        $document->document_id = 8;
        $document->document_name_th = 'บว.31 แบบเสนอแต่งตั้งคณะกรรมการสอบประมวลความรู้ฯ';
        $document->document_name_en = 'GS31 [NAME ENG]';
        $document->document_type_id = $doc_type_id;
        $document->submit_type_id = 1;
        $document->save();

        $doc_type_id = 2;
        $document = new EgsDocument();
        $document->document_id = 9;
        $document->document_name_th = 'รายงานเค้าโครงงาน';
        $document->document_name_en = 'Proposal\'s Paper';
        $document->document_type_id = $doc_type_id;
        $document->submit_type_id = 1;
        $document->save();
        $document = new EgsDocument();
        $document->document_id = 10;
        $document->document_name_th = 'เอกสารโครงงาน';
        $document->document_name_en = 'Final\'s Paper';
        $document->document_type_id = $doc_type_id;
        $document->submit_type_id = 1;
        $document->save();
        $document = new EgsDocument();
        $document->document_id = 11;
        $document->document_name_th = 'เอกสารโครงงานที่แก้ไขแล้ว';
        $document->document_name_en = 'Edited Final\'s Paper';
        $document->document_type_id = $doc_type_id;
        $document->submit_type_id = 2;
        $document->save();
        $document = new EgsDocument();
        $document->document_id = 12;
        $document->document_name_th = 'รายงานความก้าวหน้าโครงงาน';
        $document->document_name_en = 'Progress\'s Paper';
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

    private function semester()
    {
        $semester = new EgsSemester();
        $semester->semester_id = 1;
        $semester->semester_name_th = 'ภาคต้น';
        $semester->semester_name_en = '1st Semester';
        if (!$semester->save()) return Json::encode($semester->errors);
        $semester = new EgsSemester();
        $semester->semester_id = 2;
        $semester->semester_name_th = 'ภาคปลาย';
        $semester->semester_name_en = '2nd Semester';
        if (!$semester->save()) return Json::encode($semester->errors);
        $semester = new EgsSemester();
        $semester->semester_id = 3;
        $semester->semester_name_th = 'พิเศษ';
        $semester->semester_name_en = 'Summer Semester';
        if (!$semester->save()) return Json::encode($semester->errors);
    }


    private function action_type()
    {
        $action_type = new EgsActionType();
        $action_type->action_type_id = 1;
        $action_type->action_type_name_th = 'ยื่นเสนอ';
        $action_type->actiont_type_name_en = 'Request';
        if (!$action_type->save()) return Json::encode($action_type->errors);
        $action_type = new EgsActionType();
        $action_type->action_type_id = 2;
        $action_type->action_type_name_th = 'สอบ';
        $action_type->actiont_type_name_en = 'Defense';
        if (!$action_type->save()) return Json::encode($action_type->errors);
    }

    private function action()
    {
        $action = new EgsAction();
        $action->action_id = 1;
        $action->action_name_th = 'ขอแต่งตั้งอาจารย์ที่ปรึกษา';
        $action->action_name_en = 'Request for Appointment Advisor';
        $action->action_detail_th = 'รายละเอียด รายละเอียด รายละเอียด รายละเอียด รายละเอียด รายละเอียด รายละเอียด รายละเอียด รายละเอียด รายละเอียด รายละเอียด รายละเอียด รายละเอียด รายละเอียด รายละเอียด';
        $action->action_detail_en = 'detail detail detail detail detail detail detail detail detail detail detail detail detail';
        $action->action_type_id = 1;
        $action->action_default = 0;
        $action->redo = 0;
        if (!$action->save()) return Json::encode($action->errors);

        $action = new EgsAction();
        $action->action_id = 2;
        $action->action_name_th = 'ขอสอบเค้าโครงการศึกษาอิสระ/วิทยานิพนธ์';
        $action->action_name_en = 'Request for Defense of Thesis/ Independent Study\'s Proposal';
        $action->action_detail_th = 'รายละเอียด รายละเอียด รายละเอียด รายละเอียด รายละเอียด รายละเอียด รายละเอียด รายละเอียด รายละเอียด รายละเอียด รายละเอียด รายละเอียด รายละเอียด รายละเอียด รายละเอียด';
        $action->action_detail_en = 'detail detail detail detail detail detail detail detail detail detail detail detail detail';
        $action->action_type_id = 1;
        $action->action_default = 0;
        $action->redo = 0;
        if (!$action->save()) return Json::encode($action->errors);
        $action = new EgsAction();
        $action->action_id = 3;
        $action->action_name_th = 'สอบเค้าโครงการศึกษาอิสระ/วิทยานิพนธ์';
        $action->action_name_en = 'Defense of Thesis/Independent Study\'s Proposal';
        $action->action_type_id = 2;
        $action->action_default = 0;
        $action->redo = 0;
        if (!$action->save()) return Json::encode($action->errors);

        $action = new EgsAction();
        $action->action_id = 4;
        $action->action_name_th = 'ขอสอบการศึกษาอิสระ/วิทยานิพนธ์ (ยื่นขอครั้งที่ 1)';
        $action->action_name_en = 'Request for Defense of Thesis/ Independent Study (1st)';
        $action->action_detail_th = 'รายละเอียด รายละเอียด รายละเอียด รายละเอียด รายละเอียด รายละเอียด รายละเอียด รายละเอียด รายละเอียด รายละเอียด รายละเอียด รายละเอียด รายละเอียด รายละเอียด รายละเอียด';
        $action->action_detail_en = 'detail detail detail detail detail detail detail detail detail detail detail detail detail';
        $action->action_type_id = 1;
        $action->action_default = 0;
        $action->redo = 0;
        if (!$action->save()) return Json::encode($action->errors);
        $action = new EgsAction();
        $action->action_id = 5;
        $action->action_name_th = 'ขอสอบการศึกษาอิสระ/วิทยานิพนธ์ (ยื่นขอครั้งที่ 2)';
        $action->action_name_en = 'Request for Defense of Thesis/ Independent Study (2nd)';
        $action->action_detail_th = 'รายละเอียด รายละเอียด รายละเอียด รายละเอียด รายละเอียด รายละเอียด รายละเอียด รายละเอียด รายละเอียด รายละเอียด รายละเอียด รายละเอียด รายละเอียด รายละเอียด รายละเอียด';
        $action->action_detail_en = 'detail detail detail detail detail detail detail detail detail detail detail detail detail';
        $action->action_type_id = 1;
        $action->action_default = 0;
        $action->redo = 0;
        if (!$action->save()) return Json::encode($action->errors);
        $action = new EgsAction();
        $action->action_id = 6;
        $action->action_name_th = 'สอบการศึกษาอิสระ/วิทยานิพนธ์ (ครั้งที่ 1)';
        $action->action_name_en = 'Defense of Thesis/Independent Study (1st)';
        $action->action_type_id = 2;
        $action->action_default = 0;
        $action->redo = 1;
        if (!$action->save()) return Json::encode($action->errors);
        $action = new EgsAction();
        $action->action_id = 7;
        $action->action_name_th = 'สอบการศึกษาอิสระ/วิทยานิพนธ์ (ครั้งที่ 2)';
        $action->action_name_en = 'Defense of Thesis/Independent Study (2nd)';
        $action->action_type_id = 2;
        $action->action_default = 0;
        $action->redo = 1;
        if (!$action->save()) return Json::encode($action->errors);

        $action = new EgsAction();
        $action->action_id = 8;
        $action->action_name_th = 'ขอสอบความก้าวหน้าดุษฎีนิพนธ์';
        $action->action_name_en = 'Request for Taking Dissertation Progressing Examination';
        $action->action_detail_th = 'ร0ละเอียด รายละเอียด รายละเอียด รายละเอียด รายละเอียด รายละเอียด รายละเอียด รายละเอียด รายละเอียด รายละเอียด รายละเอียด รายละเอียด รายละเอียด รายละเอียด รายละเอียด';
        $action->action_detail_en = 'detail detail detail detail detail detail detail detail detail detail detail detail detail';
        $action->action_type_id = 1;
        $action->action_default = 0;
        $action->redo = 0;
        if (!$action->save()) return Json::encode($action->errors);
        $action = new EgsAction();
        $action->action_id = 9;
        $action->action_name_th = 'สอบความก้าวหน้าดุษฎีนิพนธ์';
        $action->action_name_en = 'Dissertation Progressing Examination';
        $action->action_type_id = 2;
        $action->action_default = 0;
        $action->redo = 0;
        if (!$action->save()) return Json::encode($action->errors);

        $action = new EgsAction();
        $action->action_id = 10;
        $action->action_name_th = 'ขอสอบประมวลความรู้/วัดคุณสมบัติ';
        $action->action_name_en = 'Request for Taking Comprehensive/Qualifying Examination';
        $action->action_detail_th = 'รายละเอียด รายละเอียด รายละเอียด รายละเอียด รายละเอียด รายละเอียด รายละเอียด รายละเอียด รายละเอียด รายละเอียด รายละเอียด รายละเอียด รายละเอียด รายละเอียด รายละเอียด';
        $action->action_detail_en = 'detail detail detail detail detail detail detail detail detail detail detail detail detail';
        $action->action_type_id = 1;
        $action->action_default = 0;
        $action->redo = 0;
        if (!$action->save()) return Json::encode($action->errors);
        $action = new EgsAction();
        $action->action_id = 11;
        $action->action_name_th = 'สอบประมวลความรู้/วัดคุณสมบัติ (ข้อเขียน)';
        $action->action_name_en = 'Take Comprehensive/Qualifying Examination (Writing)';
        $action->action_type_id = 2;
        $action->action_default = 1;
        $action->redo = 0;
        if (!$action->save()) return Json::encode($action->errors);
        $action = new EgsAction();
        $action->action_id = 12;
        $action->action_name_th = 'สอบประมวลความรู้/วัดคุณสมบัติ (ปากเปล่า)';
        $action->action_name_en = 'Take Comprehensive/Qualifying Examination (Oral)';
        $action->action_type_id = 2;
        $action->action_default = 1;
        $action->redo = 0;
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
            if (!$action_item->save()) return Json::encode($action_item->errors);
        }
    }

}