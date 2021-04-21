import React, { useState, useEffect, useContext } from 'react';
import {ReducerContext} from '../store';
import axios from 'axios';


export function Skill(props){

    const [skill, setSkill] = useState(props.skill);
    const [actions, setActions] = useState('hide');

    const { state, dispatch } = useContext(ReducerContext);

    useEffect(() => {
        setSkill(props.skill);

    }, [props.skill])

    function onEdit(){
        dispatch({type: 'EDIT_FORM_SHOW_SKILL', skill: skill});
    }

    function onRemove(){
        axios({
            method: 'post',
            url: '/Skill/RemoveSkill',
            headers: { 'Content-Type': 'application/json' },
            data: {
                Id: skill.id
            }

        })
            .then(function (response) {
                dispatch({type: 'TOKEN'});
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    return(<div className="skill" onMouseEnter={() => setActions('')} onMouseLeave={() => setActions('hide')}>
        <div className="header">
            <div className="title">
                <p>{skill.title}</p>
            </div>
            <div className={"actions " + actions}>
                <div className="edit-button" onClick={() => onEdit()}>
                    <div className="edit-icon">

                    </div>
                </div>
                <div className="remove-button" onClick={() => onRemove()}>
                    <div className="remove-icon">

                    </div>
                </div>
            </div>
        </div>
        <p className="category">{skill.category}</p>
        <p className="description">{skill.description}</p>
    </div>);
}

