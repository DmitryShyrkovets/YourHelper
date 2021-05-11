import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import {ReducerContext} from '../store';
import {Validation} from "../validation/validation";

export function AddSchedule(props){

    const { state, dispatch } = useContext(ReducerContext);

    const [timeStart, setTimeStart] = useState('');
    const [timeEnd, setTimeEnd] = useState('');
    const [text, setText] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        setTimeStart(state.schedule.timeStart);
        setTimeEnd(state.schedule.timeEnd);

    }, [state.schedule.timeStart, state.schedule.timeEnd])

    function filter(){

        if (CheckTime()){
            setMessage('Время начала должно быть меньше времени конца');
            return true;
        }

        if (text === '' || text === ' '){
            setMessage('Поле для ввода не должно быть пустым');
            return true;
        }

        return false;
    }

    function cleaning(){
        setTimeStart(state.schedule.timeStart);
        setTimeEnd(state.schedule.timeEnd);
        setText('');
        setMessage('');
    }

    function CheckTime(){
        let Start = new Date();
        Start.setHours(Number(timeStart.slice(0, 2)), Number(timeStart.slice(3, 5)));
        let End = new Date();
        End.setHours(Number(timeEnd.slice(0, 2)), Number(timeEnd.slice(3, 5)));

        if (Date.parse(Start.toString()) >= Date.parse(End.toString())){
            return true;
        }

        return false;
    }

    function onAdd(){
        
        if (filter()){
            return;
        }
        
        axios({
            method: 'post',
            url: '/Schedule/AddSchedule',
            headers: { 'Content-Type': 'application/json' },
            data: {
                Text: text,
                TimeStart: timeStart,
                TimeEnd: timeEnd,
                Date: state.schedule.date
            }

        })
            .then(function (response) {
                if (response.data.type === "ok"){
                    cleaning();
                    dispatch({type: 'ADD_FORM_HIDE_SCHEDULE'});
                    dispatch({type: 'TOKEN'});
                }
                else{
                    setMessage(response.data.error);
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    function onCancel(){
        cleaning();
        dispatch({type: 'ADD_FORM_HIDE_SCHEDULE'});
    }
    

    return(<div className={"add-schedule " + state.schedule.addSchedule}>
        <h2>Добавить запись</h2>
        <div className="time-add-field">
            <p>Время начала</p>
            <input type="time" value={timeStart} onChange={e => setTimeStart(e.target.value)}/>
        </div>
        <div className="time-add-field">
            <p>Время конца</p>
            <input type="time" value={timeEnd} onChange={e => setTimeEnd(e.target.value)}/>
        </div>
        <div className="add-field">
            <input type="text" autoComplete="off" placeholder="Название" value={text} onChange={e => setText(e.target.value)}/>
        </div>
        <Validation message={message}/>
        <div className="add-buttons">
            <div className="add button" onClick={() => onAdd()}>
                <p>Добавить</p>
            </div>
            <div className="cancel button" onClick={() => onCancel()} >
                <p>Отмена</p>
            </div>
        </div>
    </div>);
}