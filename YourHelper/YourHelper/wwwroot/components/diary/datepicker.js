var options = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    timezone: 'UTC'
};

import React, { useState, useEffect } from 'react';

export function DatePicker(props) {
    const [date, setDate] = useState(props.date);

    useEffect(() => {
        
        setDate(props.date);

        $('.datepicker').datepicker('destroy');

        $('.datepicker').datepicker({
            isRTL: false,
            format: 'dd.mm.yyyy',
            autoclose:true,
            language: 'ru',
            beforeShowDay: function(date) {
                let check = new Date(date).toLocaleString("ru", options);
                for (let i = 0; i < props.dates.length; i++){
                    if (check === props.dates[i].dateTime.substr(0, 10)) {
                        // console.log(test[i].dateTime)
                        return {classes: 'highlight', tooltip: 'Title'};
                    }
                }
            }
        }).on('changeDate', function(e){
            props.changeDate(e.target.value);
        });

    }, [props.dates]);
    
    return (
        <div>
            <div className="datepicker-area">
                <input className="datepicker" value={props.date} readOnly data-provide="datepicker"/>
            </div>
        </div>
    );
}