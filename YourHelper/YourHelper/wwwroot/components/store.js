import React, {useState, useReducer } from 'react';
import notifacationsReducer from "./reducers/notifacationsReducer";
import diaryReducer from "./reducers/diaryReducer";
import noteReducer from "./reducers/noteReducer";
import scheduleReducer from "./reducers/scheduleReducer";
import targetReducer from "./reducers/targetReducer";
import financeReducer from "./reducers/financeReduce";
import skillsReducer from "./reducers/skillsReducer";

var options = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    timezone: 'UTC'
};

let date = new Date().toLocaleString("ru", options);

export const ReducerContext = React.createContext();

const Store = ({children}) => {

    const initialState = {
        diary: {
            date: new Date().toLocaleString("ru", options),
            dates: []
        },
        notifications: {
            notificationMessage: '',
            notification: ''
        },
        note: {
            addNote: 'hide',
            editNote: 'hide',
            editNoteData: {},
            filter: 'hide',
            notesVisible: '',
            actionVisible: '',
            filterSelect: 'Все',
            importantOnly: false,
            token: false
        },
        schedule:{
          editAction: 'hide',
          addButton: '', 
          token: false  
        },
        target:{
            addTarget: 'hide',
            editTarget: 'hide',
            editTargetData: {},
            editTargetTimeStart: '',
            editTargetTimeEnd: '',
            filter: 'hide',
            targetsVisible: '',
            actionVisible: '',
            filterSelect: 'Все',
            token: false
        },
        finance:{
            addFinance: 'hide',
            editFinance: 'hide',
            financesVisible: '',
            actionVisible: '',
            filter: 'hide',
            categorySelect: 'Все',
            dateStart: date.slice(6, 10) + '-' + date.slice(3, 5) + '-' + date.slice(0, 2),
            dateEnd: date.slice(6, 10) + '-' + date.slice(3, 5) + '-' + date.slice(0, 2),
            date: '',
            money: 0,
            allDates: true,
            filterDatesVisible: 'hide',
            editFinanceData: {},
            token: false
        },
        skills:{
            skillsVisible: '',
            actionVisible: '',
            filter: 'hide',
            addSkill: 'hide',
            editSkill: 'hide',
            editSkillData: {},
            token: false,
            date: new Date().toLocaleString("ru", options),
            dates: []
        }
    };

    const reducer = (state, action) => {
        let tempState = {...state}
        
        tempState.diary = diaryReducer(tempState.diary, action);
        tempState.notifications = notifacationsReducer(tempState.notifications, action);
        tempState.note = noteReducer(tempState.note, action);
        tempState.schedule = scheduleReducer(tempState.schedule, action);
        tempState.target = targetReducer(tempState.target, action);
        tempState.finance = financeReducer(tempState.finance, action);
        tempState.skills = skillsReducer(tempState.skills, action);
        
        return tempState;
    }

    const [state, dispatch] = useReducer(reducer, initialState);
    const value = { state, dispatch };
    
    return(
        <ReducerContext.Provider value={value}>
            {children}
        </ReducerContext.Provider>
    );

}

export default Store;
