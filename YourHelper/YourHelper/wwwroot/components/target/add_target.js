import React, { useState, useEffect, useContext } from 'react';
import {ReducerContext} from '../store';
import axios from 'axios';
import {Validation} from "../validation/validation";

export function AddTarget(props){

    const { state, dispatch } = useContext(ReducerContext);
    
    const [ text, setText ] = useState('');
    const [ timeStart, setTimeStart ] = useState('');
    const [ timeEnd, setTimeEnd ] = useState('');
    const [ message, setMessage] = useState('');
    
    function onCancel(){
        setText('');
        setTimeStart('');
        setTimeEnd('');
        setMessage('');
        dispatch({type: 'ADD_FORM_HIDE_TARGET'});
    }

    function CheckDateTime(){
        let Start = new Date(timeStart);
        let End = new Date(timeEnd);

        if (Date.parse(Start.toString()) >= Date.parse(End.toString())){
            return true;
        }

        return false;
    }

    function onAdd(){

        if (text === '' || timeStart === '' || timeEnd === ''){
            setMessage('Поля не должны быть пустыми');
            return;
        }
        
        let dateStart = timeStart.slice(8, 10) + '.' + timeStart.slice(5, 7) + '.' + timeStart.slice(0, 4) + ' ' + timeStart.slice(11, 16) + ':00';
        let dateEnd = timeEnd.slice(8, 10) + '.' + timeEnd.slice(5, 7) + '.' + timeEnd.slice(0, 4) + ' ' + timeEnd.slice(11, 16) + ':00';
        
        if (CheckDateTime()){
            setMessage('Ошибка в постановке дат и времени');
            return;
        }
        
        axios({
            method: 'post',
            url: '/Target/AddTarget',
            headers: { 'Content-Type': 'application/json' },
            data: {
                Status: 'В процессе',
                Text: text,
                TimeStart: dateStart,
                TimeEnd: dateEnd
            }

        })
            .then(function (response) {
                setText('');
                setTimeStart('');
                setTimeEnd('');
                setMessage('');

                dispatch({type: 'ADD_FORM_HIDE_TARGET'});
                dispatch({type: 'TOKEN'});
            })
            .catch(function (error) {
                console.log(error);
            });
        
    }
    
    return(<div className={"add-target " + state.target.addTarget}>
        <h3>Новая цель</h3>
        <div className={'title'}>
            <input type="text" autoComplete="off" placeholder='Название' value={text} onChange={e => setText(e.target.value)}/>
        </div>
        <div>
            <div className={'date'}>
                <p>Начало</p>
                <input type="datetime-local" value={timeStart} onChange={e => setTimeStart(e.target.value)}/>
            </div>
            <div className={'date'}>
                <p>Конец</p>
                <input type="datetime-local" value={timeEnd} onChange={e => setTimeEnd(e.target.value)}/>
            </div>
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