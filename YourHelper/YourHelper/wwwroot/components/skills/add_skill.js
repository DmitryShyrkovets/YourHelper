import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import {Dropdown} from "../ui/dropdown";
import {ReducerContext} from '../store';
import {Validation} from "../validation/validation";

var options = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    timezone: 'UTC'
};

export function AddSkill(props){

    const { state, dispatch } = useContext(ReducerContext);
    
    const [title, setTitle] = useState('');
    const [newCategory, setNewCategory] = useState('');
    const [description, setDescription] = useState('');
    const [categories, setCategories] = useState([]);
    const [select, setSelect] = useState('Категория');
    const [message, setMessage] = useState('');
    const [newCategoryActive, setNewCategoryActive] = useState(true)

    useEffect(() => {
        const categ = [...props.categories, {id: 'qwe', category: 'Новая категория'}];

        setCategories(categ);

    }, [props.categories]);

    function filter(){

        let category;

        if (newCategoryActive === true){
            category = select;
        }
        else{
            category = newCategory;
        }

        if (title === ''){
            setMessage('Поле названия не должно быть пустым');
            return true;
        }

        if (category === ''){
            setMessage('Поле не категории должно быть пустым');
            return true;
        }

        if (description === ''){
            setMessage('Поле текста не должно быть пустым');
            return true;
        }

        if (category === 'Категория'){
            setMessage('Категория не выбрана');
            return true;
        }

        return false;
    }
    
    function cleaning(){
        setTitle('');
        setMessage('');
        setNewCategory('');
        setDescription('');
        setSelect('Категория');
    }

    function onAdd(){
        let category;

        if (newCategoryActive === true){
            category = select;
        }
        else{
            category = newCategory;
        }

        if(filter()){
            return;
        }
        
        axios({
            method: 'post',
            url: '/Skill/AddSkill',
            headers: { 'Content-Type': 'application/json' },
            data: {
                Title: title,
                Category: category,
                Description: description
                
            }
        })
            .then(function (response) {
                cleaning();

                dispatch({type: 'ADD_FORM_HIDE_SKILL'});
                dispatch({type: 'TOKEN'});
            })
            .catch(function (error) {
                console.log(error);
            });
        
    }

    function onCancel(){
        cleaning();

        dispatch({type: 'ADD_FORM_HIDE_SKILL'});
    }

    function onChangeSelect(value){
        if (value === 'Новая категория'){
            setNewCategoryActive(false)
        }
        else{
            setNewCategoryActive(true)
        }
        
        setSelect(value);
    }

    return(<div className={"add-skill " + state.skills.addSkill}>
        <h3>Новая запись</h3>
        <p className={'add-info'}>*добавление осуществляется на {(new Date()).toLocaleString("ru", options)}*</p>
        <div className="add-field">
            <input type="text" autoComplete="off" placeholder="Название" value={title} maxLength={16} onChange={e => setTitle(e.target.value)}/>
        </div>
        <div className="add-field">
            <Dropdown categories={categories} select={select} onChangeSelect={onChangeSelect}/>
        </div>
        <div className="add-field">
            <input type="text" autoComplete="off" placeholder="Название категории" maxLength={26} disabled={newCategoryActive} value={newCategory} onChange={e => setNewCategory(e.target.value)}/>
        </div>
        <div className="add-description">
            <textarea placeholder="Описание" value={description} onChange={e => setDescription(e.target.value)}/>
        </div>
        <Validation message={message}/>
        <div className="add-buttons">
            <div className="add button" onClick={() => onAdd()}>
                <p>Добавить</p>
            </div>
            <div className="cancel button" onClick={() => onCancel()} >
                <p>Отмена</p>
            </div>
        </div>
    </div>);
}