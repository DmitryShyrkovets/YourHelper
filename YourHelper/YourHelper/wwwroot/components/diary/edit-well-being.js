import React, {useContext, useEffect, useState} from 'react';
import {ReducerContext} from "../store";
import axios from "axios";

const EditWellBeing = () => {

    const { state, dispatch } = useContext(ReducerContext);

    const SetStatus = (status) =>{
        axios({
            method: 'post',
            url: '/WellBeing/SetWellBeing',
            headers: { 'Content-Type': 'application/json' },
            data: {
                Date: state.diary.date,
                Status: status
            }
        })
            .then(function (response) {
                dispatch({type: 'HIDE_EDIT_WELL_BEING'});
                dispatch({type: 'TOKEN'});
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    
    return(<div className={'edit-well-being ' + state.diary.editWellBeing}>
        <h3>Какое у вас самочувствие?</h3>
        <p>Выберите смайлик наиболее отражающий ваше самочувствие</p>
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
    </div>)
}

export default EditWellBeing;