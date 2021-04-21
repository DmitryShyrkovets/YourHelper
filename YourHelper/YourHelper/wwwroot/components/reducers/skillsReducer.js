import {
    ADD_FORM_HIDE_SKILL,
    ADD_FORM_SHOW_SKILL,
    EDIT_FORM_HIDE_SKILL,
    EDIT_FORM_SHOW_SKILL,
    PARAM_FORM_HIDE_SKILL,
    PARAM_FORM_SHOW_SKILL,
    TOKEN,
    UPDATE_SKILLS_DATE,
    UPDATE_SKILLS_DATES
} from "./actions";


const skillsReducer = (state, action) => {
    let tempState = {...state}
    
    switch (action.type) {
        case TOKEN:
            tempState.token = !tempState.token;
            break;
        case UPDATE_SKILLS_DATES:
            debugger;
            tempState.dates = action.newDates;
            break;
        case UPDATE_SKILLS_DATE:
            tempState.date = action.newDate;
            break;
        case ADD_FORM_SHOW_SKILL:
            tempState.addSkill = '';
            tempState.actionVisible = 'hide';
            tempState.skillsVisible = 'hide';
            break;
        case ADD_FORM_HIDE_SKILL:
            tempState.addSkill = 'hide';
            tempState.actionVisible = '';
            tempState.skillsVisible = '';
            break;
        case EDIT_FORM_SHOW_SKILL:
            tempState.editSkill = '';
            tempState.actionVisible = 'hide';
            tempState.skillsVisible = 'hide';
            tempState.editSkillData = action.skill;
            break;
        case EDIT_FORM_HIDE_SKILL:
            tempState.editSkill = 'hide';
            tempState.actionVisible = '';
            tempState.skillsVisible = '';
            break;
        case PARAM_FORM_SHOW_SKILL:
            tempState.filter = '';
            tempState.actionVisible = 'hide';
            break;
        case PARAM_FORM_HIDE_SKILL:
            tempState.filter = 'hide';
            tempState.actionVisible = '';
            break;
        default:
            return tempState;
    }
    
    return tempState;
        
}

export default skillsReducer;

