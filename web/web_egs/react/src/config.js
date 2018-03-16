const base = '/dawae/web/egs'
export const URL = {
    BASE: base,
    CALENDAR: {
        CALENDAR_LIST: {
            MAIN: {
                PATH: `/calendarList`,
                LINK: `${base}/#/calendarList`
            },
            GET_ALL: `${base}/calendar/find-all`,
            INSERT_CALENDAR: `${base}/calendar/calendar-insert`,
        },
        CALENDAR: {
            MAIN: {
                PATH: `/calendar-:calendarId`,
                LINK: (calendarId) => {
                    return `${base}/#/calendar-${calendarId}`
                }
            },
            GET_ALL_SEMESTER: `${base}/semester/all`,
            GET_ALL_ACTION_ITEM: `${base}/action-item/find`,
            GET_ALL_CALENDAR_ITEM: (calendarId) => {
                return `${base}/calendar-item/find?calendar_id=${calendarId}`
            },
            UPDATE_CALENDAR_ITEM: `${base}/calendar-item/update`,
            GET_ALL_LEVEL: `${base}/level/all`,
            GET_CALENDAR: (calendarId) => {
                return `${base}/calendar/find?calendar_id=${calendarId}`
            },
            ACTIVATE_CALENDAR: `${base}/calendar/activate`,
        }
    },
    REQUEST: {
        REQUEST_LIST: {
            MAIN: {
                PATH: `/requestList`,
                LINK: `${base}/#/requestList`
            },
            GET_ALL_CALENDAR_ITEM_WITH_STATUS: (levelId) => {
                return `${base}/calendar-item/find-with-status?level_id=${levelId}`
            }
        },
        REQUEST_ADD: {
            MAIN: {
                PATH: `/requestAdd/:calendarId/:semesterId/:actionId`,
                LINK: (calendarItem) => {
                    return `${base}/#/requestAdd/${calendarItem.calendar_id}/${calendarItem.semester_id}/${calendarItem.action.action_id}`
                }
            },
            GET_CALENDAR_ITEM: (calendarId, semesterId, actionId) => {
                return `${base}/calendar-item/find-one?calendar_id=${calendarId}&semester_id=${semesterId}&action_id=${actionId}`
            },
            GET_ALL_TEACHER: `${base}/person/find-teacher`,
            GET_ALL_POSITION: (actionId) => {
                return `${base}/position/find?action_id=${actionId}`
            },
            GET_ALL_ROOM: `${base}/room/all`,
            INSERT_USER_REQUEST: `${base}/user-request/insert`
        }
    },
    DATA: {
        DATA_REQUEST: {
            MAIN: {
                PATH: `/request`,
                LINK: `${base}/#/request`
            },
            GET_ALL_USER_REQUEST: `${base}/user-request/find-all`,
            GET_ALL_ACTION: `${base}/action/find-all?is_defense=0`,
            GET_ALL_PET_STATUS: `${base}/status/find?type_id=1`,
            GET_ALL_DOC_STATUS: `${base}/status/find?type_id=2`,
            GET_DETAIL: (calendarId, actionId, levelId, semesterId, studentId) => {
                return `${base}/user-request/detail?calendar_id=${calendarId}&action_id=${actionId}&level_id=${levelId}&semester_id=${semesterId}&student_id=${studentId}`
            }

        },
        DATA_DEFENSE: {
            MAIN: {
                PATH: `/defense`,
                LINK: `${base}/#/defense`
            },
            GET_ALL_DEFENSE: `${base}/defense/find-all`,
            GET_ALL_ACTION: `${base}/action/find-all?is_defense=1`,
            GET_ALL_DEFENSE_STATUS: `${base}/status/find?type_id=3`,
            GET_DETAIL: (calendarId, actionId, levelId, semesterId, defenseTypeId) => {
                return `${base}/defense/detail?calendar_id=${calendarId}&action_id=${actionId}&level_id=${levelId}&semester_id=${semesterId}&defense_type_id=${defenseTypeId}`
            }
        }
    }
}

export const TYPE = {
    MAIN: {
        SET_HEADER: 'SET_HEADER',
        SET_CONTAINER: 'SET_CONTAINER'
    },
    CALENDAR: {
        CALENDAR_LIST: {
            SET_ALL: 'SET_CALENDAR_LIST_ALL',
            SET_POST: 'SET_CALENDAR_LIST_POST',
            SET_BTN_ACTIVE: 'SET_CALENDAR_LIST_ACTIVE_BTN',
            RESET: 'RESET_CALENDAR_LIST'
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
            RESET: 'RESET_REQUEST_LIST',
        },
        REQUEST_ADD: {
            SET_CALENDAR_ITEM: 'SET_REQUEST_ADD_CALEDNAR_ITEM',
            SET_ALL_TEACHER: 'SET_REQUEST_ADD_ALL_TEACHER',
            SET_ALL_POSITION: 'SET_REQUEST_ADD_ALL_POSITION',
            SET_POST: 'SET_REQUEST_ADD_POST',
            SET_ALL_ROOM: 'SET_REQUEST_ADD_ALL_ROOM',
            RESET: 'RESET_REQUEST_ADD',
        }
    },
    DATA: {
        DATA_REQUEST: {
            SET_ALL_USER_REQUEST: 'SET_DATA_REQUEST_ALL_USER_REQUEST',
            SET_ALL_ACTION: 'SET_DATA_REQUEST_ALL_ACTION',
            UPDATE_USER_REQUEST: 'UPDATE_DATA_REQUEST_USER_REQUEST',
            RESET: 'RESET_DATA_REQUEST',
            SET_ALL_PET_STATUS: 'SET_DATA_REQUEST_ALL_PET_STATUS',
            SET_ALL_DOC_STATUS: 'SET_DATA_REQUEST_ALL_DOC_STATUS',
        },
        DATA_DEFENSE: {
            SET_ALL_DEFENSE: 'SET_DATA_DEFENSE_ALL_DEFENSE',
            SET_ALL_ACTION: 'SET_DATA_DEFENSE_ALL_ACTION',
            UPDATE_DEFENSE: 'UPDATE_DATA_DEFENSE_DEFENSE',
            RESET: 'RESET_CALENDAR',
            SET_ALL_DEFENSE_STATUS: 'SET_DATA_DEFENSE_ALL_DEFENSE_STATUS',
        }
    }
}