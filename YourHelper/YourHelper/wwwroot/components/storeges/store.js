var options = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    timezone: 'UTC'
};

import React, {useState} from 'react';
import NoteStore from './note';

export const NotificationContext = React.createContext('');
export const NotificationMessageContext = React.createContext('');

export const DateCalendar = React.createContext('');
export const Dates = React.createContext([]);

const Store = ({children}) => {

    const [notificationMessage, setNotificationMessage] = useState('');
    const [notification, setNotification] = useState('');
    const [date, setDate] = useState((new Date()).toLocaleString("ru", options));
    const [dates, setDates] = useState([]);

    
    return(
        <NotificationContext.Provider value={[notification, setNotification]}>
            <NotificationMessageContext.Provider value={[notificationMessage, setNotificationMessage]}>
                <DateCalendar.Provider value={[date, setDate]}>
                    <Dates.Provider value={[dates, setDates]}>
                        <NoteStore>
                            {children}
                        </NoteStore>
                    </Dates.Provider>
                </DateCalendar.Provider>
            </NotificationMessageContext.Provider>
        </NotificationContext.Provider>
    );
    
}

export default Store;
