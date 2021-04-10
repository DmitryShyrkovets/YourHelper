import {
    TOKEN,
    ADD_FORM_SHOW_TARGET,
    ADD_FORM_HIDE_TARGET,
    PARAM_FORM_SHOW_TARGET,
    PARAM_FORM_HIDE_TARGET,
    EDIT_FORM_SHOW_TARGET,
    EDIT_FORM_HIDE_TARGET, ADD_FORM_SHOW_NOTE, ADD_FORM_HIDE_NOTE, EDIT_FORM_SHOW_NOTE, EDIT_FORM_HIDE_NOTE
} from './actions'

const targetReducer = (state, action) => {
    let tempState = {...state}

    switch (action.type) {
        case TOKEN:
            tempState.token = !tempState.token;
            break;
        case ADD_FORM_SHOW_TARGET:
            tempState.addTarget = '';
            tempState.actionVisible = 'hide';
            tempState.targetsVisible = 'hide';
            break;
        case ADD_FORM_HIDE_TARGET:
            tempState.addTarget = 'hide';
            tempState.actionVisible = '';
            tempState.targetsVisible = '';
            break;
        case PARAM_FORM_SHOW_TARGET:
            tempState.filter = '';
            tempState.actionVisible = 'hide';
            break;
        case PARAM_FORM_HIDE_TARGET:
            tempState.filter = 'hide';
            tempState.actionVisible = '';
            break;
        case EDIT_FORM_SHOW_TARGET:
            tempState.editTarget = '';
            tempState.actionVisible = 'hide';
            tempState.targetsVisible = 'hide';
            tempState.editTargetData = action.target;
            tempState.editTargetTimeStart = action.timeStart;
            tempState.editTargetTimeEnd = action.timeEnd;
            break;
        case EDIT_FORM_HIDE_TARGET:
            tempState.editTarget = 'hide';
            tempState.actionVisible = '';
            tempState.targetsVisible = '';
            break;
        default:
            return tempState;
    }

    return tempState;

}

export default targetReducer;

