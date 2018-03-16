<?php

namespace app\modules\egs\controllers;

use app\modules\egs\models\EgsCommittee;
use app\modules\egs\models\EgsDocument;
use app\modules\egs\models\EgsDocumentType;
use app\modules\egs\models\EgsRequestDocument;
use app\modules\egs\models\EgsStatus;
use app\modules\egs\models\EgsSubmitType;
use Yii;
use app\modules\egs\models\EgsAction;
use app\modules\egs\models\EgsActionItem;
use app\modules\egs\models\EgsActionType;
use app\modules\egs\models\EgsAdvisor;
use app\modules\egs\models\EgsCalendarItem;
use app\modules\egs\models\EgsCalendarLevel;
use app\modules\egs\models\EgsDefense;
use app\modules\egs\models\EgsPosition;
use app\modules\egs\models\EgsRequestDefense;
use app\modules\egs\models\EgsRoom;
use app\modules\egs\models\EgsSemester;
use app\modules\egs\models\EgsUserRequest;
use yii\helpers\ArrayHelper;

class Format
{
    public function room($rooms)
    {
        return ArrayHelper::toArray($rooms, ['app\modules\egs\models\EgsRoom' => [
            'room_id',
            'room_name' => function ($room) {
                /* @var $room EgsRoom */
                $lang = new Language();
                return $room['room_name_' . $lang->get()];
            }
        ]]);
    }

    public function personNameOnly($persons)
    {
        $new_persons = [];
        $lang = new Language();
        if (array_key_exists(0, $persons)) {
            foreach ($persons as $person) {
                $new_person = [
                    'id' => (int)$person['id'],
                    'prefix' => $person['prefix_' . $lang->get()],
                    'student_fname' => $person['student_fname_' . $lang->get()],
                    'student_lname' => $person['student_lname_' . $lang->get()],
                    'person_fname' => $person['person_fname_' . $lang->get()],
                    'person_lname' => $person['person_lname_' . $lang->get()],
                ];
                array_push($new_persons, $new_person);
            }
        } else {
            $new_persons = [
                'id' => (int)$persons['id'],
                'prefix' => $persons['prefix_' . $lang->get()],
                'student_fname' => $persons['student_fname_' . $lang->get()],
                'student_lname' => $persons['student_lname_' . $lang->get()],
                'person_fname' => $persons['person_fname_' . $lang->get()],
                'person_lname' => $persons['person_lname_' . $lang->get()],];
        }
        return $new_persons;
    }

    public function calendarItem($calendar_items)
    {
        return ArrayHelper::toArray($calendar_items, ['app\modules\egs\models\EgsCalendarItem' => [
            'calendar_id',
            'level_id',
            'semester_id',
            'action_id',
            'calendar_item_date_start',
            'calendar_item_date_end',
        ]]);
    }

    public function calendarItemFull($calendar_items)
    {
        $pattern = [
            'calendar' => function ($calendar_item) {
                /* @var $calendar_item EgsCalendarItem */
                return $calendar_item->calendar;
            },
            'level' => function ($calendar_item) {
                /* @var $calendar_item EgsCalendarItem */
                return $this->level($calendar_item->semester->level);
            },
            'semester' => function ($calendar_item) {
                /* @var $calendar_item EgsCalendarItem */
                return $this->semester($calendar_item->semester->semester);
            },
            'action' => function ($calendar_item) {
                /* @var $calendar_item EgsCalendarItem */
                return $this->action($calendar_item->semester->action);
            },
            'request_defense' => function ($calendar_item) {
                /* @var $calendar_item EgsCalendarItem */
                $request_defenses = $calendar_item->semester->action->egsRequestDefenses0;
                $calendar_items = [];
                foreach ($request_defenses as $request_defense) {
                    $calendar_item_temp = EgsCalendarItem::findOne([
                        'calendar_id' => $calendar_item->calendar_id,
                        'action_id' => $request_defense->defense_type_id,
                        'level_id' => $calendar_item->level_id,
                        'semester_id' => $calendar_item->semester_id
                    ]);
                    array_push($calendar_items, $calendar_item_temp);
                }
                return $calendar_items;
            },
            'user_request' => function ($calendar_item) {
                /* @var $calendar_item EgsCalendarItem */
                $student_id = Yii::$app->session->get('id');
                $user_request = EgsUserRequest::findOne([
                    'student_id' => $student_id,
                    'calendar_id' => $calendar_item->calendar_id,
                    'action_id' => $calendar_item->action_id,
                    'level_id' => $calendar_item->level_id,
                    'semester_id' => $calendar_item->semester_id
                ]);
                if (empty($user_request)) return null;
                return $this->userRequest($user_request);
            },
            'calendar_item_date_start',
            'calendar_item_date_end',
        ];
        return ArrayHelper::toArray($calendar_items, ['app\modules\egs\models\EgsCalendarItem' => $pattern]);
    }

    public function document_type($document_types)
    {
        return ArrayHelper::toArray($document_types, ['app\modules\egs\models\EgsDocumentType' => [
            'document_type_id',
            'document_type_name' => function ($document_type) {
                /* @var $document_type EgsDocumentType */
                $lang = new Language();
                return $document_type['document_type_name_' . $lang->get()];
            }
        ]]);
    }

    public function submit_type($submit_type)
    {
        return ArrayHelper::toArray($submit_type, ['app\modules\egs\models\EgsSubmitType' => [
            'submit_type_id',
            'submit_type_name' => function ($submit_type) {
                /* @var $submit_type EgsSubmitType */
                $lang = new Language();
                return $submit_type['submit_type_name_' . $lang->get()];
            }
        ]]);
    }

    public function document($documents)
    {
        return ArrayHelper::toArray($documents, ['app\modules\egs\models\EgsDocument' => [
            'document_id',
            'document_name' => function ($document) {
                /* @var $document EgsDocument */
                $lang = new Language();
                return $document['document_name_' . $lang->get()];
            },
            'document_type' => function ($document) {
                /* @var $document EgsDocument */
                return $this->document_type($document->documentType);
            },
            'submit' => function ($document) {
                /* @var $document EgsDocument */
                return $this->submit_type($document->submitType);
            },
        ]]);
    }


    public function request_document($request_documents)
    {
        return ArrayHelper::toArray($request_documents, ['app\modules\egs\models\EgsRequestDocument' => [
            'document' => function ($request_document) {
                /* @var $request_document EgsRequestDocument */
                return $this->document($request_document->document);
            },
            'request_document_path',
            'request_document_id',
        ]]);
    }

    private $PETITION_TYPE = 1;
    private $PAPER_TYPE = 2;

//    private $SUBMIT_BEFORE = 1;

    public function userRequestForListing($user_requests)
    {
        return ArrayHelper::toArray($user_requests, ['app\modules\egs\models\EgsUserRequest' => [
            'student' => function ($user_request) {
                /* @var $user_request EgsUserRequest */
                return $this->personNameOnly(Yii::$app->getDb()->createCommand('SELECT * FROM view_pis_user WHERE id=' . $user_request->student_id)->queryOne());
            },
            'calendar_item' => function ($user_request) {
                /* @var $user_request EgsUserRequest */
                return $user_request->calendar;
            },
            'advisors' => function ($user_request) {
                /* @var $user_request EgsUserRequest */
                return $this->advisor($user_request->egsAdvisors);
            },
            'defenses' => function ($user_request) {
                /* @var $user_request EgsUserRequest */
                return $this->defenseDetail($user_request->egsDefenses);
            },
            'doc_status' => function ($user_request) {
                /* @var $user_request EgsUserRequest */
                return $this->status($user_request->docStatus);
            },
            'pet_status' => function ($user_request) {
                /* @var $user_request EgsUserRequest */
                return $this->status($user_request->petStatus);
            },
            'papers' => function ($user_request) {
                /* @var $user_request EgsUserRequest */
                $papers = [];
                foreach ($user_request->egsRequestDocuments as $requestDocument) {
                    if ($requestDocument->document->document_type_id === $this->PAPER_TYPE)
                        array_push($papers, $requestDocument);
                }
                return $this->request_document($papers);
            },
            'petitions' => function ($user_request) {
                /* @var $user_request EgsUserRequest */
                $petitions = [];
                foreach ($user_request->egsRequestDocuments as $requestDocument) {
                    if ($requestDocument->document->document_type_id === $this->PETITION_TYPE)
                        array_push($petitions, $requestDocument);
                }
                return $this->request_document($petitions);
            },
        ]]);
    }

    public function defenseForListing($defenses)
    {
        return ArrayHelper::toArray($defenses, ['app\modules\egs\models\EgsDefense' => [
            'student' => function ($defenses) {
                /* @var $user_request EgsDefense */
                return $this->personNameOnly(Yii::$app->getDb()->createCommand('SELECT * FROM view_pis_user WHERE id=' . $defenses->student_id)->queryOne());
            },
            'defense_date',
            'defense_time_start',
            'defense_time_end',
            'room' => function ($defense) {
                /* @var $defense EgsDefense */
                return $this->room($defense->room);
            },
            'calendar_item' => function ($defense) {
                /* @var $defense EgsDefense */
                return $defense->student->calendar;
            },
            'defense_type' => function ($defense) {
                /* @var $defense EgsDefense */
                return $this->actionNoDetail($defense->defenseType);
            },
            'room' => function ($defense) {
                /* @var $defense EgsDefense */
                return $this->room($defense->room);
            },
            'committees' => function ($defense) {
                /* @var $defense EgsDefense */
                return $this->committee($defense->egsCommittees);
            },
            'defense_status' => function ($defense) {
                /* @var $defense EgsDefense */
                return $this->status($defense->defenseStatus);
            }
        ]]);
    }

    public function userRequest($user_request)
    {
        return ArrayHelper::toArray($user_request, ['app\modules\egs\models\EgsUserRequest' => [
            'student_id',
            'advisors' => function ($user_request) {
                /*  @var $user_request EgsUserRequest */
                return $user_request->egsAdvisors;
            },
            'defenses' => function ($user_request) {
                /* @var $user_request EgsUserRequest */
                return $this->defense($user_request->egsDefenses);
            }
        ]]);
    }

    public function advisor($advisor)
    {
        return ArrayHelper::toArray($advisor, ['app\modules\egs\models\EgsAdvisor' => [
            'teacher' => function ($advisor) {
                /* @var $advisor EgsAdvisor */
                return $this->personNameOnly(Yii::$app->getDb()->createCommand('SELECT * FROM view_pis_user WHERE id=' . $advisor->teacher_id)->queryOne());
            },
            'position' => function ($advisor) {
                /* @var $advisor EgsAdvisor */
                return $this->position($advisor->position);
            }
        ]]);
    }

    public function committee($committees)
    {
        return ArrayHelper::toArray($committees, ['app\modules\egs\models\EgsCommittee' => [
            'teacher' => function ($committee) {
                /* @var $committee EgsCommittee */
                return $this->personNameOnly(Yii::$app->getDb()->createCommand('SELECT * FROM view_pis_user WHERE id=' . $committee->teacher_id)->queryOne());
            },
            'position' => function ($committee) {
                /* @var $committee EgsCommittee */
                return $this->position($committee->position);
            }
        ]]);
    }

    public function defenseDetail($defenses)
    {
        return ArrayHelper::toArray($defenses, ['app\modules\egs\models\EgsDefense' => [
            'defense_date',
            'defense_time_start',
            'defense_time_end',
            'defense_type' => function ($defense) {
                /* @var $defense EgsDefense */
                return $this->actionNoDetail($defense->defenseType);
            },
            'room' => function ($defense) {
                /* @var $defense EgsDefense */
                return $this->room($defense->room);
            },
            'committees' => function ($defense) {
                /* @var $defense EgsDefense */
                return $this->committee($defense->egsCommittees);
            },
            'defense_status' => function ($defense) {
                /* @var $defense EgsDefense */
                return $this->status($defense->defenseStatus);
            }
        ]]);
    }

    public function status($statuses)
    {
        return ArrayHelper::toArray($statuses, ['app\modules\egs\models\EgsStatus' => [
            'status_id',
            'status_name' => function ($status) {
                /* @var $status EgsStatus */
                $lang = new Language();
                return $status['status_name_' . $lang->get()];

            },
            'status_label' => function ($status) {
                /* @var $status EgsStatus */
                return $status->statusLabel->status_label_name;
            }
        ]]);
    }


    public function defense($defenses)
    {
        return ArrayHelper::toArray($defenses, ['app\modules\egs\models\EgsDefense' => [
            'defense_date',
            'defense_time_start',
            'defense_time_end',
            'room' => function ($defense) {
                /* @var $defense EgsDefense */
                return $this->room($defense->room);
            },
            'committees' => function ($defense) {
                /* @var $defense EgsDefense */
                return $defense->egsCommittees;
            },
            'defense_status' => function ($defense) {
                /* @var $defense EgsDefense */
                return $this->status($defense->defenseStatus);
            }
        ]]);
    }

    public function calendarItemWithStatus($calendar_items)
    {
        return ArrayHelper::toArray($calendar_items, ['app\modules\egs\models\EgsCalendarItem' => [
            'calendar_id',
            'level_id',
            'semester_id',
            'action' => function ($calendar_item) {
                /* @var $calendar_item EgsCalendarItem */
                return $this->actionNoDetail($calendar_item->semester->action);
            },
            'calendar_item_date_start',
            'calendar_item_date_end',
            'calendar_item_open' => function ($calendar_item) {
                /* @var $calendar_item EgsCalendarItem */
                $today = date("Y-m-d");
                $calendar_item->calendar_item_date_start;
                $calendar_item->calendar_item_date_end;
                return $today >= $calendar_item->calendar_item_date_start &&
                    $today <= $calendar_item->calendar_item_date_end;
            }
        ]]);
    }


    public function semester($semesters)
    {
        return ArrayHelper::toArray($semesters, ['app\modules\egs\models\EgsSemester' => [
            'semester_id',
            'semester_name' => function ($semester) {
                /* @var EgsSemester $semester */
                $lang = new Language();
                return $semester['semester_name_' . $lang->get()];
            }
        ]]);
    }

    public function semesterWithActionItem($semesters)
    {
        return ArrayHelper::toArray($semesters, ['app\modules\egs\models\EgsSemester' => [
            'semester_id',
            'semester_name' => function ($semester) {
                /* @var EgsSemester $semester */
                $lang = new Language();
                return $semester['semester_name_' . $lang->get()];
            },
            'action_items' => function ($semester) {
                /* @var EgsSemester $semester */
                return $this->actionItemActionOnly($semester->egsActionItems);
            }
        ]]);
    }

    public function level($levels)
    {
        return ArrayHelper::toArray($levels, ['app\modules\egs\models\EgsLevel' => [
            "level_id",
            "level_name" => function ($level) {
                /* @var $level EgsCalendarLevel */
                $lang = new Language();
                return $level['level_name_' . $lang->get()];
            }
        ]]);
    }

    public function actionItemActionOnly($action_items)
    {
        return ArrayHelper::toArray($action_items, ['app\modules\egs\models\EgsActionItem' => [
            'action' => function ($action_item) {
                /* @var $action_item EgsActionItem */
                return $this->actionNoDetail($action_item->action);
            },
            'level_id',
            'semester_id'
        ]]);
    }

    public function actionNoDetail($actions)
    {
        return ArrayHelper::toArray($actions, ['app\modules\egs\models\EgsAction' => [
            "action_id",
            "action_name" => function ($action) {
                /* @var $action EgsAction */
                $lang = new Language();
                return $action['action_name_' . $lang->get()];
            }
        ]]);
    }


    public function action($actions)
    {
        return ArrayHelper::toArray($actions, ['app\modules\egs\models\EgsAction' => [
            "action_id",
            "action_name" => function ($action) {
                /* @var $action EgsAction */
                $lang = new Language();
                return $action['action_name_' . $lang->get()];
            },
            "action_detail" => function ($action) {
                /* @var $action EgsAction */
                $lang = new Language();
                return $action['action_detail_' . $lang->get()];
            },
            "is_defense" => function ($action) {
                /* @var $action EgsAction */
                $egs_request_defense = EgsRequestDefense::find()->where(['request_type_id' => $action->action_id])->all();
                return !empty($egs_request_defense) ? 1 : 0;
            }
        ]]);
    }

    public function position($position)
    {
        return ArrayHelper::toArray($position, ['app\modules\egs\models\EgsPosition' => [
            'position_id',
            'position_maximum',
            'position_name' => function ($position) {
                /* @var $position EgsPosition */
                $lang = new Language();
                return $position['position_name_' . $lang->get()];
            }
        ]]);
    }

    public function actionItem($action_items)
    {
        return ArrayHelper::toArray($action_items, ['app\modules\egs\models\EgsActionItem' => [
            'action' => function ($action_item) {
                /* @var $action_item EgsActionItem */
                return $action_item->action;
            },
            'level' => function ($action_item) {
                /* @var $action_item EgsActionItem */
                return $this->level($action_item->level);
            },
            'semester' => function ($action_item) {
                /* @var $action_item EgsActionItem */
                return $action_item->semester;
            },
        ]]);
    }
}