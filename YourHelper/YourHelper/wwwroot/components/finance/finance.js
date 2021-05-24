import React, { useState, useEffect, useContext } from 'react';
import {ReducerContext} from '../store';
import axios from 'axios';

export function Finance(props){
    
    const [finance, setFinance] = useState(props.finance);

    const { state, dispatch } = useContext(ReducerContext);

    useEffect(() => {
        setFinance(props.finance);
    }, [props.finance])
    
    function onEdit() {
        let date = finance.date.slice(6, 10) + '-' + finance.date.slice(3, 5) + '-' + finance.date.slice(0, 2);
        dispatch({type: 'EDIT_FORM_SHOW_FINANCE', finance: finance, date: date, money: finance.money});
    }    
    
    function onRemove() {
        axios({
            method: 'post',
            url: '/Finance/RemoveFinance',
            headers: { 'Content-Type': 'application/json' },
            data: {
                Id: finance.id
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
            'Название: ' + finance.title
            + '. Категория: ' + finance.category
            + '. Дата: ' + finance.date.slice(0,10)
            + '. Сумма: ' + finance.money
            + '. Валюта: ' + finance.currency);
        utterance.pitch = 1.2;  // пониже
        utterance.rate = 0.9;   // побыстрее
        utterance.volume = 1; // потише
        window.speechSynthesis.speak(utterance);
    }
    
    return(
        <tr>
            <td>{finance.title}</td>
            <td className={'mobile-hide'}>{finance.category}</td>
            <td className={'mobile-hide'}>{finance.date.slice(0,10)}</td>
            {finance.operation === 'Расход' && props.operation === 'Прибыль'  ?
                (<td>{'-' + finance.money + ' ' + finance.currency}</td>)
                :
                (<td>{finance.money + ' ' + finance.currency}</td>)}
            <td className='action'>
                <div className="voice-button" onClick={() => onVoice()}>
                    <div className="voice-icon">

                    </div>
                </div>
            </td>
            <td className='action'>
                <div className="edit-button" onClick={() => onEdit()}>
                    <div className="edit-icon">

                    </div>
                </div>
            </td>
            <td className='action'>
                <div className="remove-button" onClick={() => onRemove()}>
                    <div className="remove-icon">

                    </div>
                </div>
            </td>
        </tr>
    );
}

