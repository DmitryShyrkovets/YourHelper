import {
    SHOW_EDIT_ACTIONS,
    HIDE_EDIT_ACTIONS, 
    TOKEN
} from './actions'

const scheduleReducer = (state, action) => {
    let tempState = {...state}

    switch (action.type) {
        case TOKEN:
            tempState.token = !tempState.token;
            break;
        case SHOW_EDIT_ACTIONS:
            tempState.editAction = '';
            tempState.addButton = 'hide';
            break;
        case HIDE_EDIT_ACTIONS:
            tempState.editAction = 'hide'
            tempState.addButton = '';
            break;
        default:
            return tempState;
    }

    return tempState;

}

export default scheduleReducer;

