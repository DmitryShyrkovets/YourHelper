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

    const onEdit = () => {
        dispatch({type: 'EDIT_FORM_SHOW_SKILL', skill: skill});
    }

    const onRemove = () => {
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
    
    const onVoice = () =>{
        window.speechSynthesis.cancel();

        const utterance = new SpeechSynthesisUtterance(
            'Навык: ' + skill.title
            + '. Категория: ' + skill.category
            + '. Описание: ' + skill.description);
        utterance.pitch = 1.2;  // пониже
        utterance.rate = 0.9;   // побыстрее
        utterance.volume = 1; // потише
        window.speechSynthesis.speak(utterance);
    }

    return(<div className="skill-completed" onMouseEnter={() => setActions('')} onMouseLeave={() => setActions('hide')}>
            <div className="header">
                <p className='title'>{skill.title}</p>
                <div className={"actions " + actions}>
                    <div className="voice-button" onClick={onVoice}>
                        <div className="voice-icon">

                        </div>
                    </div>
                    <div className="edit-button " onClick={onEdit}>
                        <div className="edit-icon"></div>
                    </div>
                    <div className="delete-button " onClick={onRemove}>
                        <div className="delete-icon"></div>
                    </div>
                </div>
            </div>
            <p className='field'>Категория: <span className='category'>{skill.category}</span></p>
            <p className='field'><span className='description'>Описание:</span> {skill.description}</p>
            <hr/>
        </div>);
}

