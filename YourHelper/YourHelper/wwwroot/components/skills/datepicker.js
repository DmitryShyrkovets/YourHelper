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
                for (let i = 0; i < state.skills.dates.length; i++){
                    if (check === state.skills.dates[i].date.substr(0, 10)) {
                        return {classes: 'highlight', tooltip: 'Title'};
                    }
                }
            }
        }).on('changeDate', function(e){
            dispatch({type: 'UPDATE_SKILLS_DATE', newDate: e.target.value});
        });

    }, [state.skills.dates]);
    
    return (
        <div>
            <div className="datepicker-area">
                <input className="datepicker" value={state.skills.date} readOnly data-provide="datepicker"/>
            </div>
        </div>
    );
}