var options = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    timezone: 'UTC'
};

import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import {Menu} from "../header/menu";
import {Sheet} from "./sheet";
import {DatePicker} from '../ui/datepicker';
import {ReducerContext} from '../store';

export function Diary(props){
    
    const [text, setText] = useState('');
    const [diary, setDiary] = useState([]);
    const [check, setCheck] = useState(true);
    const [edit, setEdit] = useState(false);
    const [editId, setEditId] = useState('');
    const [hide, setHide] = useState('hide');
    const [hideEdit, setHideEdit] = useState('hide');
    const [loading, setLoading] = useState(true);

    /*const [date, setDate] = useContext(DateCalendar);
    const [dates, setDates] = useContext(Dates);*/
    
    const { state, dispatch } = useContext(ReducerContext);
    //const [date, setDate] = useContext(initialState.diary.date);
    
    
    useEffect(() => {
        LoadEntries();

    }, [state.diary.date, check]);
    
    function onTextChange(value){
        setText(value);
    }
    
    function onRemove(entry){
        axios({
            method: 'post',
            url: '/Diary/RemoveEntry',
            headers: { 'Content-Type': 'application/json' },
            data: {
                Id: entry.id
            }
        })
            .then(function (response) {
                setCheck(!check);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    function onEdit(entry){
       setText(entry.text);
       setEdit(true);
       setEditId(entry.id);
       setHideEdit('');
    }
    
    function LoadEntries(){
        axios({
            method: 'post',
            url: '/Diary/GetEntries',
            headers: { 'Content-Type': 'application/json' },
            data: {
                DateTime: state.diary.date
            }
        })
            .then(function (response) {
                setDiary(response.data);
                LoadDates();
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    function LoadDates(){
        axios({
            method: 'get',
            url: '/Diary/GetDates',
            headers: { 'Content-Type': 'application/json' },
        })
            .then(function (response) {
                dispatch({type: 'UPDATE_DIARY_DATES', newDates: response.data});
                setLoading(false);
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    
    function onCancel(){
        setText('');
        setEdit(false);
        setEditId('');
        setHideEdit('hide');
    }

    function onClose(){
        setHide('hide');
    }
    
    async function onSend(){
        if(text === ""){
            return;
        }

        let dateTime = state.diary.date + ' ' + new Date().getHours() + ':' + new Date().getMinutes();
        
        if (edit === true){
            axios({
                method: 'post',
                url: '/Diary/EditEntry',
                headers: { 'Content-Type': 'application/json' },
                data: {
                    Id: editId,
                    text: text
                }
            })
                .then(function (response) {
                    onCancel();
                    setDiary([]);
                    LoadEntries();
                })
                .catch(function (error) {
                    console.log(error.response.data);
                });
        }
        else{
            if((new Date()).toLocaleString("ru", options) !== state.diary.date){
                setHide('')
                return;
            }
            else {
                setHide('hide')
            }

            axios({
                method: 'post',
                url: '/Diary/AddEntry',
                headers: { 'Content-Type': 'application/json' },
                data: {
                    Text: text,
                    DateTime: dateTime
                }
            })
                .then(function (response) {
                    setText('');
                    LoadEntries();
                })
                .catch(function (error) {
                    console.log(error.response.data);
                });
        }
        
    }

    const content = loading ? (<h2 className="loading">Подождите идёт загрузка...</h2>) : (
        <div className="diary content container">
            <DatePicker/>
            <Sheet diary={diary} onRemove={onRemove} onEdit={onEdit}/>
            <div className={"info " + hide}>
                <p>Добавлять новые записи можно только на {(new Date()).toLocaleString("ru", options)}</p>
                <p className="cancel" onClick={onClose}>закрыть</p>
            </div>
            <div className={"edit-info " + hideEdit}>
                <p>Редактирование записи</p>
                <p className="cancel" onClick={onCancel}>Отмена</p>
            </div>
            <div className="diary-add-area">
                <textarea placeholder="Напишите сюда свои мысли... " value={text} onChange={text => onTextChange(text.target.value)} className="text"></textarea>
                <div className="send-button" onClick={onSend}>
                    <div className="send-icon"></div>
                </div>
            </div>
        </div>);
    
        return (
            <div>
                <div id="head-menu">
                    <Menu />
                </div>
                {content}
            </div>
        );
}