import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import {Menu} from "../header/menu";

var options = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    timezone: 'UTC'
};

let date = new Date().toLocaleString("ru", options);

export function Statistic(props){

    const [statistic, setStatistic] = useState({});
    const [token, setToken] = useState(true);
    const [dateStart, setDateStart] = useState(date.slice(6, 10) + '-' + date.slice(3, 5) + '-' + date.slice(0, 2));
    const [dateEnd, setDateEnd] = useState(date.slice(6, 10) + '-' + date.slice(3, 5) + '-' + date.slice(0, 2));
    
    useEffect(() => {
        LoadPage();
    },[token])

    function LoadPage(){
        let start = dateStart.slice(8, 10) + '.' + dateStart.slice(5, 7) + '.' + dateStart.slice(0, 4);
        let end = dateEnd.slice(8, 10) + '.' + dateEnd.slice(5, 7) + '.' + dateEnd.slice(0, 4);
        
        axios({
            method: 'post',
            url: '/Statistic/LoadInfo',
            headers: { 'Content-Type': 'application/json' },
            data: {
                DateStart: start,
                DateEnd: end
            }

        })            
            .then(function (response) {
                console.log(response.data)
            setStatistic(response.data);
        })
            .catch(function (error) {
                console.log(error);
            });
    }
    
    function onChangeDateStart(value) {
        if (Date.parse(dateEnd.toString()) < Date.parse(value.toString())){
            setDateEnd(value);
        }
        setDateStart(value);
        setToken(!token);
    }

    function onChangeDateEnd(value) {
        if (Date.parse(dateStart.toString()) > Date.parse(value.toString())){
            setDateStart(value);
        }
        setDateEnd(value);
        setToken(!token);
    }

    return(
        <div>
            <div id="head-menu">
                <Menu />
            </div>
            <div className={'content container statistic'}>
                <div className={'period'}>
                    <p className={'title'}>Период</p>
                    <div className={'date-area'}>
                        <p>С</p>
                        <input type="date" value={dateStart} onChange={e => onChangeDateStart(e.target.value)}/>
                    </div>
                    <div className={'date-area'}>
                        <p>По</p>
                        <input type="date" value={dateEnd} onChange={e => onChangeDateEnd(e.target.value)}/>
                    </div>
                </div>
                <div className={'statistic-list'}>
                    <div className={'diary-block block'}>
                        <h4>Дневник</h4>
                        <div className={'field'}>
                            <p>Записей:</p>
                            <p>{statistic.diaryEntries}</p>
                        </div>
                        <div className={'field'}>
                            <p>Дней:</p>
                            <p>{statistic.diaryDays}</p>
                        </div>
                    </div>
                    <hr/>
                    <div className={'note-block block'}>
                        <h4>Заметки</h4>
                        <div className={'field'}>
                            <p>Всего:</p>
                            <p>{statistic.notesCount}</p>
                        </div>
                        <div className={'field'}>
                            <p>Важных:</p>
                            <p>{statistic.notesImportant}</p>
                        </div>
                        <div className={'field'}>
                            <p>Категорий:</p>
                            <p>{statistic.notesCategories}</p>
                        </div>
                    </div>
                    <hr/>
                    <div className={'target-block block'}>
                        <h4>Цели</h4>
                        <div className={'field'}>
                            <p>Всего:</p>
                            <p>{statistic.targetsCount}</p>
                        </div>
                        <div className={'field'}>
                            <p>Выполненных:</p>
                            <p>{statistic.targetsCompleted}</p>
                        </div>
                        <div className={'field'}>
                            <p>В процессе:</p>
                            <p>{statistic.targetsProcess}</p>
                        </div>
                        <div className={'field'}>
                            <p>Проваленных:</p>
                            <p>{statistic.targetsFailed}</p>
                        </div>
                    </div>
                    <hr/>
                    <div className={'skill-block block'}>
                        <h4>Навыки</h4>
                        <div className={'field'}>
                            <p>Всего:</p>
                            <p>{statistic.skillsCount}</p>
                        </div>
                        <div className={'field'}>
                            <p>Категорий:</p>
                            <p>{statistic.skillsCategories}</p>
                        </div>
                        <div className={'field'}>
                            <p>Дней:</p>
                            <p>{statistic.skillsDays}</p>
                        </div>
                    </div>
                    <hr/>
                    <div className={'finance-block block'}>
                        <h4>Финансы</h4>
                        <div className={'field'}>
                            <p>Записей прихода:</p>
                            <p>{statistic.financesComing}</p>
                        </div>
                        <div className={'field'}>
                            <p>Записей расхода:</p>
                            <p>{statistic.financesConsumption}</p>
                        </div>
                        <div className={'field'}>
                            <p>Категорий:</p>
                            <p>{statistic.financesCategories}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

