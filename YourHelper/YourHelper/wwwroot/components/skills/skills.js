import React, { useState, useEffect, useContext } from 'react';
import {ReducerContext} from '../store';
import axios from 'axios';
import {Menu} from "../header/menu";
import {DatePicker} from "./datepicker";
import {Skill} from "./skill";
import {AddSkill} from "./add_skill";
import {EditSkill} from "./edit_skill";
import {Filter} from "./filter";
import {Process} from "./process";

var options = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    timezone: 'UTC'
};

export function Skills(props){

    const [loading, setLoading] = useState(true);
    const [select, setSelect] = useState('Все');
    const [skills, setSkills] = useState([]);
    const [processSkills, setProcessSkills] = useState([]);
    const [categories, setCategories] = useState([]);

    const { state, dispatch } = useContext(ReducerContext);

    useEffect(() => {
        LoadSkills();
    }, [state.skills.token, state.skills.date])
    
    const LoadSkills = () =>{
        axios({
            method: 'post',
            url: '/Skill/LoadSkills',
            headers: { 'Content-Type': 'application/json' },
            data: {
                Category: select,
                Date: state.skills.date
            }

        })
            .then(function (response) {
                setSkills(response.data);
                LoadProcessSkills();

            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const LoadProcessSkills = () =>{
        axios({
            method: 'post',
            url: '/Skill/LoadProcessSkills',
            headers: { 'Content-Type': 'application/json' },
            data: {
                Category: select
            }

        })
            .then(function (response) {
                setProcessSkills(response.data);
                LoadCategories();

            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const LoadCategories = () =>{
        axios({
            method: 'get',
            url: '/Skill/LoadCategories',
            headers: { 'Content-Type': 'application/json' },

        })
            .then(function (response) {
                setCategories(response.data);
                LoadDates();

            })
            .catch(function (error) {
                console.log(error);
            })
    }

    const LoadDates = () =>{
        axios({
            method: 'get',
            url: '/Skill/GetDates',
            headers: { 'Content-Type': 'application/json' },
        })
            .then(function (response) {
                dispatch({type: 'UPDATE_SKILLS_DATES', newDates: response.data});
                setLoading(false);
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    
    function onAdd(){
        dispatch({type: 'ADD_FORM_SHOW_SKILL'});
    }

    function onParam(){
        dispatch({type: 'PARAM_FORM_SHOW_SKILL'});
    }

    function onChangeSelect(value){
        setSelect(value);
        dispatch({type: 'TOKEN'});
    }

    const content = loading ? (<h2 className="loading">Подождите идёт загрузка...</h2>) : (
        <div className={'content container skills'}>
            <div className="skills-actions">
                <div className={"add-action " + state.skills.actionVisible} onClick={() => onAdd()}>
                    <div className="add-icon icon">

                    </div>
                </div>
                <div className={"param-action " + state.skills.actionVisible} onClick={() => onParam()}>
                    <div className="settings-icon icon">

                    </div>
                </div>
                <Filter categories={categories} select={select} onChangeSelect={onChangeSelect}/>
            </div>
            <AddSkill categories={categories}/>
            <EditSkill categories={categories}/>
            <div className={"in-process-skills content-block " + state.skills.skillsVisible}>
                <h2>Навыки в процессе</h2>
                <h4>После выполнения навыки записываются на {(new Date()).toLocaleString("ru", options)}</h4>
                <div className="in-process-skills-data">
                    {processSkills.map((process) =>
                        <Process key={process.id} process={process}/>)
                    }
                </div>
            </div>
            <div className={"completed-skills "  + state.skills.skillsVisible}>
                <div className='skill-date'>
                    <DatePicker/>
                </div>
                <div className='content-block completed-skills-info'>
                    <h2>Полученные навыки</h2>
                    <div className="completed-skills-data">
                        {skills.map((skill) =>
                            <Skill key={skill.id} skill={skill}/>)
                        }
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

