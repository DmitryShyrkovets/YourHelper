import React, { useState, useEffect, useContext } from 'react';
import {Dropdown} from "../ui/dropdown";
import {ReducerContext} from '../store';

export function Filter(props){

    const { state, dispatch } = useContext(ReducerContext);
    
    const [categories, setCategories] = useState([]);
    const [select, setSelect] = useState(props.select);

    useEffect(() => {
        const categ = [{id: 'qwe', category: 'Все'}, ...props.categories];

        setCategories(categ);
        setSelect(props.select);

    }, [props.categories]);
    
    function onClose(){
        dispatch({type: 'PARAM_FORM_HIDE'});
    }

    const soldCheckbox1 = ({ target: { checked } }) => {
        dispatch({type: 'IMPORTANT_ONLY', value: checked});
        dispatch({type: 'TOKEN'});
    };

    function onChangeSelect(value){
        props.onChangeSelect(value);
    }

    return(<div className={"filter " + state.note.filter}>
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
        <hr/>
        <div className="important-filter">
            <label htmlFor="important">Только важное</label>
            <input type="checkbox" name="important" checked={state.note.importantOnly} onChange={soldCheckbox1}/>
        </div>
    </div>);
}

