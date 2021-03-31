import React, { useContext } from 'react';
import {ReducerContext} from '../store';

export function Notification(props) {

    const { state, dispatch } = useContext(ReducerContext);
    
    function Hide(){
        dispatch({type: 'HIDE_NOTIFICATION'});
    }

    return (
        <div className={"notification " + state.notifications.notification}>
            <div className="notification_content">
                <div className="header">
                    <h2>Уведомление</h2>
                    <div className="close" onClick={Hide}>
                        <h4>&#10006;</h4>
                    </div>
                </div>
                <h3 className="body">{state.notifications.notificationMessage}</h3>
            </div> 
        </div>
    );
}