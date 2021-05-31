import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import {Dropdown} from "../ui/dropdown";
import {ReducerContext} from '../store';
import {Validation} from "../validation/validation";

export function EditNote(props){
    
    const [categories, setCategories] = useState([]);
    const [select, setSelect] = useState('');
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const [newCategory, setNewCategory] = useState('');
    const [message, setMessage] = useState('');
    const [important, setImportant] = useState(false);
    const [editCategoryActive, setEditCategoryActive] = useState(true);

    const { state, dispatch } = useContext(ReducerContext);

    useEffect(() => {
        const categ = [...props.categories, {id: 'qwe', category: 'Новая категория'}];

        setCategories(categ);

        setSelect(state.note.editNoteData.category)
        setTitle(state.note.editNoteData.title)
        setText(state.note.editNoteData.text)
        
        if(state.note.editNoteData.important === "true"){
            setImportant(true);
        }
        else{
            setImportant(false);
        }

    }, [props.categories, state.note.editNoteData])

    function filter(){

        let category;

        if (editCategoryActive === true){
            category = select;
        }
        else{
            category = newCategory;
        }

        if (title === '' || title === ' '){
            setMessage('Поле названия не должно быть пустым');
            return true;
        }

        if (category === '' || category === ' '){
            setMessage('Поле не категории должно быть пустым');
            return true;
        }

        if (text === '' || text === ' '){
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
        setSelect(state.note.editNoteData.category)
        setTitle(state.note.editNoteData.title)
        setText(state.note.editNoteData.text)
        setMessage('');

        if(state.note.editNoteData.important === "true"){
            setImportant(true);
        }
        else{
            setImportant(false);
        }
    }

    function onEdit(){

        let category;

        if (editCategoryActive === true){
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
            url: '/Note/EditNote',
            headers: { 'Content-Type': 'application/json' },
            data: {
                Id: state.note.editNoteData.id,
                Title: title,
                Category: category,
                Important: important.toString(),
                Text: text
            }
        })
            .then(function (response) {
                cleaning();

                dispatch({type: 'EDIT_FORM_HIDE_NOTE'});

                dispatch({type: 'TOKEN'});
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    function onCancel(){
        cleaning();

        dispatch({type: 'EDIT_FORM_HIDE_NOTE'});
    }

    function onChangeSelect(value){
        setSelect(value);
        console.log(select)
        if (value === 'Новая категория'){
            setEditCategoryActive(false)
        }
        else{
            setEditCategoryActive(true)
        }
        
    }

    const soldCheckbox = ({ target: { checked } }) => {
        setImportant(checked);
    };

    function onTitleChange(value){
        value = value.replace(/\s+/g, ' ');

        setTitle(value);
    }

    function onNewCategoryChange(value){
        value = value.replace(/\s+/g, ' ');

        setNewCategory(value);
    }

    function onTextChange(value){
        value = value.replace(/\s+/g, ' ');

        setText(value);
    }

    return(<div className={"edit-note " + state.note.editNote}>
        <h3>Редактирование заметки</h3>
        <div className="edit-field">
            <input type="text" autoComplete="off" placeholder="Название" maxLength={16} value={title} onChange={e => onTitleChange(e.target.value)}/>
        </div>
        <div className="edit-field">
            <Dropdown categories={categories} select={select} onChangeSelect={onChangeSelect}/>
        </div>
        <div className="edit-field">
            <input type="text" autoComplete="off" placeholder="Название категории" maxLength={25} value={newCategory} onChange={e => onNewCategoryChange(e.target.value)} disabled={editCategoryActive}/>
        </div>
        <div className="important-field">
            <label htmlFor="important">Важно</label>
            <input type="checkbox" name="important" checked={important} onChange={soldCheckbox}/>
        </div>
        <div className="edit-text">
            <textarea placeholder="Тект заметки" value={text} onChange={e => onTextChange(e.target.value)}/>
        </div>
        <Validation message={message}/>
        <div className="edit-buttons">
            <div className="edit button" onClick={() => onEdit()}>
                <p>Изменить</p>
            </div>
            <div className="cancel button" onClick={() => onCancel()} >
                <p>Отмена</p>
            </div>
        </div>
    </div>);
}