import React, { useState, useEffect, useContext } from 'react';
import {Dropdown} from "../ui/dropdown";
import {ReducerContext} from '../store';

export function Filter(props){

    const { state, dispatch } = useContext(ReducerContext);
    
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const categ = [{id: 'qwe', category: 'Все'}, ...props.categories];

        setCategories(categ);

    }, [props.categories]);
    
    function onClose(){
        dispatch({type: 'PARAM_FORM_HIDE_FINANCE'});
    }

    function onChangeSelect(value){
        dispatch({type: 'CHANGE_CATEGORY_FILTER_FINANCE', value: value});
        dispatch({type: 'TOKEN'});
    }

    function onChangeDateStart(value){
        if (Date.parse(state.finance.dateEnd.toString()) < Date.parse(value.toString())){
            dispatch({type: 'CHANGE_DATE_END_FILTER_FINANCE', value: value});
        }
        dispatch({type: 'CHANGE_DATE_START_FILTER_FINANCE', value: value});
        dispatch({type: 'TOKEN'});
    }

    function onChangeDateEnd(value){
        if (Date.parse(state.finance.dateStart.toString()) > Date.parse(value.toString())){
            dispatch({type: 'CHANGE_DATE_START_FILTER_FINANCE', value: value});
        }
        dispatch({type: 'CHANGE_DATE_END_FILTER_FINANCE', value: value});
        dispatch({type: 'TOKEN'});
    }

    const soldCheckbox = ({ target: { checked } }) => {
        dispatch({type: 'ALL_DATES_FILTER_FINANCE', value: checked});
        dispatch({type: 'TOKEN'});
    };

    return(<div className={"filter " + state.finance.filter}>
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
            <Dropdown categories={categories} select={state.finance.categorySelect} onChangeSelect={onChangeSelect}/>
        </div>
        <hr/>
        <div className={'checkbox-date'}>
            <label htmlFor="date-all">За всё время</label>
            <input type="checkbox" name="date-all" checked={state.finance.allDates} onChange={soldCheckbox}/>
        </div>
        <div className={"data-filter " + state.finance.filterDatesVisible}>
            <hr/>
            <p>Выберите период</p>
            <div className={"field-date "}>
                <p>Дата начала</p>
                <input type="date" value={state.finance.dateStart} onChange={e => onChangeDateStart(e.target.value)}/>
            </div>
            <div className="field-date">
                <p>Дата конца</p>
                <input type="date" value={state.finance.dateEnd} min={state.finance.dateStart} onChange={e => onChangeDateEnd(e.target.value)}/>
            </div>
        </div>
    </div>);
}

