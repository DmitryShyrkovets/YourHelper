const TOKEN = 'TOKEN';
const ADD_FORM_SHOW = 'ADD_FORM_SHOW';
const ADD_FORM_HIDE = 'ADD_FORM_HIDE';
const PARAM_FORM_SHOW = 'PARAM_FORM_SHOW';
const PARAM_FORM_HIDE = 'PARAM_FORM_HIDE';
const EDIT_FORM_SHOW = 'EDIT_FORM_SHOW';
const EDIT_FORM_HIDE = 'EDIT_FORM_HIDE';
const IMPORTANT_ONLY = 'IMPORTANT_ONLY';

const noteReducer = (state, action) => {
    let tempState = {...state}

    switch (action.type) {
        case TOKEN:
            tempState.token = !tempState.token;
            break;
        case ADD_FORM_SHOW:
            tempState.addNote = '';
            tempState.actionVisible = 'hide';
            tempState.notesVisible = 'hide';
            break;
        case ADD_FORM_HIDE:
            tempState.addNote = 'hide';
            tempState.actionVisible = '';
            tempState.notesVisible = '';
            break;
        case PARAM_FORM_SHOW:
            tempState.filter = '';
            tempState.actionVisible = 'hide';
            break;
        case PARAM_FORM_HIDE:
            tempState.filter = 'hide';
            tempState.actionVisible = '';
            break;
        case EDIT_FORM_SHOW:
            tempState.editNote = '';
            tempState.actionVisible = 'hide';
            tempState.notesVisible = 'hide';
            tempState.editNoteData = action.note;
            break;
        case EDIT_FORM_HIDE:
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

