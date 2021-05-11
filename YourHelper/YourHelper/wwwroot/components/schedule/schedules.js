import React, { useState, useEffect, useContext } from 'react';
import {ReducerContext} from '../store';
import axios from 'axios';
import {Menu} from "../header/menu";
import {Schedule} from "./schedule.js";
import {ScheduleInfo} from "./scheduleInfo";
import {Validation} from "../validation/validation";
import {DatePicker} from "./datepicker";
import {AddSchedule} from "./add_schedule";
import {EditSchedule} from "./edit_schedule";
import DoughnutChart from "../ui/doughnutChart";

export function Schedules(props){

    const [schedules, setSchedules] = useState([]);
    const [pieValue, setPieValue] = useState([]);
    const [pieLabels, setPieLabels] = useState([]);
    const [info, setInfo] = useState([]);
    const [loading, setLoading] = useState(true);

    const { state, dispatch } = useContext(ReducerContext);

    useEffect(() => {
        LoadPage();
    },[state.schedule.token, state.schedule.date])

    function LoadPage(){
        axios({
            method: 'post',
            url: '/Schedule/LoadSchedules',
            headers: { 'Content-Type': 'application/json' },
            data: {
                Date: state.schedule.date
            }

        })
            .then(function (response) {
                setSchedules(response.data);
                GetInfoData(response.data);
                
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    
    const GetInfoData = (schedules) =>{
        axios({
            method: 'post',
            url: '/Schedule/LoadSchedulesInfo',
            headers: { 'Content-Type': 'application/json' },
            data: {
                Date: state.schedule.date
            }

        })
            .then(function (response) {
                setInfo(response.data);
                SetPieData(schedules, response.data);
                LoadDates(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    
    const SetPieData = (schedules, info) => {
        let labels = [];
        let value = [];
        
        for (let i = 0; i < schedules.length; i++){
            labels.push(schedules[i].text);
            value.push(GetTheTimeDifferenceInMinutes(schedules[i].timeStart.slice(10, 16), schedules[i].timeEnd.slice(10, 16)));
        }

        labels.push('Незапланированное');
        
        let temp = 0

        for (let i = 0; i < info.length; i++){
            temp = temp + GetTheTimeDifferenceInMinutes(info[i].timeStart.slice(10, 16), info[i].timeEnd.slice(10, 16));
        }

        value.push(temp);
        
        setPieLabels(labels);
        setPieValue(value);
    }
    
    const GetTheTimeDifferenceInMinutes = (start, end) =>{
        
        let getDate = (string) => new Date(0, 0,0, string.split(':')[0], string.split(':')[1]); //получение даты из строки (подставляются часы и минуты
        let different = (getDate(end) - getDate(start));

        let hours = Math.floor((different % 86400000) / 3600000);
        let minutes = Math.round(((different % 86400000) % 3600000) / 60000);
        
        return minutes + hours * 60;
    }

    function LoadDates(){
        axios({
            method: 'get',
            url: '/Schedule/LoadDates',
            headers: { 'Content-Type': 'application/json' },
        })
            .then(function (response) {
                dispatch({type: 'UPDATE_SCHEDULE_DATES', newDates: response.data});
                setLoading(false);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const content = loading ? (<h2 className="loading">Подождите идёт загрузка...</h2>) : (
        <div className={'content container schedules'}>
            <DatePicker />
            <AddSchedule />
            <EditSchedule />
            <div className={'schedules-content ' + state.schedule.contentVisible}>
                <div className='schedules-data'>
                    <h3>Распорядок</h3>
                    <div className={'schedules-list'}>
                        {schedules.length < 1 &&
                        <h3 className='empty'>Записей нету</h3>
                        }
                        {schedules.map((schedule) =>
                            <Schedule key={schedule.id} schedule={schedule}/>)
                        }
                    </div>
                </div>
                <div className='other-information'>
                    <ScheduleInfo info={info}/>
                    <h5>Все данные отображены в минутах</h5>
                    <div className='doughnut'>
                        <DoughnutChart labels={pieLabels} value={pieValue}/>
                    </div>
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

