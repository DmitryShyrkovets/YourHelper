import {
    ADD_FORM_HIDE_FINANCE,
    ADD_FORM_SHOW_FINANCE,
    ALL_DATES_FILTER_FINANCE,
    CHANGE_CATEGORY_FILTER_FINANCE,
    CHANGE_DATE_END_FILTER_FINANCE,
    CHANGE_DATE_START_FILTER_FINANCE,
    EDIT_FORM_HIDE_FINANCE,
    EDIT_FORM_HIDE_NOTE,
    EDIT_FORM_SHOW_FINANCE,
    EDIT_FORM_SHOW_NOTE,
    PARAM_FORM_HIDE_FINANCE,
    PARAM_FORM_SHOW_FINANCE,
    TOKEN
} from './actions'

const financeReducer = (state, action) => {
    let tempState = {...state}

    switch (action.type) {
        case TOKEN:
            tempState.token = !tempState.token;
            break;
        case ADD_FORM_SHOW_FINANCE:
            tempState.addFinance = '';
            tempState.actionVisible = 'hide';
            tempState.financesVisible = 'hide';
            break;
        case ADD_FORM_HIDE_FINANCE:
            tempState.addFinance = 'hide';
            tempState.actionVisible = '';
            tempState.financesVisible = '';
            break;
        case PARAM_FORM_SHOW_FINANCE:
            tempState.filter = '';
            tempState.actionVisible = 'hide';
            break;
        case PARAM_FORM_HIDE_FINANCE:
            tempState.filter = 'hide';
            tempState.actionVisible = '';
            break;
        case CHANGE_CATEGORY_FILTER_FINANCE:
            tempState.categorySelect = action.value;
            break;
        case CHANGE_DATE_START_FILTER_FINANCE:
            tempState.dateStart = action.value;
            break;
        case CHANGE_DATE_END_FILTER_FINANCE:
            tempState.dateEnd = action.value;
            break;
        case EDIT_FORM_SHOW_FINANCE:
            tempState.editFinance = '';
            tempState.actionVisible = 'hide';
            tempState.financesVisible = 'hide';
            tempState.date = action.date;
            tempState.money = Number(action.money.replace(',', '.'));
            tempState.editFinanceData = action.finance;
            break;
        case EDIT_FORM_HIDE_FINANCE:
            tempState.editFinance = 'hide';
            tempState.actionVisible = '';
            tempState.financesVisible = '';
            break;
        case ALL_DATES_FILTER_FINANCE:
            tempState.allDates = action.value;
            if (action.value === false){
                tempState.filterDatesVisible = '';
            }
            else{
                tempState.filterDatesVisible = 'hide';
            }
            break;
        default:
            return tempState;
    }

    return tempState;

}

export default financeReducer;

