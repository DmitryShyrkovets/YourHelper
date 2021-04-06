import React, { useState, useEffect, useContext } from 'react';
import {ReducerContext} from '../store';

export function ScheduleInfo(props){

    const { state, dispatch } = useContext(ReducerContext);

    const [actionsVisible, setActionsVisible] = useState('hide');
    const [info, setInfo] = useState(props.info);

    useEffect(() => {
        setInfo(props.info);

    }, [props.info])
    
    return(
        <div className={'schedule-info-content'}>
            {
                info.length < 1 ?
                <p>Незапланированного времени нету</p>
                    :
                <p>Незапланированное время</p>
            }
            <div className={'time-info'}>
                {info.map((info) =>
                    <p key={info.id}>{info.timeStart.substr(10, 6) + ' - ' + info.timeEnd.substr(10, 6)}</p>)
                }
            </div>
        </div>
    );
}

