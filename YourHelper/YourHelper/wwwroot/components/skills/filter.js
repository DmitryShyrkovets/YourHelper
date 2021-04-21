import React, { useState, useEffect, useContext } from 'react';
import {Dropdown} from "../ui/dropdown";
import {ReducerContext} from '../store';

export function Filter(props){
    
    const [categories, setCategories] = useState([]);
    const [select, setSelect] = useState(props.select);

    const { state, dispatch } = useContext(ReducerContext);
    
    useEffect(() => {
        const categ = [{id: 'qwe', category: 'Все'}, ...props.categories];

        setCategories(categ);
        setSelect(props.select);

    }, [props.categories]);
    
    function onClose(){
        dispatch({type: 'PARAM_FORM_HIDE_SKILL'});
    }

    function onChangeSelect(value){
        props.onChangeSelect(value);
    }

    return(<div className={"filter " + state.skills.filter}>
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

