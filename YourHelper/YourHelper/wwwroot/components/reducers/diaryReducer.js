import {
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
        default:
            return tempState;
    }
    
    return tempState;
        
}

export default diaryReducer;

