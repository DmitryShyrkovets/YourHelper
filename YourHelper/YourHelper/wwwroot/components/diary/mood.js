import React, {useContext, useEffect, useState} from 'react';
import {ReducerContext} from "../store";
import axios from "axios";

const Mood = (props) => {

    const { state, dispatch } = useContext(ReducerContext);
    const [status, setStatus] = useState('');

    useEffect(() => {
        setStatus(props.status);
    }, [props.status]);

    const SetStatus = (status) =>{
        axios({
            method: 'post',
            url: '/Mood/SetMood',
            headers: { 'Content-Type': 'application/json' },
            data: {
                Date: state.diary.date,
                Status: status
            }
        })
            .then(function (response) {
                dispatch({type: 'TOKEN'});
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    
    const ChangeStatus = () =>{
        dispatch({type: 'SHOW_EDIT_MOOD'});
    }

    const Question = <div>
        <h3>Какое у вас настроение?</h3>
        <p>Выберите смайлик наиболее отражающий ваше настроение</p>
        <div className="smiles">
            <div className="bad">
                <div className="bad-smile-icon" onClick={() => SetStatus('bad')}></div>
            </div>
            <div className="neutral">
                <div className="neutral-smile-icon" onClick={() => SetStatus('neutral')}></div>
            </div>
            <div className="good">
                <div className="good-smile-icon" onClick={() => SetStatus('good')}></div>
            </div>
        </div>
    </div>

    const Result = <div>
        <h3>Ваше настроение</h3>
        <div className="choosen-smile">
            <div className={"choosen-smile-icon " + status} onClick={ChangeStatus}></div>
        </div>
        <p>Нажмите на смайлик, чтобы изменить</p>
    </div>
    
    return(<div className={'mood ' + state.diary.mood}>
        {
            status === '' ? Question : Result
        }
    </div>)
}

export default Mood;