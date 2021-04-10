import {
    TOKEN,
    ADD_FORM_SHOW_NOTE,
    ADD_FORM_HIDE_NOTE,
    PARAM_FORM_SHOW_NOTE,
    PARAM_FORM_HIDE_NOTE,
    EDIT_FORM_SHOW_NOTE,
    EDIT_FORM_HIDE_NOTE, IMPORTANT_ONLY
} from './actions'

const noteReducer = (state, action) => {
    let tempState = {...state}

    switch (action.type) {
        case TOKEN:
            tempState.token = !tempState.token;
            break;
        case ADD_FORM_SHOW_NOTE:
            tempState.addNote = '';
            tempState.actionVisible = 'hide';
            tempState.notesVisible = 'hide';
            break;
        case ADD_FORM_HIDE_NOTE:
            tempState.addNote = 'hide';
            tempState.actionVisible = '';
            tempState.notesVisible = '';
            break;
        case PARAM_FORM_SHOW_NOTE:
            tempState.filter = '';
            tempState.actionVisible = 'hide';
            break;
        case PARAM_FORM_HIDE_NOTE:
            tempState.filter = 'hide';
            tempState.actionVisible = '';
            break;
        case EDIT_FORM_SHOW_NOTE:
            tempState.editNote = '';
            tempState.actionVisible = 'hide';
            tempState.notesVisible = 'hide';
            tempState.editNoteData = action.note;
            break;
        case EDIT_FORM_HIDE_NOTE:
            tempState.editNote = 'hide';
            tempState.actionVisible = '';
            tempState.notesVisible = '';
            break;
        case IMPORTANT_ONLY:
            tempState.importantOnly = action.value;
            break;
        default:
            return tempState;
    }

    return tempState;

}

export default noteReducer;

