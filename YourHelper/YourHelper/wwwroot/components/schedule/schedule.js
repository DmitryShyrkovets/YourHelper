import React, { useState, useEffect, useContext } from 'react';
import {ReducerContext} from '../store';
import axios from 'axios';


export function Schedule(props){
    
    const [actionsVisible, setActionsVisible] = useState('hide');
    const [schedule, setSchedule] = useState(props.schedule);

    const { state, dispatch } = useContext(ReducerContext);
    
    useEffect(() => {
        setSchedule(props.schedule);

    }, [props.schedule])

    function onEdit(){
        props.onEdit(schedule);
        dispatch({type: 'SHOW_EDIT_ACTIONS'});
    }

    function onRemove(){
        axios({
            method: 'post',
            url: '/Schedule/RemoveSchedule',
            headers: { 'Content-Type': 'application/json' },
            data: {
                Id: schedule.id
            }

        })
            .then(function (response) {
                dispatch({type: 'TOKEN'});
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    return(
        <div className={'schedule-content'} onMouseEnter={() => setActionsVisible('')} onMouseLeave={() => setActionsVisible('hide')}>
            <div className={'schedule-header'}>
                <p>{schedule.timeStart.substr(10, 6) + ' - ' + schedule.timeEnd.substr(10, 6)}</p>
                <div className={"actions " + actionsVisible}>
                    <div className="edit-button" onClick={() => onEdit()}>
                        <div className="edit-icon">

                        </div>
                    </div>
                    <div className="remove-button" onClick={() => onRemove()}>
                        <div className="remove-icon">

                        </div>
                    </div>
                </div>
            </div>
            <p>{schedule.text}</p>
            <hr/>
        </div>
    );
}

