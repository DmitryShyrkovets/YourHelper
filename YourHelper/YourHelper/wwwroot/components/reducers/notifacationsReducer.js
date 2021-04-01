import {
    HIDE_NOTIFICATION, 
    SHOW_NOTIFICATION
} from "./actions";


const notificationsReducer = (state, action) => {
    let tempState = {...state}

    switch (action.type) {
        case SHOW_NOTIFICATION:
            debugger;
            tempState.notificationMessage = action.message;
            tempState.notification = 'active';
            break;
        case HIDE_NOTIFICATION:
            tempState.notificationMessage = '';
            tempState.notification = '';
            break;
        default:
            return tempState;
    }

    return tempState;

}

export default notificationsReducer;

