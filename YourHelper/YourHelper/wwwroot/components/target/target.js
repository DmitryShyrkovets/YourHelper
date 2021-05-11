import React, { useState, useEffect, useContext } from 'react';
import {ReducerContext} from '../store';
import axios from 'axios';

export function Target(props){

    const [target, setTarget] = useState(props.target);
    const [actions, setActions] = useState('hide');

    const { state, dispatch } = useContext(ReducerContext);
    
    useEffect(() => {
        setTarget(props.target);

    }, [props.target])

    function onEdit(){
        let timeStart = target.timeStart.slice(6, 10) + '-' + target.timeStart.slice(3, 5) + '-' + target.timeStart.slice(0, 2) + 'T' + target.timeStart.slice(11, 16);
        let timeEnd = target.timeEnd.slice(6, 10) + '-' + target.timeEnd.slice(3, 5) + '-' + target.timeEnd.slice(0, 2) + 'T' + target.timeEnd.slice(11, 16);
        dispatch({type: 'EDIT_FORM_SHOW_TARGET', target: target, timeStart: timeStart, timeEnd: timeEnd});
    }

    function onRemove(){
        axios({
            method: 'post',
            url: '/Target/RemoveTarget',
            headers: { 'Content-Type': 'application/json' },
            data: {
                id: target.id
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
            'Начало цели: ' + target.timeStart.slice(0, 16)
            + '. Конец цели: ' + target.timeEnd.slice(0, 16)
            + '. Цель: ' + target.text);
        utterance.pitch = 1.2;  // пониже
        utterance.rate = 0.9;   // побыстрее
        utterance.volume = 1; // потише
        window.speechSynthesis.speak(utterance);

        const utterance2 = new SpeechSynthesisUtterance(
            'Описание: ' + target.description
            + '. Статус: ' + target.status);

        utterance2.pitch = 1.2;  // пониже
        utterance2.rate = 0.9;   // побыстрее
        utterance2.volume = 1; // потише
        window.speechSynthesis.speak(utterance2);
    }

    return(<div className="target" onMouseEnter={() => setActions('')} onMouseLeave={() => setActions('hide')}>
        <div className="header">
            <div className="interval">
                <p>{target.timeStart.slice(0, 16)} - {target.timeEnd.slice(0, 16)}</p>
            </div>
            <div className={"actions " + actions}>
                <div className="voice-button" onClick={() => onVoice()}>
                    <div className="voice-icon">

                    </div>
                </div>
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
        <h3>Цель: {target.text}</h3>
        <hr/>
        <p>Описание:</p>
        <div className={'description'}>
            <p>{target.description}</p>
        </div>
        <hr/>
        <div className={'status'}>
            {target.status}
        </div>
    </div>);
}

