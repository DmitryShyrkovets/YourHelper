import React, { useState, useEffect, useContext } from 'react';
import {Dropdown} from "../ui/dropdown";
import {ReducerContext} from '../store';

export function Filter(props){

    const { state, dispatch } = useContext(ReducerContext);
    
    const [categories, setCategories] = useState([{id: '0', category: 'Все'}, {id: '1', category: 'Выполненные'}, {id: '2', category: 'В процессе'}, {id: '3', category: 'Проваленные'}]);
    const [select, setSelect] = useState(props.select);

    useEffect(() => {
        setSelect(props.select);
    }, [props.select]);
    
    function onClose(){
        dispatch({type: 'PARAM_FORM_HIDE_TARGET'});
    }

    function onChangeSelect(value){
        props.onChangeSelect(value);
    }

    return(<div className={"filter " + state.target.filter}>
        <div className="header-filter">
            <div className="close-button" onClick={() => onClose()}>
                <div className="close-icon">
                    
                </div>
            </div>
        </div>
        <h4>Фильтрация</h4>
        <hr/>
        <div className="category-filter">
            <p>Выберите категорию</p>
            <Dropdown categories={categories} select={select} onChangeSelect={onChangeSelect}/>
        </div>
    </div>);
}

