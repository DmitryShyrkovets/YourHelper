import React, { useState, useEffect, useContext } from 'react';
import {ReducerContext} from '../store';
import axios from 'axios';
import {Menu} from "../header/menu";
import {Schedule} from "./schedule.js";
import {ScheduleInfo} from "./scheduleInfo";
import {Validation} from "../validation/validation";

export function Schedules(props){

    const [schedules, setSchedules] = useState([]);
    const [info, setInfo] = useState([]);
    const [text, setText] = useState('');
    const [timeStart, setTimeStart] = useState('00:00');
    const [timeEnd, setTimeEnd] = useState('00:01');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [editID, setEditID] = useState('');
    const [loading, setLoading] = useState(true);

    const { state, dispatch } = useContext(ReducerContext);

    useEffect(() => {
        LoadPage();
    },[state.schedule.token])

    function LoadPage(){
        axios({
            method: 'get',
            url: '/Schedule/LoadSchedules',
            headers: { 'Content-Type': 'application/json' },

        })
            .then(function (response) {
                setSchedules(response.data);
                axios({
                    method: 'get',
                    url: '/Schedule/LoadSchedulesInfo',
                    headers: { 'Content-Type': 'application/json' },

                })
                    .then(function (response) {
                        setInfo(response.data);
                        setLoading(false);
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    function filter(){

        if (CheckTime()){
            setError('error');
            setMessage('Время начала > или = времени конца');
            return true;
        }

        if (text === '' || text === ' '){
            setError('error');
            setMessage('Поле для ввода не должно быть пустым');
            return true;
        }

        return false;
    }

    function cleaning(){
        setTimeStart('00:00');
        setTimeEnd('00:01');
        setText('');
        setError('');
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

        if(filter()){
            return;
        }
        
        axios({
            method: 'post',
            url: '/Schedule/AddSchedule',
            headers: { 'Content-Type': 'application/json' },
            data: {
                Text: text,
                TimeStart: timeStart,
                TimeEnd: timeEnd
            }

        })
            .then(function (response) {
                if (response.data.type === "ok"){
                    cleaning();
                    
                    dispatch({type: 'TOKEN'});
                }
                else{
                    setError('error');
                    setMessage(response.data.error);
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    function onCancel(){
        cleaning();

        dispatch({type: 'HIDE_EDIT_ACTIONS'});
    }

    function onEdit(obj){
        setEditID(obj.id);
        setTimeStart(obj.timeStart.substr(11, 5));
        setTimeEnd(obj.timeEnd.substr(11, 5));
        setText(obj.text);
    }

    function onConfirm(){
        
        if(filter()){
            return;
        }

        axios({
            method: 'post',
            url: '/Schedule/EditSchedule',
            headers: { 'Content-Type': 'application/json' },
            data: {
                Id: editID,
                Text: text,
                TimeStart: timeStart,
                TimeEnd: timeEnd
            }

        })
            .then(function (response) {
                
                if (response.data.type === "ok"){
                    cleaning();
                    
                    dispatch({type: 'HIDE_EDIT_ACTIONS'});
                    dispatch({type: 'TOKEN'});
                }
                else{
                    setError('error');
                    setMessage(response.data.error);
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const content = loading ? (<h2 className="loading">Подождите идёт загрузка...</h2>) : (
        <div className={'content container schedules'}>
            <div className={'content-schedules'}>
                <h2>Распорядок дня</h2>
                <Validation message={message}/>
                <div className={'add-schedule ' + error}>
                    <div className={'time'}>
                        <input type="time" value={timeStart} onChange={e => setTimeStart(e.target.value)}/>
                        <input type="time" value={timeEnd} onChange={e => setTimeEnd(e.target.value)}/>
                    </div>
                    <input type="text" placeholder='Напишите занятие...' value={text} onChange={(e) => setText(e.target.value)}/>
                    <div className={'actions-desc ' + state.schedule.editAction}>
                        <div className={'confirm-button'} onClick={() => onConfirm()}>
                            <div className={'confirm-icon'}>

                            </div>
                        </div>
                        <div className={'cancel-button'} onClick={() => onCancel()}>
                            <div className={'cancel-icon'}>

                            </div>
                        </div>
                    </div>
                    <div className={'actions-mobile ' + state.schedule.editAction}>
                        <div className={'confirm-button-mobile'} onClick={() => onConfirm()}>
                            <p>Изменить</p>
                        </div>
                        <div className={'cancel-button-mobile'} onClick={() => onCancel()}>
                            <p>Отмена</p>
                        </div>
                    </div>
                    <div className={'add-button ' + state.schedule.addButton} onClick={() => onAdd()}>
                        <p>Добавить</p>
                    </div>
                </div>
                <ScheduleInfo info={info}/>
                {schedules.length > 0 &&
                <h4>События:</h4>
                }
                <div className={'schedules-list'}>
                    {schedules.map((schedule) =>
                        <Schedule key={schedule.id} schedule={schedule} onEdit={onEdit}/>)
                    }
                </div>
            </div>
        </div>);
    
    return(
        <div>
            <div id="head-menu">
                <Menu />
            </div>
            {content}
        </div>
    );
}

