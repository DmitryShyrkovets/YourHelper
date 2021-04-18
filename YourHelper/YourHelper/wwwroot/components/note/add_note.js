import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import {Dropdown} from "../ui/dropdown";
import {ReducerContext} from '../store';
import {Validation} from "../validation/validation";

export function AddNote(props){

    const { state, dispatch } = useContext(ReducerContext);
    
    const [title, setTitle] = useState('');
    const [newCategory, setNewCategory] = useState('');
    const [text, setText] = useState('');
    const [important, setImportant] = useState(false);
    const [categories, setCategories] = useState([]);
    const [select, setSelect] = useState('Категория');
    const [message, setMessage] = useState('');
    const [newCategoryActive, setNewCategoryActive] = useState(true)

    useEffect(() => {
        const categ = [...props.categories, {id: 'qwe', category: 'Новая категория'}];

        setCategories(categ);

    }, [props.categories]);
    
    function onCancel(){
        setTitle('');
        setMessage('');
        setNewCategory('');
        setText('');
        setSelect('Категория');
        setImportant(false);

        dispatch({type: 'ADD_FORM_HIDE_NOTE'});
    }

    function onAdd(){
        let category;

        if (newCategoryActive === true){
            category = select;
        }
        else{
            category = newCategory;
        }
        
        if (title === ''){
            setMessage('Поле названия не должно быть пустым');
            return;
        }
        
        if (category === ''){
            setMessage('Поле не категории должно быть пустым');
            return;
        }
        
        if (text === ''){
            setMessage('Поле текста не должно быть пустым');
            return;
        }
        
        if (category === 'Категория'){
            setMessage('Категория не выбрана');
            return;
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
                setMessage('');
                setTitle('');
                setNewCategory('');
                setText('');
                setSelect('Категория');
                setImportant(false);

                dispatch({type: 'ADD_FORM_HIDE_NOTE'});
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
            <input type="text" autoComplete="off" placeholder="Название" value={title} maxLength={16} onChange={e => setTitle(e.target.value)}/>
        </div>
        <div className="add-field">
            <Dropdown categories={categories} select={select} onChangeSelect={onChangeSelect}/>
        </div>
        <div className="add-field">
            <input type="text" autoComplete="off" placeholder="Название категории" maxLength={26} disabled={newCategoryActive} value={newCategory} onChange={e => setNewCategory(e.target.value)}/>
        </div>
        <div className="important-field">
            <label htmlFor="important-add">Важно</label>
            <input type="checkbox" name="important-add" checked={important} onChange={soldCheckbox}/>
        </div>
        <div className="add-text">
            <textarea placeholder="Тект заметки" value={text} onChange={e => setText(e.target.value)}/>
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