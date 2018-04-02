<?php

namespace app\modules\egs\controllers;

use app\modules\egs\models\EgsActionFor;
use app\modules\egs\models\EgsCommittee;
use app\modules\egs\models\EgsDocument;
use app\modules\egs\models\EgsDocumentType;
use app\modules\egs\models\EgsPrinting;
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
use yii\helpers\Json;

class Format
{
    static public function defenseEvent($defenses)
    {
        /* @var $defense EgsDefense */
        $user = Config::get_current_user();
        $user_id = (int)$user['user_type_id'] === Config::$PERSON_STAFF_TYPE ? Config::$SYSTEM_ID : (int)$user['id'];
        $events = [];
        foreach ($defenses as $defense) {
            $event = [];
            if ($defense->student_id === $user_id) {
                $event['type'] = 'current';
                $event['backgroundColor'] = '#F19C65';
                $event['borderColor'] = '#F19C65';
            } else {
                $event['type'] = 'defense';
                $event['backgroundColor'] = '#0A7B83';
                $event['borderColor'] = '#0A7B83';
            }
            $event['title'] = $defense->defenseType['action_name_' . Config::get_language()];
            $event['start'] = $defense->defense_date . 'T' . $defense->defense_time_start;
            $event['end'] = $defense->defense_date . 'T' . $defense->defense_time_end;
            array_push($events, $event);
        }
        return $events;
    }

    static public function room($rooms)
    {
        return ArrayHelper::toArray($rooms, ['app\modules\egs\models\EgsRoom' => [
            'room_id',
            'room_name' => function ($room) {
                /* @var $room EgsRoom */
                return $room['room_name_' . Config::get_language()];
            }
        ]]);
    }

    static private function setPerson($person, $is_loaded = false)
    {
        $person_ = [
            'id' => (int)$person['id'],
            'prefix' => $person['prefix_' . Config::get_language()],
            'student_fname' => $person['student_fname_' . Config::get_language()],
            'student_lname' => $person['student_lname_' . Config::get_language()],
            'person_fname' => $person['person_fname_' . Config::get_language()],
            'person_lname' => $person['person_lname_' . Config::get_language()],
            'user_type_id' => (int)$person['user_type_id'],
            'user_id' => $person['user_id']
        ];
        if ($is_loaded) {
            $advisors = EgsAdvisor::find()->where([
                'teacher_id' => (int)$person['id']
            ])->all();
            $loaded = 0;
            $pre_loaded = 0;
            foreach ($advisors as $advisor) {
                $loaded = $advisor->calendar->petition_status_id === Config::$COMPLETE_PETITION_STATUS
                    ? $loaded += $advisor->load->load_amount : $pre_loaded += $advisor->load->load_amount;
            }
            $person_['pre_loaded'] = $pre_loaded;
            $person_['loaded'] = $loaded;
        }
        return $person_;
    }

    static public function personNameOnlyLoaded($persons)
    {
        $new_persons = [];
        if (array_key_exists(0, $persons)) {
            foreach ($persons as $person) {
                $new_person = Format::setPerson($person, true);
                array_push($new_persons, $new_person);
            }
        } else {
            $new_persons = Format::setPerson($persons, true);
        }
        return $new_persons;
    }

    static public function personNameOnly($persons)
    {
        $new_persons = [];
        if (array_key_exists(0, $persons)) {
            foreach ($persons as $person) {
                $new_person = Format::setPerson($person);
                array_push($new_persons, $new_person);
            }
        } else {
            $new_persons = Format::setPerson($persons);
        }
        return $new_persons;
    }

    static public function calendarItem($calendar_items)
    {
        return ArrayHelper::toArray($calendar_items, ['app\modules\egs\models\EgsCalendarItem' => [
            'calendar_id',
            'level_id',
            'semester_id',
            'action_id',
            'calendar_item_date_start',
            'calendar_item_date_end',
            'owner_id',
            'default' => function ($calendar_item) {
                /* @var $calendar_item EgsCalendarItem */
                return $calendar_item->semester->action->action_default;
            }
        ]]);
    }

    static private $plan_id;
    static private $program_id;

    static public function calendarItemFull($calendar_items, $plan_id, $program_id)
    {
        Format::$plan_id = $plan_id;
        Format::$program_id = $program_id;
        $pattern = [
            'calendar' => function ($calendar_item) {
                /* @var $calendar_item EgsCalendarItem */
                return $calendar_item->calendar;
            },
            'level' => function ($calendar_item) {
                /* @var $calendar_item EgsCalendarItem */
                return Format::level($calendar_item->semester->level);
            },
            'semester' => function ($calendar_item) {
                /* @var $calendar_item EgsCalendarItem */
                return Format::semester($calendar_item->semester->semester);
            },
            'action' => function ($calendar_item) {
                /* @var $calendar_item EgsCalendarItem */
                return Format::action($calendar_item->semester->action);
            },
            'request_defense' => function ($calendar_item) {
                /* @var $calendar_item EgsCalendarItem */
                $request_defenses = $calendar_item->semester->action->egsRequestDefenses0;
                $calendar_items = [];
                foreach ($request_defenses as $request_defense) {
                    $action_for = EgsActionFor::findOne([
                        'action_id' => $request_defense->defense_type_id,
                        'program_id' => Format::$program_id,
                        'plan_id' => Format::$plan_id,
                    ]);
                    if (!empty($action_for)) {
                        $calendar_item_temp = EgsCalendarItem::findOne([
                            'calendar_id' => $calendar_item->calendar_id,
                            'action_id' => $request_defense->defense_type_id,
                            'level_id' => $calendar_item->level_id,
                            'semester_id' => $calendar_item->semester_id,
                            'owner_id' => $calendar_item->owner_id
                        ]);
                        array_push($calendar_items, $calendar_item_temp);
                    }
                }
                return $calendar_items;
            },
            'owner_id',
            'user_request' => function ($calendar_item) {
                /* @var $calendar_item EgsCalendarItem */
                if (!empty($calendar_item->semester->action->egsRequestDefenses0)) {
                    if ($calendar_item->semester->action->egsRequestDefenses0[0]->defenseType->action_default) {
                        $defenses = [];
                        foreach ($calendar_item->semester->action->egsRequestDefenses0 as $request_defense) {

                            $action_for = EgsActionFor::findOne([
                                'action_id' => $request_defense->defense_type_id,
                                'program_id' => Format::$program_id,
                                'plan_id' => Format::$plan_id,
                            ]);
                            if (!empty($action_for)) {
                                $defense = EgsDefense::findOne([
                                    'student_id' => Config::$SYSTEM_ID,
                                    'calendar_id' => $calendar_item->calendar_id,
                                    'action_id' => $request_defense->defense_type_id,
                                    'level_id' => $calendar_item->level_id,
                                    'semester_id' => $calendar_item->semester_id,
                                    'defense_type_id' => $request_defense->defense_type_id,
                                    'owner_id' => $calendar_item->owner_id
                                ]);
                                array_push($defenses, Format::defense($defense));
                            }
                        }
                        $user_request['defenses'] = $defenses;
                        $user_request['advisors'] = [];
                        return Format::userRequest($user_request);
                    }
                }
                $student_id = Config::get_user_id();
                $user_request = EgsUserRequest::findOne([
                    'student_id' => $student_id,
                    'calendar_id' => $calendar_item->calendar_id,
                    'action_id' => $calendar_item->action_id,
                    'level_id' => $calendar_item->level_id,
                    'semester_id' => $calendar_item->semester_id,
                    'owner_id' => $calendar_item->owner_id
                ]);
                if (empty($user_request)) return null;
                return Format::userRequest($user_request);
            },
            'calendar_item_date_start',
            'calendar_item_date_end',
        ];
        return ArrayHelper::toArray($calendar_items, ['app\modules\egs\models\EgsCalendarItem' => $pattern]);
    }

    static public function document_type($document_types)
    {
        return ArrayHelper::toArray($document_types, ['app\modules\egs\models\EgsDocumentType' => [
            'document_type_id',
            'document_type_name' => function ($document_type) {
                /* @var $document_type EgsDocumentType */
                return $document_type['document_type_name_' . Config::get_language()];
            }
        ]]);
    }

    static public function submit_type($submit_type)
    {
        return ArrayHelper::toArray($submit_type, ['app\modules\egs\models\EgsSubmitType' => [
            'submit_type_id',
            'submit_type_name' => function ($submit_type) {
                /* @var $submit_type EgsSubmitType */
                return $submit_type['submit_type_name_' . Config::get_language()];
            }
        ]]);
    }

    static public function document($documents)
    {
        return ArrayHelper::toArray($documents, ['app\modules\egs\models\EgsDocument' => [
            'document_id',
            'document_name' => function ($document) {
                /* @var $document EgsDocument */
                return $document['document_name_' . Config::get_language()];
            },
            'document_type' => function ($document) {
                /* @var $document EgsDocument */
                return Format::document_type($document->documentType);
            },
            'submit' => function ($document) {
                /* @var $document EgsDocument */
                return Format::submit_type($document->submitType);
            },
        ]]);
    }

    static public function printingForListing($printings)
    {
        return ArrayHelper::toArray($printings, ['app\modules\egs\models\EgsPrinting' => [
            'printing_id',
            'owner' => function ($printings) {
                /* @var $printings EgsPrinting */
                return Format::personNameOnly(Config::get_one_user($printings->owner_id));
            },
            'printing_component' => function ($printing) {
                /* @var $printing EgsPrinting */
                return Format::printing_component($printing->egsPrintingComponents);
            }
        ]]);
    }


    static public function printing($printings)
    {
        return ArrayHelper::toArray($printings, ['app\modules\egs\models\EgsPrinting' => [
            'owner' => function ($printings) {
                /* @var $printings EgsPrinting */
                return Format::personNameOnly(Config::get_one_user($printings->owner_id));
            },
            'printing_component' => function ($printing) {
                /* @var $printing EgsPrinting */
                return Format::printing_component($printing->egsPrintingComponents);
            }
        ]]);
    }

    static public function printing_component($printing_components)
    {
        return ArrayHelper::toArray($printing_components, ['app\modules\egs\models\EgsPrintingComponent' => [
            'printing_component_id',
            'printing_value',
        ]]);
    }

    static public function request_document($request_documents)
    {
        return ArrayHelper::toArray($request_documents, ['app\modules\egs\models\EgsRequestDocument' => [
            'document' => function ($request_document) {
                /* @var $request_document EgsRequestDocument */
                return Format::document($request_document->document);
            },
            'request_document_path',
            'request_document_id',
        ]]);
    }

    static public function userRequestForListing($user_requests)
    {
        return ArrayHelper::toArray($user_requests, ['app\modules\egs\models\EgsUserRequest' => [
            'student' => function ($user_request) {
                /* @var $user_request EgsUserRequest */
                return Format::personNameOnly(Config::get_one_user($user_request->student_id));
            },
            'calendar_item' => function ($user_request) {
                /* @var $user_request EgsUserRequest */
                return $user_request->calendar;
            },
            'advisors' => function ($user_request) {
                /* @var $user_request EgsUserRequest */
                return Format::advisor($user_request->egsAdvisors);
            },
            'defenses' => function ($user_request) {
                /* @var $user_request EgsUserRequest */
                return Format::defenseDetail($user_request->egsDefenses);
            },
            'paper_status_id',
            'petition_status_id',
            'fee_status_id',
            'request_fee',
            'request_fee_paid',
            'papers' => function ($user_request) {
                /* @var $user_request EgsUserRequest */
                $papers = [];
                foreach ($user_request->egsRequestDocuments as $requestDocument) {
                    if ($requestDocument->document->document_type_id === Config::$DOCUMENT_PAPER_TYPE)
                        array_push($papers, $requestDocument);
                }
                return Format::request_document($papers);
            },
            'petitions' => function ($user_request) {
                /* @var $user_request EgsUserRequest */
                $petitions = [];
                foreach ($user_request->egsRequestDocuments as $requestDocument) {
                    if ($requestDocument->document->document_type_id === Config::$DOCUMENT_PETITION_TYPE)
                        array_push($petitions, $requestDocument);
                }
                return Format::request_document($petitions);
            }
        ]]);
    }

    static public function defenseForListing($defenses)
    {
        return ArrayHelper::toArray($defenses, ['app\modules\egs\models\EgsDefense' => [
            'student' => function ($defenses) {
                /* @var $user_request EgsDefense */
                return Format::personNameOnly(Config::get_one_user($defenses->student_id));
            },
            'defense_score',
            'defense_credit',
            'defense_comment',
            'defense_date',
            'defense_time_start',
            'defense_time_end',
            'room' => function ($defense) {
                /* @var $defense EgsDefense */
                return Format::room($defense->room);
            },
            'calendar_item' => function ($defense) {
                /* @var $defense EgsDefense */
                return $defense->calendar->calendar;
            },
            'defense_type' => function ($defense) {
                /* @var $defense EgsDefense */
                return Format::actionNoDetail($defense->defenseType);
            },
            'room' => function ($defense) {
                /* @var $defense EgsDefense */
                return Format::room($defense->room);
            },
            'committees' => function ($defense) {
                /* @var $defense EgsDefense */
                return Format::committee($defense->egsCommittees);
            },
            'defense_status_id'
        ]]);
    }

    static public function userRequest($user_request)
    {
        return ArrayHelper::toArray($user_request, ['app\modules\egs\models\EgsUserRequest' => [
            'student_id',
            'advisors' => function ($user_request) {
                /*  @var $user_request EgsUserRequest */
                return $user_request->egsAdvisors;
            },
            'defenses' => function ($user_request) {
                /* @var $user_request EgsUserRequest */
                return Format::defense($user_request->egsDefenses);
            }
        ]]);
    }

    static public function advisor($advisor)
    {
        return ArrayHelper::toArray($advisor, ['app\modules\egs\models\EgsAdvisor' => [
            'teacher' => function ($advisor) {
                /* @var $advisor EgsAdvisor */
                return Format::personNameOnly(Config::get_one_user($advisor->teacher_id));
            },
            'position' => function ($advisor) {
                /* @var $advisor EgsAdvisor */
                return Format::position($advisor->position);
            }
        ]]);
    }

    static public function committee($committees)
    {
        return ArrayHelper::toArray($committees, ['app\modules\egs\models\EgsCommittee' => [
            'teacher' => function ($committee) {
                /* @var $committee EgsCommittee */
                return Format::personNameOnly(Config::get_one_user($committee->teacher_id));
            },
            'position' => function ($committee) {
                /* @var $committee EgsCommittee */
                return Format::position($committee->position);
            }
        ]]);
    }

    static public function defenseDetail($defenses)
    {
        return ArrayHelper::toArray($defenses, ['app\modules\egs\models\EgsDefense' => [
            'defense_date',
            'defense_time_start',
            'defense_time_end',
            'defense_type' => function ($defense) {
                /* @var $defense EgsDefense */
                return Format::actionNoDetail($defense->defenseType);
            },
            'room' => function ($defense) {
                /* @var $defense EgsDefense */
                return Format::room($defense->room);
            },
            'committees' => function ($defense) {
                /* @var $defense EgsDefense */
                return Format::committee($defense->egsCommittees);
            },
            'defense_status' => function ($defense) {
                /* @var $defense EgsDefense */
                return Format::status($defense->defenseStatus);
            }
        ]]);
    }

    static public function status($statuses)
    {
        return ArrayHelper::toArray($statuses, ['app\modules\egs\models\EgsStatus' => [
            'status_id',
            'status_name' => function ($status) {
                /* @var $status EgsStatus */
                return $status['status_name_' . Config::get_language()];
            },
            'status_label' => function ($status) {
                /* @var $status EgsStatus */
                return $status->statusLabel->status_label_name;
            }
        ]]);
    }


    static public function defense($defenses)
    {
        return ArrayHelper::toArray($defenses, ['app\modules\egs\models\EgsDefense' => [
            'defense_date',
            'defense_time_start',
            'defense_time_end',
            'defense_type' => function ($defense) {
                /* @var $defense EgsDefense */
                return Format::actionNoDetail($defense->defenseType);
            },
            'room' => function ($defense) {
                /* @var $defense EgsDefense */
                return Format::room($defense->room);
            },
            'committees' => function ($defense) {
                /* @var $defense EgsDefense */
                return $defense->egsCommittees;
            },
            'defense_status' => function ($defense) {
                /* @var $defense EgsDefense */
                return Format::status($defense->defenseStatus);
            }
        ]]);
    }

    static public function calendarItemWithStatus($calendar_items)
    {
        return ArrayHelper::toArray($calendar_items, ['app\modules\egs\models\EgsCalendarItem' => [
            'calendar_id',
            'level_id',
            'semester_id',
            'owner_id',
            'action' => function ($calendar_item) {
                /* @var $calendar_item EgsCalendarItem */
                return Format::actionNoDetail($calendar_item->semester->action);
            },
            'calendar_item_date_start',
            'calendar_item_date_end',
            'calendar_item_added' => function ($calendar_item) {
                /* @var $calendar_item EgsCalendarItem */
                $added = false;
                $user_id = Config::get_user_id();
                foreach ($calendar_item->egsUserRequests as $user_request)
                    if ($user_request->student_id === $user_id)
                        $added = true;
                return $added;
            },
            'calendar_item_open' => function ($calendar_item) {
                /* @var $calendar_item EgsCalendarItem */
                $today = date('Y-m-d');
                $calendar_item->calendar_item_date_start;
                $calendar_item->calendar_item_date_end;
                return $today >= $calendar_item->calendar_item_date_start &&
                    $today <= $calendar_item->calendar_item_date_end;
            }
        ]]);
    }

    static public function semester($semesters)
    {
        return ArrayHelper::toArray($semesters, ['app\modules\egs\models\EgsSemester' => [
            'semester_id',
            'semester_name' => function ($semester) {
                /* @var EgsSemester $semester */
                return $semester['semester_name_' . Config::get_language()];
            }
        ]]);
    }

    static public function semesterWithActionItem($semesters)
    {
        return ArrayHelper::toArray($semesters, ['app\modules\egs\models\EgsSemester' => [
            'semester_id',
            'semester_name' => function ($semester) {
                /* @var EgsSemester $semester */
                return $semester['semester_name_' . Config::get_language()];
            },
            'action_items' => function ($semester) {
                /* @var EgsSemester $semester */
                return Format::actionItemActionOnly($semester->egsActionItems);
            }
        ]]);
    }

    static public function level($levels)
    {
        return ArrayHelper::toArray($levels, ['app\modules\egs\models\EgsLevel' => [
            'level_id',
            'level_name' => function ($level) {
                /* @var $level EgsCalendarLevel */
                return $level['level_name_' . Config::get_language()];
            }
        ]]);
    }

    static public function actionItemActionOnly($action_items)
    {
        return ArrayHelper::toArray($action_items, ['app\modules\egs\models\EgsActionItem' => [
            'action' => function ($action_item) {
                /* @var $action_item EgsActionItem */
                return Format::actionNoDetail($action_item->action);
            },
            'level_id',
            'semester_id'
        ]]);
    }

    static public function actionNoDetail($actions)
    {
        return ArrayHelper::toArray($actions, ['app\modules\egs\models\EgsAction' => [
            'action_id',
            'action_name' => function ($action) {
                /* @var $action EgsAction */
                return $action['action_name_' . Config::get_language()];
            }
        ]]);
    }

    static public function action($actions)
    {
        return ArrayHelper::toArray($actions, ['app\modules\egs\models\EgsAction' => [
            'action_id',
            'action_default' => function ($action) {
                /* @var $action EgsAction */
                if (!empty($action->egsRequestDefenses0))
                    return $action->egsRequestDefenses0[0]->defenseType->action_default;
                else return 0;
            },
            'action_name' => function ($action) {
                /* @var $action EgsAction */

                return $action['action_name_' . Config::get_language()];
            },
            'action_detail' => function ($action) {
                /* @var $action EgsAction */

                return $action['action_detail_' . Config::get_language()];
            },
            'is_defense' => function ($action) {
                /* @var $action EgsAction */
                $egs_request_defense = EgsRequestDefense::find()->where(['request_type_id' => $action->action_id])->all();
                return !empty($egs_request_defense) ? 1 : 0;
            }
        ]]);
    }

    static public function position($position)
    {
        return ArrayHelper::toArray($position, ['app\modules\egs\models\EgsPosition' => [
            'position_id',
            'position_minimum',
            'position_maximum',
            'position_name' => function ($position) {
                /* @var $position EgsPosition */

                return $position['position_name_' . Config::get_language()];
            }
        ]]);
    }

    static public function actionItem($action_items)
    {
        return ArrayHelper::toArray($action_items, ['app\modules\egs\models\EgsActionItem' => [
            'action' => function ($action_item) {
                /* @var $action_item EgsActionItem */
                return $action_item->action;
            },
            'level' => function ($action_item) {
                /* @var $action_item EgsActionItem */
                return Format::level($action_item->level);
            },
            'semester' => function ($action_item) {
                /* @var $action_item EgsActionItem */
                return $action_item->semester;
            }
        ]]);
    }
}