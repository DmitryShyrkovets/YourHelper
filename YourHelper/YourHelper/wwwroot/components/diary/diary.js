import WellBeing from "./well-being";

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
import {DatePicker} from './datepicker';
import {ReducerContext} from '../store';
import Mood from "./mood";
import EditMood from "./edit-mood";
import EditWellBeing from "./edit-well-being";

export function Diary(props){
    
    const [text, setText] = useState('');
    const [diary, setDiary] = useState([]);
    const [statusMood, setStatusMood] = useState('');
    const [statusWellBeing, setStatusWellBeing] = useState('');
    const [edit, setEdit] = useState(false);
    const [editId, setEditId] = useState('');
    const [hide, setHide] = useState('hide');
    const [hideEdit, setHideEdit] = useState('hide');
    const [loading, setLoading] = useState(true);
    
    const { state, dispatch } = useContext(ReducerContext);
    
    useEffect(() => {
        LoadEntries();

    }, [state.diary.date, state.diary.token]);
    
    function onTextChange(value){
        value = value.replace(/\s+/g, ' ');
        
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
                dispatch({type: 'TOKEN'});
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
                GetMoodStatus();
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const GetMoodStatus = () =>{
        axios({
            method: 'post',
            url: '/Mood/GetMood',
            headers: { 'Content-Type': 'application/json' },
            data: {
                Date: state.diary.date
            }
        })
            .then(function (response) {
                setStatusMood(response.data.status);
                GetWellBeingStatus();
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const GetWellBeingStatus = () =>{
        axios({
            method: 'post',
            url: '/WellBeing/GetWellBeing',
            headers: { 'Content-Type': 'application/json' },
            data: {
                Date: state.diary.date
            }
        })
            .then(function (response) {
                setStatusWellBeing(response.data.status);
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
        if(text === "" || text === " "){
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
                    dispatch({type: 'TOKEN'});
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
        
    }

    const content = loading ? (<h2 className="loading">Подождите идёт загрузка...</h2>) : (
        <div className="diary content container">
            <DatePicker/>
            <div className='data-content'>
                <div className='diary-content'>
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
                </div>
                <div className="info-content">
                    <WellBeing status={statusWellBeing}/>
                    <EditWellBeing />
                    <Mood status={statusMood} />
                    <EditMood />
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