var options = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    timezone: 'UTC'
};

import React, { useState, useEffect, useContext } from 'react';
import {DateCalendar, Dates} from '../storeges/store';

export function DatePicker(props) {

    const [date, setDate] = useContext(DateCalendar);
    const [dates, setDates] = useContext(Dates);

    useEffect(() => {

        $('.datepicker').datepicker('destroy');

        $('.datepicker').datepicker({
            isRTL: false,
            format: 'dd.mm.yyyy',
            autoclose:true,
            language: 'ru',
            beforeShowDay: function(date) {
                let check = new Date(date).toLocaleString("ru", options);
                for (let i = 0; i < dates.length; i++){
                    if (check === dates[i].dateTime.substr(0, 10)) {
                        return {classes: 'highlight', tooltip: 'Title'};
                    }
                }
            }
        }).on('changeDate', function(e){
            setDate(e.target.value);
        });

    }, [dates]);
    
    return (
        <div>
            <div className="datepicker-area">
                <input className="datepicker" value={date} readOnly data-provide="datepicker"/>
            </div>
        </div>
    );
}