import {
    ADD_FORM_HIDE_SCHEDULE,
    ADD_FORM_SHOW_SCHEDULE, CHANGE_TIME_END_SCHEDULE, CHANGE_TIME_START_SCHEDULE,
    EDIT_FORM_HIDE_SCHEDULE,
    EDIT_FORM_SHOW_SCHEDULE,
    TOKEN,
    UPDATE_SCHEDULE_DATE, 
    UPDATE_SCHEDULE_DATES
} from './actions'

const scheduleReducer = (state, action) => {
    let tempState = {...state}

    switch (action.type) {
        case TOKEN:
            tempState.token = !tempState.token;
            break;
        case ADD_FORM_SHOW_SCHEDULE:
            tempState.addSchedule = '';
            tempState.contentVisible = 'hide';
            tempState.timeStart = action.timeStart;
            tempState.timeEnd = action.timeEnd;
            break;
        case ADD_FORM_HIDE_SCHEDULE:
            tempState.addSchedule = 'hide';
            tempState.contentVisible = '';
            break;
        case CHANGE_TIME_START_SCHEDULE:
            tempState.timeStart = action.timeStart;
            break;
        case CHANGE_TIME_END_SCHEDULE:
            tempState.timeEnd = action.timeEnd;
            break;
        case EDIT_FORM_SHOW_SCHEDULE:
            tempState.editSchedule = '';
            tempState.contentVisible = 'hide';
            tempState.timeStart = action.timeStart;
            tempState.timeEnd = action.timeEnd;
            tempState.editScheduleData = action.schedule;
            break;
        case EDIT_FORM_HIDE_SCHEDULE:
            tempState.editSchedule = 'hide';
            tempState.contentVisible = '';
            break;
        case UPDATE_SCHEDULE_DATE:
            tempState.date = action.newDate;
            break;
        case UPDATE_SCHEDULE_DATES:
            debugger;
            tempState.dates = action.newDates;
            break;
        default:
            return tempState;
    }

    return tempState;

}

export default scheduleReducer;

