import React, { useState, useEffect, useContext } from 'react';
import axios from "axios";
import {ReducerContext} from "../store";

export function ScheduleInfo(props){

    const { state, dispatch } = useContext(ReducerContext);
    
    const [info, setInfo] = useState(props.info);

    useEffect(() => {
        setInfo(props.info);

    }, [props.info])
    
    const AddSchedule = (start, end) => {
        dispatch({type: 'ADD_FORM_SHOW_SCHEDULE', timeStart: start, timeEnd: end});
    }
    
    return(
        <div className={'schedule-info-content'}>
            <div className='times'>
                <h3>Незапланированное время:</h3>
                <div className={'time-info'}>
                    {
                        info.length < 1 && <h4>Всё время распределено</h4>
                    }
                    {info.map((info) =>
                        <p key={info.id} onClick={() => AddSchedule(info.timeStart.substr(11, 5), info.timeEnd.substr(11, 5))}>
                            {info.timeStart.substr(10, 6) + ' - ' + info.timeEnd.substr(10, 6)}
                        </p>)
                    }
                </div>
            </div>
            <div className='text'>
                <p>Для добавления записи в распорядок нажмите на период</p>
            </div>
        </div>
    );
}

