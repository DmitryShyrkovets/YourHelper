import React, { useState, useEffect, useContext } from 'react';
import {Dropdown} from "../ui/dropdown";
import {Actions, FilterVisible, ImportantOnly, Token} from "../storeges/note";

export function Filter(props){

    const [filter, setFilter] = useContext(FilterVisible);
    const [actionVisible, setActionVisible] = useContext(Actions);
    const [importantOnly, setImportantOnly] = useContext(ImportantOnly);
    const [token, setToken] = useContext(Token);
    
    const [categories, setCategories] = useState([]);
    const [select, setSelect] = useState(props.select);

    useEffect(() => {
        const categ = [{id: 'qwe', category: 'Все'}, ...props.categories];

        setCategories(categ);
        setSelect(props.select);

    }, [props.categories]);
    
    function onClose(){
        setFilter('hide');
        setActionVisible('')
    }

    const soldCheckbox1 = ({ target: { checked } }) => {
        setImportantOnly(checked);
        setToken(!token);
    };

    function onChangeSelect(value){
        props.onChangeSelect(value);
    }

    return(<div className={"filter " + filter}>
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
            <input type="checkbox" name="important" checked={importantOnly} onChange={soldCheckbox1}/>
        </div>
    </div>);
}

