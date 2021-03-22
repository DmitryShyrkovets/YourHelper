import React, { useContext } from 'react';
import {NotificationContext, NotificationMessageContext} from "../storeges/store";

export function Notification(props) {
    const [notificationMessage, setNotificationMessage] = useContext(NotificationMessageContext);
    const [notification, setNotification] = useContext(NotificationContext);
    
    function Hide(){
        setNotificationMessage('');
        setNotification('');
    }

    return (
        <div className={"notification " + notification}>
            <div className="notification_content">
                <div className="header">
                    <h2>Уведомление</h2>
                    <div className="close" onClick={Hide}>
                        <h4>&#10006;</h4>
                    </div>
                </div>
                <h3 className="body">{notificationMessage}</h3>
            </div> 
        </div>
    );
}