import React, { useState, useEffect, useContext } from 'react';
import {ReducerContext} from '../store';
import axios from 'axios';
import {Menu} from "../header/menu";
import {DatePicker} from "./datepicker";
import {Skill} from "./skill";
import {AddSkill} from "./add_skill";
import {EditSkill} from "./edit_skill";
import {Filter} from "./filter";

export function Skills(props){

    const [loading, setLoading] = useState(true);
    const [select, setSelect] = useState('Все');
    const [skills, setSkills] = useState([]);
    const [categories, setCategories] = useState([]);

    const { state, dispatch } = useContext(ReducerContext);

    useEffect(() => {
        LoadPage();
    }, [state.skills.token, state.skills.date])

    function LoadPage(){
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

                axios({
                    method: 'get',
                    url: '/Skill/LoadCategories',
                    headers: { 'Content-Type': 'application/json' },

                })
                    .then(function (response) {
                        setCategories(response.data);
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

                    })
                    .catch(function (error) {
                        console.log(error);
                    });

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
            <div className="skills-content">
                <AddSkill categories={categories}/>
                <EditSkill categories={categories}/>

                <div className={'skill-date ' + state.skills.skillsVisible}>
                    <DatePicker/>
                </div>
                {skills.length < 1 &&
                <h2 className={"empty " + state.skills.skillsVisible}>Навыков нету</h2>
                }
                <div className={'skills-list ' + state.skills.skillsVisible}>
                    {skills.map((skill) =>
                        <Skill key={skill.id} skill={skill}/>)
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

