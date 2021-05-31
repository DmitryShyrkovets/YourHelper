import React, { useState, useEffect, useContext } from 'react';
import {ReducerContext} from '../store';
import axios from 'axios';


export function Process(props){

    const [process, setProcess] = useState(props.process);
    const [actions, setActions] = useState('hide');

    const { state, dispatch } = useContext(ReducerContext);

    useEffect(() => {
        setProcess(props.process);

    }, [props.process])

    const onEdit = () => {
        dispatch({type: 'EDIT_FORM_SHOW_SKILL', skill: process});
    }

    const onRemove = () => {
        axios({
            method: 'post',
            url: '/Skill/RemoveSkill',
            headers: { 'Content-Type': 'application/json' },
            data: {
                Id: process.id
            }

        })
            .then(function (response) {
                dispatch({type: 'TOKEN'});
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    
    const Complete = () =>{
        axios({
            method: 'post',
            url: '/Skill/AddSkill',
            headers: { 'Content-Type': 'application/json' },
            data: {
                Id: process.id
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
            'Навык: ' + process.title
            + '. Категория: ' + process.category
            + '. Описание: ' + process.description);
        utterance.pitch = 1.2;  // пониже
        utterance.rate = 0.9;   // побыстрее
        utterance.volume = 1; // потише
        window.speechSynthesis.speak(utterance);
    }

    return(<div className="skill-process" onMouseEnter={() => setActions('')} onMouseLeave={() => setActions('hide')}>
        <div className="header">
            <p className='title'>{process.title}</p>
            <div className={"actions " + actions}>
                <div className="voice-button" onClick={onVoice}>
                    <div className="voice-icon"></div>
                </div>
                <div className="edit-button " onClick={onEdit}>
                    <div className="edit-icon"></div>
                </div>
                <div className="delete-button " onClick={onRemove}>
                    <div className="delete-icon"></div>
                </div>
                <div className="complete-button " onClick={Complete}>
                    <div className="complete-icon"></div>
                </div>
            </div>
        </div>
        <p className='field'>Категория: <span className='category'>{process.category}</span></p>
        <p className='field'><span className='description'>Описание:</span> {process.description}</p>
        <hr/>
    </div>);
}

