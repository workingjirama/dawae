<?php

namespace app\modules\egs\controllers\reset;

use app\modules\egs\models\EgsActionItem;
use app\modules\egs\models\EgsActionType;
use app\modules\egs\models\EgsAdvisor;
use app\modules\egs\models\EgsCalendar;
use app\modules\egs\models\EgsCalendarItem;
use app\modules\egs\models\EgsCalendarLevel;
use app\modules\egs\models\EgsCommittee;
use app\modules\egs\models\EgsDefense;
use app\modules\egs\models\EgsDefenseStatus;
use app\modules\egs\models\EgsLevel;
use app\modules\egs\models\EgsPosition;
use app\modules\egs\models\EgsPositionType;
use app\modules\egs\models\EgsRequestDefense;
use app\modules\egs\models\EgsAction;
use app\modules\egs\models\EgsRequestDocStatus;
use app\modules\egs\models\EgsRequestStatus;
use app\modules\egs\models\EgsRequestStatusType;
use app\modules\egs\models\EgsRoom;
use app\modules\egs\models\EgsSemester;
use app\modules\egs\models\EgsStatus;
use app\modules\egs\models\EgsStatusLabel;
use app\modules\egs\models\EgsStatusType;
use app\modules\egs\models\EgsUserRequest;
use yii\helpers\Json;

class Request
{
    public function delete()
    {
        EgsCommittee::deleteAll();
        EgsDefense::deleteAll();
        EgsAdvisor::deleteAll();
        EgsUserRequest::deleteAll();
        EgsPosition::deleteAll();
        EgsPositionType::deleteAll();
        EgsRoom::deleteAll();
        EgsStatus::deleteAll();
        EgsStatusType::deleteAll();
        EgsStatusLabel::deleteAll();
    }

    public function insert()
    {
        $this->position_type();
        $this->position();
        $this->room();
        $this->status_type();
        $this->status_label();
        $this->request_status();
    }

    private function status_type()
    {
        $status_type = new EgsStatusType();
        $status_type->status_type_id = 1;
        $status_type->status_type_name = 'REQ_PET';
        if (!$status_type->save()) return Json::encode($status_type->errors);
        $status_type = new EgsStatusType();
        $status_type->status_type_id = 2;
        $status_type->status_type_name = 'REQ_DOC';
        if (!$status_type->save()) return Json::encode($status_type->errors);
        $status_type = new EgsStatusType();
        $status_type->status_type_id = 3;
        $status_type->status_type_name = 'DEF';
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

    private function position_type()
    {
        $position_type = new EgsPositionType();
        $position_type->position_type_id = 1;
        $position_type->position_type_name = "comittee's position";
        if (!$position_type->save()) return Json::encode($position_type->errors);
        $position_type = new EgsPositionType();
        $position_type->position_type_id = 2;
        $position_type->position_type_name = "advisor's position";
        if (!$position_type->save()) return Json::encode($position_type->errors);
    }

    private function position()
    {
        $position = new EgsPosition();
        $position->position_id = 1;
        $position->position_name_th = 'อาจารย์ที่ปรึกษาหลัก';
        $position->position_name_en = 'main-advisor';
        $position->position_maximum = 1;
        $position->position_type_id = 2;
        if (!$position->save()) return Json::encode($position->errors);
        $position = new EgsPosition();
        $position->position_id = 2;
        $position->position_name_th = 'อาจารย์ที่ปรึกษาร่วม';
        $position->position_name_en = 'co-advisor';
        $position->position_maximum = 2;
        $position->position_type_id = 2;
        if (!$position->save()) return Json::encode($position->errors);
        $position = new EgsPosition();
        $position->position_id = 3;
        $position->position_name_th = 'ประธานกรรมการ';
        $position->position_name_en = 'main-committee';
        $position->position_maximum = 1;
        $position->position_type_id = 1;
        if (!$position->save()) return Json::encode($position->errors);
        $position = new EgsPosition();
        $position->position_id = 4;
        $position->position_name_th = 'กรรมการ';
        $position->position_name_en = 'committee';
        $position->position_maximum = 3;
        $position->position_type_id = 1;
        if (!$position->save()) return Json::encode($position->errors);
    }

    private function room()
    {
        $room = new EgsRoom();
        $room->room_id = 1;
        $room->room_name_th = "ห้อง1";
        $room->room_name_en = "ROOM1";
        if (!$room->save()) return Json::encode($room->errors);
        $room = new EgsRoom();
        $room->room_id = 2;
        $room->room_name_th = "ห้อง2";
        $room->room_name_en = "ROOM2";
        if (!$room->save()) return Json::encode($room->errors);
        $room = new EgsRoom();
        $room->room_id = 3;
        $room->room_name_th = "ห้อง3";
        $room->room_name_en = "ROOM3";
        if (!$room->save()) return Json::encode($room->errors);
    }
}