import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import {ReducerContext} from '../store';
import {Dropdown} from "../ui/dropdown";
import {Validation} from "../validation/validation";

export function EditTarget(props){

    const { state, dispatch } = useContext(ReducerContext);

    const [categories, setCategories] = useState([{id: '0', category: 'Выполнена'}, {id: '1', category: 'В процессе'}, {id: '2', category: 'Провалена'}]);
    const [select, setSelect] = useState('');
    const [ text, setText ] = useState('');
    const [ timeStart, setTimeStart ] = useState('');
    const [ timeEnd, setTimeEnd ] = useState('');
    const [ id, setId] = useState('');
    const [ message, setMessage] = useState('');

    useEffect(() => {
        setId(state.target.editTargetData.id);
        setText(state.target.editTargetData.text);
        setTimeStart(state.target.editTargetTimeStart)
        setTimeEnd(state.target.editTargetTimeEnd);
        setSelect(state.target.editTargetData.status);
    }, [state.target.editTargetData]);
    
    
    function onCancel(){
        setMessage('');
        setId(state.target.editTargetData.id);
        setText(state.target.editTargetData.text);
        setTimeStart(state.target.editTargetTimeStart)
        setTimeEnd(state.target.editTargetTimeEnd);
        setSelect(state.target.editTargetData.status);
        dispatch({type: 'EDIT_FORM_HIDE_TARGET'});
    }

    function CheckDateTime(){
        let Start = new Date(timeStart);
        let End = new Date(timeEnd);

        if (Date.parse(Start.toString()) >= Date.parse(End.toString())){
            return true;
        }

        return false;
    }

    function onConfirm(){

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
            url: '/Target/EditTarget',
            headers: { 'Content-Type': 'application/json' },
            data: {
                Id: id,
                Status: select,
                Text: text,
                TimeStart: dateStart,
                TimeEnd: dateEnd
            }

        })
            .then(function (response) {
                setText('');
                setTimeStart('');
                setTimeEnd('');
                setSelect('');
                setMessage('');

                dispatch({type: 'EDIT_FORM_HIDE_TARGET'});
                dispatch({type: 'TOKEN'});
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    function onChangeSelect(value){
        setSelect(value);
    }
    
    return(<div className={"edit-target " + state.target.editTarget}>
        <h3>Редактирование цели</h3>
        <div className={'title'}>
            <input type="text" placeholder={'Название'} value={text} onChange={e => setText(e.target.value)}/>
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
        <Dropdown categories={categories} select={select} onChangeSelect={onChangeSelect}/>
        <Validation message={message}/>
        <div className="edit-buttons">
            <div className="confirm button" onClick={() => onConfirm()}>
                <p>Подтвердить</p>
            </div>
            <div className="cancel button" onClick={() => onCancel()} >
                <p>Отмена</p>
            </div>
        </div>
    </div>);
}