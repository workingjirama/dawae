const base = '/dawae/web'
const egs_base = `${base}/egs`
export const URL = {
    BASE: base,
    EGS_BASE: egs_base,
    MAIN: {
        GET_CURRENT_USER: `${egs_base}/person/current`,
        GET_CONFIG: `${egs_base}/config`
    },
    LANGUAGE: {
        GET_DATA: `${egs_base}/language/get`
    },
    CALENDAR: {
        CALENDAR_LIST: {
            MAIN: {
                PATH: `/calendarList`,
                LINK: `${egs_base}/#/calendarList`
            },
            GET_ALL: `${egs_base}/calendar/find-all`,
            INSERT_CALENDAR: `${egs_base}/calendar/calendar-insert`,
        },
        CALENDAR_INIT: {
            MAIN: {
                PATH: `/calendar-init`,
                LINK: `${egs_base}/#/calendar-init`
            },
            GET_CALENDAR_ITEM_INIT: `${egs_base}/calendar-item/find-init`,
        },
        CALENDAR: {
            MAIN: {
                PATH: `/calendar/:calendarId`,
                LINK: (calendarId) => {
                    return `${egs_base}/#/calendar-${calendarId}`
                }
            },
            GET_ALL_SEMESTER: `${egs_base}/semester/all`,
            GET_ALL_ACTION_ITEM: `${egs_base}/action-item/find`,
            GET_ALL_CALENDAR_ITEM: (calendarId) => {
                return `${egs_base}/calendar-item/find?calendar_id=${calendarId}`
            },
            UPDATE_CALENDAR_ITEM: `${egs_base}/calendar-item/update`,
            GET_ALL_LEVEL: `${egs_base}/level/all`,
            GET_CALENDAR: (calendarId) => {
                return `${egs_base}/calendar/find?calendar_id=${calendarId}`
            },
            ACTIVATE_CALENDAR: `${egs_base}/calendar/activate`,
            GET_DEFENSE: `${egs_base}/defense/find`
        }
    },
    REQUEST: {
        REQUEST_LIST: {
            MAIN: {
                PATH: `/requestList`,
                LINK: `${egs_base}/#/requestList`
            },
            GET_ALL_CALENDAR_ITEM_WITH_STATUS: `${egs_base}/calendar-item/find-with-status`,
            GET_ALL_SEMESTER: `${egs_base}/semester/find-all`
        },
        REQUEST_ADD: {
            MAIN: {
                PATH: `/request-add/:ownerId/:calendarId/:levelId/:semesterId/:actionId`,
                LINK: (calendarItem) => {
                    return `${egs_base}/#/request-add/${calendarItem.owner_id}/${calendarItem.calendar_id}/${calendarItem.level_id}/${calendarItem.semester_id}/${calendarItem.action.action_id}`
                }
            },
            GET_STEP: (actionId) => {
                return `${egs_base}/action-step/insert?action_id=${actionId}`
            },
            GET_CALENDAR_ITEM: (ownerId, calendarId, levelId, semesterId, actionId) => {
                return `${egs_base}/calendar-item/find-one?calendar_id=${calendarId}&semester_id=${semesterId}&action_id=${actionId}&owner_id=${ownerId}&level_id=${levelId}`
            },
            GET_ALL_TEACHER: `${egs_base}/person/find-teacher`,
            GET_ALL_POSITION: (actionId) => {
                return `${egs_base}/position/find?action_id=${actionId}`
            },
            GET_ALL_ROOM: `${egs_base}/room/all`,
            INSERT_USER_REQUEST: `${egs_base}/user-request/insert`,
            GET_DEFENSE_EVENT: `${egs_base}/defense/event`
        },
        REQUEST_DATA: {
            MAIN: {
                PATH: `/request-data`,
                LINK: `${egs_base}/#/request-data`
            },
            GET_STEP: (actionId) => {
                return `${egs_base}/action-step/process?action_id=${actionId}`
            },
            GET_STATUS: `${egs_base}/status/all`,
            UPDATE_RESULT: `${egs_base}/defense/update-result`,
            UPDATE_REQUEST_DOCUMENT: `${egs_base}/request-document/update`,
            UPDATE_REQUEST_FEE: `${egs_base}/user-request/update-fee`,
            UPDATE_DEFENSE_DOCUMENT: `${egs_base}/defense-document/update`,
        }
    },
    DATA: {
        DATA_REQUEST: {
            MAIN: {
                PATH: `/request`,
                LINK: `${egs_base}/#/request`
            },
            GET_ALL_USER_REQUEST: `${egs_base}/user-request/find-all`,
            GET_ALL_ACTION: `${egs_base}/action/find-all?is_defense=0`,
            GET_ALL_REQUEST_DOCUMENT_STATUS: `${egs_base}/status/find?type_id=1`,
            GET_ALL_POST_REQUEST_DOCUMENT_STATUS: `${egs_base}/status/post-request-document-status`,
            GET_ALL_FEE_STATUS: `${egs_base}/status/find?type_id=4`,
            UPDATE_REQUEST_DOCUMENT: `${egs_base}/request-document/update`,
            UPDATE_REQUEST_FEE: `${egs_base}/user-request/update-fee`
        },
        DATA_DEFENSE: {
            MAIN: {
                PATH: `/defense`,
                LINK: `${egs_base}/#/defense`
            },
            GET_ALL_DEFENSE: `${egs_base}/defense/find-all`,
            GET_ALL_ACTION: `${egs_base}/action/find-all?is_defense=1`,
            GET_ALL_DEFENSE_STATUS: `${egs_base}/status/find?type_id=3`,
            GET_ALL_POST_DEFENSE_DOCUMENT_STATUS: `${egs_base}/status/post-defense-document-status`,
            UPDATE_RESULT: `${egs_base}/defense/update-result`,
            UPDATE_DEFENSE_COMMENT: `${egs_base}/defense/update-comment`,
            UPDATE_DEFENSE_SCORE: `${egs_base}/defense/update-score`,
            UPDATE_DEFENSE_CREDIT: `${egs_base}/defense/update-credit`,
            GET_ALL_DOC_STATUS: `${egs_base}/status/find?type_id=2`,
            UPDATE_DEFENSE_DOCUMENT: `${egs_base}/defense-document/update`,
        }
    },
    PRINTING: {
        REVIEW_ADD: {
            MAIN: {
                PATH: `/review-add`,
                LINK: `${egs_base}/#/review-add`
            }
        },
        REVIEW_LIST: {
            MAIN: {
                PATH: `/review-list`,
                LINK: `${egs_base}/#/review-list`
            }
        },
        REVIEW: {
            INSERT_REVIEW: `${egs_base}/printing/insert-review`,
            INSERT_REVIEW_COMPONENT: `${egs_base}/printing/insert-review-component`,
            GET_ALL_REVIEW: `${egs_base}/printing/get-review`
        }
    }
}

export const TYPE = {
    MAIN: {
        SET_HEADER: 'SET_MAIN_HEADER',
        SET_CONTAINER: 'SET_MAIN_CONTAINER',
        SET_CURRENT_USER: 'SET_MAIN_CURRENT_USER',
        SET_CONFIG: 'SET_MAIN_CONFIG'
    },
    LANGUAGE: {
        SET_DATA: 'SET_LANGUAGE_DATA'
    },
    CALENDAR: {
        CALENDAR_LIST: {
            SET_ALL: 'SET_CALENDAR_LIST_ALL',
            SET_POST: 'SET_CALENDAR_LIST_POST',
            SET_BTN_ACTIVE: 'SET_CALENDAR_LIST_ACTIVE_BTN',
            RESET: 'RESET_CALENDAR_LIST'
        },
        CALENDAR_INIT: {
            SET_ALL_CALENDAR_ITEM: 'SET_CALENDAR_INITCALENDAR_ITEM_ALL',
            RESET: 'RESET_CALENDAR_INIT'
        },
        CALENDAR: {
            SET_ALL_SEMESTER: 'SET_CALENDAR_SEMESTER_ALL',
            SET_ALL_ACTION_ITEM: 'SET_CALENDAR_ACTION_ITEM_ALL',
            SET_ALL_CALENDAR_ITEM: 'SET_CALENDAR_CALENDAR_ITEM_ALL',
            UPDATE_CALENDAR_ITEM: 'UPDATE_CALENDAR_CALENDAR_ITEM',
            SET_ALL_LEVEL: 'SET_CALENDAR_LEVEL_ALL',
            SET_CALENDAR: 'SET_CALENDAR_CALENDAR',
            RESET: 'RESET_CALENDAR',
        }
    },
    REQUEST: {
        REQUEST_LIST: {
            SET_CALENDAR_ITEM_WITH_STATUS: 'SET_REQUEST_LIST_CALEDNAR_ITEM_WTIH_STATUS',
            SET_ALL_SEMESTER: 'SET_REQUEST_LIST_ALL_SEMESTER',
            RESET: 'RESET_REQUEST_LIST',
        },
        REQUEST_ADD: {
            SET_CALENDAR_ITEM: 'SET_REQUEST_ADD_CALEDNAR_ITEM',
            SET_ALL_TEACHER: 'SET_REQUEST_ADD_ALL_TEACHER',
            SET_ALL_POSITION: 'SET_REQUEST_ADD_ALL_POSITION',
            SET_POST: 'SET_REQUEST_ADD_POST',
            SET_ALL_ROOM: 'SET_REQUEST_ADD_ALL_ROOM',
            SET_STEP: 'SET_REQUEST_ADD_ACTION_STEP',
            SET_CURRENT: 'SET_REQUEST_ADD_CURRENT',
            SET_COMPONENT: 'SET_REQUEST_ADD_COMPONENT',
            RESET: 'RESET_REQUEST_ADD',
        },
        REQUEST_DATA: {
            SET_STEP: 'SET_REQUEST_DATA_STEP',
            SET_STATUS: 'SET_REQUEST_DATA_STATUS',
            SET_UNMOUNT: 'SET_REQUEST_DATA_UNMOUNT'
        }
    },
    DATA: {
        DATA_REQUEST: {
            SET_ALL_USER_REQUEST: 'SET_DATA_REQUEST_ALL_USER_REQUEST',
            SET_ALL_ACTION: 'SET_DATA_REQUEST_ALL_ACTION',
            UPDATE_USER_REQUEST: 'UPDATE_DATA_REQUEST_USER_REQUEST',
            RESET: 'RESET_DATA_REQUEST',
            SET_ALL_PET_STATUS: 'SET_DATA_REQUEST_ALL_PET_STATUS',
            SET_ALL_FEE_STATUS: 'SET_DATA_REQUEST_ALL_FEE_STATUS',
            SET_ALL_POST_REQUEST_DOCUMENT_STATUS: 'SET_DATA_REQUEST_ALL_REQUEST_DOCUMENT_STATUS'
        },
        DATA_DEFENSE: {
            SET_ALL_DEFENSE: 'SET_DATA_DEFENSE_ALL_DEFENSE',
            SET_ALL_ACTION: 'SET_DATA_DEFENSE_ALL_ACTION',
            RESET: 'RESET_CALENDAR',
            SET_ALL_DEFENSE_STATUS: 'SET_DATA_DEFENSE_ALL_DEFENSE_STATUS',
            UPDATE_DEFENSE: 'UPDATE_DATA_DEFENSE_DEFENSE',
            SET_ALL_DOC_STATUS: 'SET_DATA_REQUEST_ALL_DOC_STATUS',
            SET_ALL_POST_DEFENSE_DOCUMENT_STATUS: 'SET_DATA_DEFENSE_ALL_DEFENSE_DOCUMENT_STATUS'
        }
    },
    PRINTING: {
        REVIEW: {
            SET_ALL_REVIEW: 'SET_REVIEW_ALL_REVIEW'
        }
    }
}
