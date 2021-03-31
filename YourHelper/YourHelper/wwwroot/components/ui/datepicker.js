var options = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    timezone: 'UTC'
};

import React, { useState, useEffect, useContext } from 'react';
import {ReducerContext} from '../store';

export function DatePicker(props) {

    const { state, dispatch } = useContext(ReducerContext);

    useEffect(() => {

        $('.datepicker').datepicker('destroy');

        $('.datepicker').datepicker({
            isRTL: false,
            format: 'dd.mm.yyyy',
            autoclose:true,
            language: 'ru',
            beforeShowDay: function(date) {
                let check = new Date(date).toLocaleString("ru", options);
                for (let i = 0; i < state.diary.dates.length; i++){
                    if (check === state.diary.dates[i].dateTime.substr(0, 10)) {
                        return {classes: 'highlight', tooltip: 'Title'};
                    }
                }
            }
        }).on('changeDate', function(e){
            dispatch({type: 'UPDATE_DIARY_DATE', newDate: e.target.value});
        });

    }, [state.diary.dates]);
    
    return (
        <div>
            <div className="datepicker-area">
                <input className="datepicker" value={state.diary.date} readOnly data-provide="datepicker"/>
            </div>
        </div>
    );
}