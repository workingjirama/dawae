<?php

namespace app\modules\egs\controllers\reset;

use app\modules\egs\models\EgsActionCompleteStep;
use app\modules\egs\models\EgsActionDocument;
use app\modules\egs\models\EgsActionFor;
use app\modules\egs\models\EgsActionItem;
use app\modules\egs\models\EgsActionStep;
use app\modules\egs\models\EgsActionSubmitStep;
use app\modules\egs\models\EgsActionType;
use app\modules\egs\models\EgsCalendar;
use app\modules\egs\models\EgsCalendarItem;
use app\modules\egs\models\EgsCalendarLevel;
use app\modules\egs\models\EgsDefense;
use app\modules\egs\models\EgsDocument;
use app\modules\egs\models\EgsDocumentType;
use app\modules\egs\models\EgsLevel;
use app\modules\egs\models\EgsLevelBinder;
use app\modules\egs\models\EgsProgram;
use app\modules\egs\models\EgsProgramBinder;
use app\modules\egs\models\EgsRequestDefense;
use app\modules\egs\models\EgsAction;
use app\modules\egs\models\EgsRequestInit;
use app\modules\egs\models\EgsSemester;
use app\modules\egs\models\EgsStatus;
use app\modules\egs\models\EgsStatusLabel;
use app\modules\egs\models\EgsStep;
use app\modules\egs\models\EgsStepType;
use app\modules\egs\models\EgsSubmitType;
use app\modules\egs\models\EgsUserRequest;
use yii\helpers\Json;

class Calendar
{
    public function delete()
    {
        EgsActionStep::deleteAll();
        EgsStep::deleteAll();
        EgsStepType::deleteAll();
        EgsActionFor::deleteAll();
        EgsStatus::deleteAll();
        EgsStatusLabel::deleteAll();
        EgsActionDocument::deleteAll();
        EgsDocument::deleteAll();
        EgsSubmitType::deleteAll();
        EgsCalendarItem::deleteAll();
        EgsCalendar::deleteAll();
        EgsActionItem::deleteAll();
        EgsRequestDefense::deleteAll();
        EgsRequestInit::deleteAll();
        EgsAction::deleteAll();
        EgsActionType::deleteAll();
        EgsSemester::deleteAll();
    }

    public function insert()
    {
        $this->status_label();
        $this->status();
        $this->action_type();
        $this->action();
        $this->request_defense();
        $this->request_init();
        $this->semester();
        $this->action_item();
        $this->submit_type();
        $this->document();
        $this->action_document();
        $this->action_for();
        $this->step();
        $this->step_type();
        $this->action_step();
    }

    private function step()
    {
        $step = new EgsStep();
        $step->step_id = 1;
        $step->step_name_th = 'DETAIL[TH]';
        $step->step_name_en = 'DETAIL[EN]';
        $step->step_component = 'Detail';
        $step->step_icon = 'message';
        $step->save();
        $step = new EgsStep();
        $step->step_id = 2;
        $step->step_name_th = 'TEACHER[TH]';
        $step->step_name_en = 'TEACHER[EN]';
        $step->step_component = 'Teacher';
        $step->step_icon = 'usergroup-add';
        $step->save();
        $step = new EgsStep();
        $step->step_id = 3;
        $step->step_name_th = 'DEFENSE[TH]';
        $step->step_name_en = 'DEFENSE[EN]';
        $step->step_component = 'Defense';
        $step->step_icon = 'calendar';
        $step->save();
        $step = new EgsStep();
        $step->step_id = 4;
        $step->step_name_th = 'SUMMARY[TH]';
        $step->step_name_en = 'SUMMARY[EN]';
        $step->step_component = 'Summary';
        $step->step_icon = 'profile';
        $step->save();

        $step = new EgsStep();
        $step->step_id = 5;
        $step->step_name_th = 'PETITION_BEFORE+FEE[TH]';
        $step->step_name_en = 'PETITION_BEFORE+FEE[EN]';
        $step->step_component = 'PetBefore';
        $step->step_icon = 'file-text';
        $step->step_validation = 'request_document_before_and_fee_all_submit';
        $step->save();
        $step = new EgsStep();
        $step->step_id = 6;
        $step->step_name_th = 'DOC_BEFORE[TH]';
        $step->step_name_en = 'DOC_BEFORE[EN]';
        $step->step_component = 'DocBefore';
        $step->step_icon = 'cloud-upload-o';
        $step->step_validation = 'defense_document_before_all_submit';
        $step->save();
        $step = new EgsStep();
        $step->step_id = 7;
        $step->step_name_th = 'DEFENSE[TH]';
        $step->step_name_en = 'DEFENSE[EN]';
        $step->step_component = 'DefenseResult';
        $step->step_icon = 'line-chart';
        $step->step_validation = 'defense_resulted';
        $step->save();
        $step = new EgsStep();
        $step->step_id = 8;
        $step->step_name_th = 'PETITION_AFTER[TH]';
        $step->step_name_en = 'PETITION_AFTER[EN]';
        $step->step_component = 'PetAfter';
        $step->step_icon = 'file-text';
        $step->step_validation = 'request_document_after_all_submit';
        $step->save();
        $step = new EgsStep();
        $step->step_id = 9;
        $step->step_name_th = 'DOC_AFTER[TH]';
        $step->step_name_en = 'DOC_AFTER[EN]';
        $step->step_component = 'DocAfter';
        $step->step_icon = 'cloud-upload-o';
        $step->step_validation = 'defense_document_after_all_submit';
        $step->save();
        $step = new EgsStep();
        $step->step_id = 10;
        $step->step_name_th = 'FINAL[TH]';
        $step->step_name_en = 'FINAL[EN]';
        $step->step_component = 'Final';
        $step->step_icon = 'check';
        $step->save();
    }

    private function step_type()
    {
        $step_type = new EgsStepType();
        $step_type->step_type_id = 1;
        $step_type->step_type_name_th = 'SUBMIT';
        $step_type->step_type_name_en = 'SUBMIT';
        $step_type->save();
        $step_type = new EgsStepType();
        $step_type->step_type_id = 2;
        $step_type->step_type_name_th = 'PROCESS';
        $step_type->step_type_name_en = 'PROCESS';
        $step_type->save();
    }

    private function action_step_insert($actions, $steps, $setp_type)
    {
        foreach ($actions as $action) {
            foreach ($steps as $index => $step) {
                $action_step = new EgsActionStep();
                $action_step->action_id = $action;
                $action_step->step_id = $step;
                $action_step->step_type_id = $setp_type;
                $action_step->action_step_index = $index;
                if (!$action_step->save()) {
                    echo Json::encode($action_step->errors);
                    exit();
                }

            }
        }
    }

    private function action_step()
    {
        $step_type = 1;
        $this->action_step_insert([1], [1, 2, 4], $step_type);
        $this->action_step_insert([2, 4, 5, 8], [1, 2, 3, 4], $step_type);
        $this->action_step_insert([13], [2, 3, 4], $step_type);
        $this->action_step_insert([10], [1, 4], $step_type);

        $step_type = 2;
        $this->action_step_insert([1], [5, 10], $step_type);
        $this->action_step_insert([2, 4, 5, 8], [5, 6, 7, 8, 10], $step_type);
        $this->action_step_insert([10], [5, 7, 10], $step_type);
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

    private function status()
    {
        $status = new EgsStatus();
        $status->status_id = 1;
        $status->status_name_th = 'ยังไม่ได้สอบ';
        $status->status_name_en = 'Waiting';
        $status->status_label_id = 3;
        if (!$status->save()) {
            echo Json::encode($status->errors);
            exit();
        }
        $status = new EgsStatus();
        $status->status_id = 2;
        $status->status_name_th = 'สอบไม่ผ่าน';
        $status->status_name_en = 'Not Pass';
        $status->status_label_id = 2;
        if (!$status->save()) {
            echo Json::encode($status->errors);
            exit();
        }
        $status = new EgsStatus();
        $status->status_id = 3;
        $status->status_name_th = 'สอบผ่าน';
        $status->status_name_en = 'Pass';
        $status->status_label_id = 1;
        if (!$status->save()) {
            echo Json::encode($status->errors);
            exit();
        }
        $status = new EgsStatus();
        $status->status_id = 4;
        $status->status_name_th = 'สอบผ่านแบบมีเงื่อยไข';
        $status->status_name_en = 'Pass Conditionally';
        $status->status_label_id = 1;
        if (!$status->save()) {
            echo Json::encode($status->errors);
            exit();
        }

        $status = new EgsStatus();
        $status->status_id = 5;
        $status->status_name_th = 'ส่งแล้ว';
        $status->status_name_en = 'Submitted';
        $status->status_label_id = 1;
        if (!$status->save()) {
            echo Json::encode($status->errors);
            exit();
        }
        $status = new EgsStatus();
        $status->status_id = 6;
        $status->status_name_th = 'ยังไม่ส่ง';
        $status->status_name_en = 'Not Submitted';
        $status->status_label_id = 3;
        if (!$status->save()) {
            echo Json::encode($status->errors);
            exit();
        }
        $status = new EgsStatus();
        $status->status_id = 7;
        $status->status_name_th = 'ไม่ต้องส่ง';
        $status->status_name_en = 'No Need';
        $status->status_label_id = 1;
        if (!$status->save()) {
            echo Json::encode($status->errors);
            exit();
        }

        $status = new EgsStatus();
        $status->status_id = 8;
        $status->status_name_th = 'จ่ายแล้ว';
        $status->status_name_en = 'Paid';
        $status->status_label_id = 1;
        if (!$status->save()) {
            echo Json::encode($status->errors);
            exit();
        }
        $status = new EgsStatus();
        $status->status_id = 9;
        $status->status_name_th = 'ยังไม่จ่าย';
        $status->status_name_en = 'Not Pay Yet';
        $status->status_label_id = 3;
        if (!$status->save()) {
            echo Json::encode($status->errors);
            exit();
        }
        $status = new EgsStatus();
        $status->status_id = 10;
        $status->status_name_th = 'ไม่ต้องจ่าย';
        $status->status_name_en = 'Don\'t Need to Pay';
        $status->status_label_id = 1;
        if (!$status->save()) {
            echo Json::encode($status->errors);
            exit();
        }
    }

    private function status_label()
    {
        $status_label = new EgsStatusLabel();
        $status_label->status_label_id = 1;
        $status_label->status_label_name = 'success';
        if (!$status_label->save()) {
            echo Json::encode($status_label->errors);
            exit();
        }
        $status_label = new EgsStatusLabel();
        $status_label->status_label_id = 2;
        $status_label->status_label_name = 'error';
        if (!$status_label->save()) {
            echo Json::encode($status_label->errors);
            exit();
        }
        $status_label = new EgsStatusLabel();
        $status_label->status_label_id = 3;
        $status_label->status_label_name = 'default';
        if (!$status_label->save()) {
            echo Json::encode($status_label->errors);
            exit();
        }
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
        $document = new EgsDocument();
        $document->document_id = 1;
        $document->document_name_th = 'บว.21 คำร้องขอเสนอชื่ออาจารย์ที่ปรึกษา/เปลี่ยนแปลงอาจารย์ที่ปรึกษาวิทยานิพนธ์';
        $document->document_name_en = 'GS21 [NAME ENG]';
        $document->submit_type_id = 1;
        $document->save();
        $document = new EgsDocument();
        $document->document_id = 2;
        $document->document_name_th = 'วท.บศ.05 แบบเสนอแต่งตั้งคณะกรรมการสอบเค้าโครงวิทยานิพนธ์/การศึกษาอิสระ';
        $document->document_name_en = 'GS05 [NAME ENG]';
        $document->submit_type_id = 1;
        $document->save();
        $document = new EgsDocument();
        $document->document_id = 3;
        $document->document_name_th = 'บว.23 แบบเสนอเค้าโครงวิทยานิพนธ์/การศึกษาอิสระ';
        $document->document_name_en = 'GS23 [NAME ENG]';
        $document->submit_type_id = 2;
        $document->save();
        $document = new EgsDocument();
        $document->document_id = 4;
        $document->document_name_th = 'บว.26 แบบเสนอแต่งตั้งคณะกรรมการสอบวิทยานิพนธ์/การศึกษาอิสระ';
        $document->document_name_en = 'GS26 [NAME ENG]';
        $document->submit_type_id = 1;
        $document->save();
        $document = new EgsDocument();
        $document->document_id = 5;
        $document->document_name_th = 'บว.25 คำร้องขอสอบวิทยานิพนธ์/การศึกษาอิสระ';
        $document->document_name_en = 'GS25 [NAME ENG]';
        $document->submit_type_id = 1;
        $document->save();
        $document = new EgsDocument();
        $document->document_id = 6;
        $document->document_name_th = 'แบบเสนอแต่งตั้งคณะกรรมการสอบความก้าวหน้าดุษฎีนิพนธ์';
        $document->document_name_en = 'GS[XX] [NAME ENG]';
        $document->submit_type_id = 1;
        $document->save();
        $document = new EgsDocument();
        $document->document_id = 7;
        $document->document_name_th = 'บว.30 คำร้องขอสอบประมวลความรู้/สอบวัดคุณสมบัติ';
        $document->document_name_en = 'GS30 [NAME ENG]';
        $document->submit_type_id = 1;
        $document->save();
        $document = new EgsDocument();
        $document->document_id = 8;
        $document->document_name_th = 'บว.31 แบบเสนอแต่งตั้งคณะกรรมการสอบประมวลความรู้ฯ';
        $document->document_name_en = 'GS31 [NAME ENG]';
        $document->submit_type_id = 1;
        $document->save();
        $document = new EgsDocument();
        $document->document_id = 9;
        $document->document_name_th = 'รายงานเค้าโครงงาน';
        $document->document_name_en = 'Proposal\'s Paper';
        $document->submit_type_id = 1;
        $document->save();
        $document = new EgsDocument();
        $document->document_id = 10;
        $document->document_name_th = 'เอกสารโครงงาน';
        $document->document_name_en = 'Final\'s Paper';
        $document->submit_type_id = 1;
        $document->save();
        $document = new EgsDocument();
        $document->document_id = 11;
        $document->document_name_th = 'เอกสารโครงงานที่แก้ไขแล้ว';
        $document->document_name_en = 'Edited Final\'s Paper';
        $document->submit_type_id = 2;
        $document->save();
        $document = new EgsDocument();
        $document->document_id = 12;
        $document->document_name_th = 'รายงานความก้าวหน้าโครงงาน';
        $document->document_name_en = 'Progress\'s Paper';
        $document->submit_type_id = 1;
        $document->save();
    }

    private function action_document_insert($actions, $documents)
    {
        foreach ($actions as $action) {
            foreach ($documents as $document) {
                $action_document = new EgsActionDocument();
                $action_document->action_id = $action;
                $action_document->document_id = $document;
                if (!$action_document->save()) {
                    echo Json::encode($action_document->errors);
                    exit();
                }
            }
        }
    }

    private function action_document()
    {
        $this->action_document_insert([1], [1]);
        $this->action_document_insert([2], [2, 3]);
        $this->action_document_insert([3], [9]);
        $this->action_document_insert([4, 5], [4, 5]);
        $this->action_document_insert([6, 7], [10, 11]);
        $this->action_document_insert([8], [6]);
        $this->action_document_insert([9], [12]);
        $this->action_document_insert([10], [7, 8]);
        $this->action_document_insert([11, 12], []);
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
        $action_type = new EgsActionType();
        $action_type->action_type_id = 3;
        $action_type->action_type_name_th = 'INIT';
        $action_type->actiont_type_name_en = 'INIT';
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
        $action->action_redo = 0;
        $action->action_credit = 0;
        $action->action_cond = 0;
        if (!$action->save()) return Json::encode($action->errors);

        $action = new EgsAction();
        $action->action_id = 2;
        $action->action_name_th = 'ขอสอบเค้าโครงการศึกษาอิสระ/วิทยานิพนธ์';
        $action->action_name_en = 'Request for Defense of Thesis/ Independent Study\'s Proposal';
        $action->action_detail_th = 'รายละเอียด รายละเอียด รายละเอียด รายละเอียด รายละเอียด รายละเอียด รายละเอียด รายละเอียด รายละเอียด รายละเอียด รายละเอียด รายละเอียด รายละเอียด รายละเอียด รายละเอียด';
        $action->action_detail_en = 'detail detail detail detail detail detail detail detail detail detail detail detail detail';
        $action->action_type_id = 1;
        $action->action_default = 0;
        $action->action_redo = 0;
        $action->action_credit = 0;
        $action->action_cond = 0;
        if (!$action->save()) return Json::encode($action->errors);
        $action = new EgsAction();
        $action->action_id = 3;
        $action->action_name_th = 'สอบเค้าโครงการศึกษาอิสระ/วิทยานิพนธ์';
        $action->action_name_en = 'Defense of Thesis/Independent Study\'s Proposal';
        $action->action_type_id = 2;
        $action->action_default = 0;
        $action->action_redo = 0;
        $action->action_credit = 0;
        $action->action_cond = 0;
        if (!$action->save()) return Json::encode($action->errors);

        $action = new EgsAction();
        $action->action_id = 4;
        $action->action_name_th = 'ขอสอบการศึกษาอิสระ/วิทยานิพนธ์ (ยื่นขอครั้งที่ 1)';
        $action->action_name_en = 'Request for Defense of Thesis/ Independent Study (1st)';
        $action->action_detail_th = 'รายละเอียด รายละเอียด รายละเอียด รายละเอียด รายละเอียด รายละเอียด รายละเอียด รายละเอียด รายละเอียด รายละเอียด รายละเอียด รายละเอียด รายละเอียด รายละเอียด รายละเอียด';
        $action->action_detail_en = 'detail detail detail detail detail detail detail detail detail detail detail detail detail';
        $action->action_type_id = 1;
        $action->action_default = 0;
        $action->action_redo = 0;
        $action->action_credit = 0;
        $action->action_cond = 0;
        if (!$action->save()) return Json::encode($action->errors);
        $action = new EgsAction();
        $action->action_id = 5;
        $action->action_name_th = 'ขอสอบการศึกษาอิสระ/วิทยานิพนธ์ (ยื่นขอครั้งที่ 2)';
        $action->action_name_en = 'Request for Defense of Thesis/ Independent Study (2nd)';
        $action->action_detail_th = 'รายละเอียด รายละเอียด รายละเอียด รายละเอียด รายละเอียด รายละเอียด รายละเอียด รายละเอียด รายละเอียด รายละเอียด รายละเอียด รายละเอียด รายละเอียด รายละเอียด รายละเอียด';
        $action->action_detail_en = 'detail detail detail detail detail detail detail detail detail detail detail detail detail';
        $action->action_type_id = 1;
        $action->action_default = 0;
        $action->action_redo = 0;
        $action->action_credit = 0;
        $action->action_cond = 0;
        if (!$action->save()) return Json::encode($action->errors);
        $action = new EgsAction();
        $action->action_id = 6;
        $action->action_name_th = 'สอบการศึกษาอิสระ/วิทยานิพนธ์ (ครั้งที่ 1)';
        $action->action_name_en = 'Defense of Thesis/Independent Study (1st)';
        $action->action_type_id = 2;
        $action->action_default = 0;
        $action->action_redo = 1;
        $action->action_credit = 0;
        $action->action_cond = 1;
        if (!$action->save()) return Json::encode($action->errors);
        $action = new EgsAction();
        $action->action_id = 7;
        $action->action_name_th = 'สอบการศึกษาอิสระ/วิทยานิพนธ์ (ครั้งที่ 2)';
        $action->action_name_en = 'Defense of Thesis/Independent Study (2nd)';
        $action->action_type_id = 2;
        $action->action_default = 0;
        $action->action_redo = 1;
        $action->action_credit = 0;
        $action->action_cond = 1;
        if (!$action->save()) return Json::encode($action->errors);

        $action = new EgsAction();
        $action->action_id = 8;
        $action->action_name_th = 'ขอสอบความก้าวหน้าดุษฎีนิพนธ์';
        $action->action_name_en = 'Request for Taking Dissertation Progressing Examination';
        $action->action_detail_th = 'ร0ละเอียด รายละเอียด รายละเอียด รายละเอียด รายละเอียด รายละเอียด รายละเอียด รายละเอียด รายละเอียด รายละเอียด รายละเอียด รายละเอียด รายละเอียด รายละเอียด รายละเอียด';
        $action->action_detail_en = 'detail detail detail detail detail detail detail detail detail detail detail detail detail';
        $action->action_type_id = 1;
        $action->action_default = 0;
        $action->action_redo = 0;
        $action->action_credit = 0;
        $action->action_cond = 0;
        if (!$action->save()) return Json::encode($action->errors);
        $action = new EgsAction();
        $action->action_id = 9;
        $action->action_name_th = 'สอบความก้าวหน้าดุษฎีนิพนธ์';
        $action->action_name_en = 'Dissertation Progressing Examination';
        $action->action_type_id = 2;
        $action->action_default = 0;
        $action->action_redo = 0;
        $action->action_credit = 1;
        $action->action_cond = 0;
        if (!$action->save()) return Json::encode($action->errors);

        $action = new EgsAction();
        $action->action_id = 10;
        $action->action_name_th = 'ขอสอบประมวลความรู้/วัดคุณสมบัติ';
        $action->action_name_en = 'Request for Taking Comprehensive/Qualifying Examination';
        $action->action_detail_th = 'รายละเอียด รายละเอียด รายละเอียด รายละเอียด รายละเอียด รายละเอียด รายละเอียด รายละเอียด รายละเอียด รายละเอียด รายละเอียด รายละเอียด รายละเอียด รายละเอียด รายละเอียด';
        $action->action_detail_en = 'detail detail detail detail detail detail detail detail detail detail detail detail detail';
        $action->action_type_id = 1;
        $action->action_default = 1;
        $action->action_redo = 0;
        $action->action_credit = 0;
        $action->action_cond = 0;
        if (!$action->save()) return Json::encode($action->errors);
        $action = new EgsAction();
        $action->action_id = 11;
        $action->action_name_th = 'สอบประมวลความรู้/วัดคุณสมบัติ (ข้อเขียน)';
        $action->action_name_en = 'Take Comprehensive/Qualifying Examination (Writing)';
        $action->action_type_id = 2;
        $action->action_default = 1;
        $action->action_redo = 0;
        $action->action_credit = 0;
        $action->action_cond = 0;
        if (!$action->save()) return Json::encode($action->errors);
        $action = new EgsAction();
        $action->action_id = 12;
        $action->action_name_th = 'สอบประมวลความรู้/วัดคุณสมบัติ (ปากเปล่า)';
        $action->action_name_en = 'Take Comprehensive/Qualifying Examination (Oral)';
        $action->action_type_id = 2;
        $action->action_default = 1;
        $action->action_redo = 0;
        $action->action_credit = 0;
        $action->action_cond = 0;
        if (!$action->save()) return Json::encode($action->errors);

        $action = new EgsAction();
        $action->action_id = 13;
        $action->action_name_th = 'ตั้งค่าเริ่มต้นสอบประมวลความรู้/วัดคุณสมบัติ';
        $action->action_name_en = 'Request for Taking Comprehensive/Qualifying Examination';
        $action->action_detail_th = 'รายละเอียด รายละเอียด รายละเอียด รายละเอียด รายละเอียด รายละเอียด รายละเอียด รายละเอียด รายละเอียด รายละเอียด รายละเอียด รายละเอียด รายละเอียด รายละเอียด รายละเอียด';
        $action->action_detail_en = 'detail detail detail detail detail detail detail detail detail detail detail detail detail';
        $action->action_type_id = 3;
        $action->action_default = 0;
        $action->action_redo = 0;
        $action->action_credit = 0;
        $action->action_cond = 0;
        if (!$action->save()) return Json::encode($action->errors);
    }

    private function request_init()
    {
        $request_init = new EgsRequestInit();
        $request_init->request_type_id = 10;
        $request_init->init_type_id = 13;
        if (!$request_init->save()) return Json::encode($request_init->errors);
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
        $request_defense = new EgsRequestDefense();
        $request_defense->request_type_id = 13;
        $request_defense->defense_type_id = 11;
        if (!$request_defense->save()) return Json::encode($request_defense->errors);
        $request_defense = new EgsRequestDefense();
        $request_defense->request_type_id = 13;
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
            10, 11, 12, 13
        ]);
        $this->insert_action_item(1, 2, [
            1,
            2, 3,
            4, 5, 6, 7,
            8, 9,
            10, 11, 12, 13
        ]);
        $this->insert_action_item(1, 3, [
            10, 11, 12, 13
        ]);
        $this->insert_action_item(2, 1, [
            1,
            2, 3,
            4, 5, 6, 7,
            8, 9,
            10, 11, 12, 13
        ]);
        $this->insert_action_item(2, 2, [
            1,
            2, 3,
            4, 5, 6, 7,
            8, 9,
            10, 11, 12, 13
        ]);
        $this->insert_action_item(2, 3, [
            10, 11, 12, 13
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