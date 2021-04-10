import React, { useState, useEffect, useContext } from 'react';
import {ReducerContext} from '../store';
import axios from 'axios';
import {Menu} from "../header/menu";
import {Filter} from "./filter";
import {Target} from "./target";
import {AddTarget} from "./add_target";
import {EditTarget} from "./edit_target";

export function Targets(props){
    const { state, dispatch } = useContext(ReducerContext);
    
    const [loading, setLoading] = useState(true);
    const [select, setSelect] = useState('Все');
    const [targets, setTargets] = useState([]);

    useEffect(() => {
        axios({
            method: 'post',
            url: '/Target/LoadTargets',
            headers: { 'Content-Type': 'application/json' },
            data: {
                Status: select
            }

        })
            .then(function (response) {
                setTargets(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    }, [state.target.token])
    
    function onAdd() {
        dispatch({type: 'ADD_FORM_SHOW_TARGET'});
    }

    function onParam() {
        dispatch({type: 'PARAM_FORM_SHOW_TARGET'});
    }

    function onChangeSelect(value){
        setSelect(value);
        dispatch({type: 'TOKEN'});
    }

    return(
        <div>
            <div id="head-menu">
                <Menu />
            </div>
            <div className={'content container targets'}>
                <div className="targets-actions">
                    <div className={"add-action " + state.target.actionVisible} onClick={() => onAdd()}>
                        <div className="add-icon icon">

                        </div>
                    </div>
                    <div className={"param-action " + state.target.actionVisible} onClick={() => onParam()}>
                        <div className="settings-icon icon">

                        </div>
                    </div>
                    <Filter select={select} onChangeSelect={onChangeSelect}/>
                </div>
                <div className="targets-content">
                    <AddTarget />
                    <EditTarget />
                    {targets.length < 1 &&
                    <h2 className={"empty " + state.target.targetsVisible}>Целей нету</h2>
                    }
                    <div className={"targets-list " + state.target.targetsVisible}>
                        {targets.map((target) =>
                            <Target key={target.id} target={target}/>)
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

