import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import {Dropdown} from "../ui/dropdown";
import {ReducerContext} from '../store';

export function AddNote(props){

    const { state, dispatch } = useContext(ReducerContext);
    
    const [title, setTitle] = useState('');
    const [newCategory, setNewCategory] = useState('');
    const [text, setText] = useState('');
    const [important, setImportant] = useState(false);
    const [categories, setCategories] = useState([]);
    const [select, setSelect] = useState('Категория');
    const [newCategoryActive, setNewCategoryActive] = useState(true)

    useEffect(() => {
        const categ = [...props.categories, {id: 'qwe', category: 'Новая категория'}];

        setCategories(categ);

    }, [props.categories]);
    
    function onCancel(){
        setTitle('');
        setNewCategory('');
        setText('');
        setSelect('Категория');
        setImportant(false);

        dispatch({type: 'ADD_FORM_HIDE'});
    }

    function onAdd(){
        let category;

        if (newCategoryActive === true){
            category = select;
        }
        else{
            category = newCategory;
        }
        
        axios({
            method: 'post',
            url: '/Note/AddNote',
            headers: { 'Content-Type': 'application/json' },
            data: {
                Title: title,
                Category: category,
                Important: important.toString(),
                Text: text
                
            }
        })
            .then(function (response) {
                setTitle('');
                setNewCategory('');
                setText('');
                setSelect('Категория');
                setImportant(false);

                dispatch({type: 'ADD_FORM_HIDE'});
                dispatch({type: 'TOKEN'});
            })
            .catch(function (error) {
                console.log(error);
            });
        
    }

    const soldCheckbox = ({ target: { checked } }) => {
        setImportant(checked);
    };

    function onChangeSelect(value){
        if (value === 'Новая категория'){
            setNewCategoryActive(false)
        }
        else{
            setNewCategoryActive(true)
        }
        
        setSelect(value);
    }

    return(<div className={"add-note " + state.note.addNote}>
        <h3>Новая заметка</h3>
        <div className="add-field">
            <input type="text" placeholder="Название" value={title} maxLength={16} onChange={e => setTitle(e.target.value)}/>
        </div>
        <div className="add-field">
            <Dropdown categories={categories} select={select} onChangeSelect={onChangeSelect}/>
        </div>
        <div className="add-field">
            <input type="text" placeholder="Название категории" maxLength={26} disabled={newCategoryActive} value={newCategory} onChange={e => setNewCategory(e.target.value)}/>
        </div>
        <div className="important-field">
            <label htmlFor="important-add">Важно</label>
            <input type="checkbox" name="important-add" checked={important} onChange={soldCheckbox}/>
        </div>
        <div className="add-text">
            <textarea placeholder="Тект заметки" value={text} onChange={e => setText(e.target.value)}/>
        </div>
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