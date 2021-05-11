import {
    HIDE_EDIT_MOOD, HIDE_EDIT_WELL_BEING,
    SHOW_EDIT_MOOD, SHOW_EDIT_WELL_BEING,
    TOKEN,
    UPDATE_DIARY_DATE,
    UPDATE_DIARY_DATES
} from "./actions";


const diaryReducer = (state, action) => {
    let tempState = {...state}
    
    switch (action.type) {
        case UPDATE_DIARY_DATES:
            debugger;
            tempState.dates = action.newDates;
            break;
        case UPDATE_DIARY_DATE:
            tempState.date = action.newDate;
            break;
        case TOKEN:
            tempState.token = !tempState.token;
            break;
        case SHOW_EDIT_MOOD:
            tempState.editMood = '';
            tempState.mood = 'hide';
            break;
        case HIDE_EDIT_MOOD:
            tempState.editMood = 'hide';
            tempState.mood = '';
            break;
        case SHOW_EDIT_WELL_BEING:
            tempState.editWellBeing = '';
            tempState.wellBeing = 'hide';
            break;
        case HIDE_EDIT_WELL_BEING:
            tempState.editWellBeing = 'hide';
            tempState.wellBeing = '';
            break;
        default:
            return tempState;
    }
    
    return tempState;
        
}

export default diaryReducer;

