import React, { useState, useEffect, useContext } from 'react';
import {ReducerContext} from '../store';
import axios from 'axios';
import {Validation} from "../validation/validation";

export function AddTarget(props){

    const { state, dispatch } = useContext(ReducerContext);
    
    const [ text, setText ] = useState('');
    const [ description, setDescription ] = useState('');
    const [ timeStart, setTimeStart ] = useState('');
    const [ timeEnd, setTimeEnd ] = useState('');
    const [ message, setMessage] = useState('');

    function filter(){

        if (text === '' || text === ' ' || timeStart === '' || timeEnd === '' || description === '' || description === ' '){
            setMessage('Поля не должны быть пустыми');
            return true;
        }

        if (CheckDateTime()){
            setMessage('Ошибка в постановке дат и времени');
            return true;
        }

        return false;
    }

    function cleaning(){
        setText('');
        setTimeStart('');
        setTimeEnd('');
        setMessage('');
        setDescription('');
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
        
        let dateStart = timeStart.slice(8, 10) + '.' + timeStart.slice(5, 7) + '.' + timeStart.slice(0, 4) + ' ' + timeStart.slice(11, 16) + ':00';
        let dateEnd = timeEnd.slice(8, 10) + '.' + timeEnd.slice(5, 7) + '.' + timeEnd.slice(0, 4) + ' ' + timeEnd.slice(11, 16) + ':00';

        if(filter()){
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
                TimeEnd: dateEnd,
                Description: description
            }

        })
            .then(function (response) {
                cleaning();

                dispatch({type: 'ADD_FORM_HIDE_TARGET'});
                dispatch({type: 'TOKEN'});
            })
            .catch(function (error) {
                console.log(error);
            });
        
    }

    function onCancel(){
        cleaning();

        dispatch({type: 'ADD_FORM_HIDE_TARGET'});
    }

    function onDescriptionChange(value){
        value = value.replace(/\s+/g, ' ');

        setDescription(value);
    }
    

    function onTextChange(value){
        value = value.replace(/\s+/g, ' ');

        setText(value);
    }
    
    return(<div className={"add-target " + state.target.addTarget}>
        <h3>Новая цель</h3>
        <div className={'title'}>
            <input type="text" autoComplete="off" placeholder='Название' maxLength={16} value={text} onChange={e => onTextChange(e.target.value)}/>
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
        <div className="add-description">
            <textarea placeholder="Описание" value={description} onChange={e => onDescriptionChange(e.target.value)}/>
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