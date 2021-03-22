import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import {Dropdown} from "../ui/dropdown";
import {EditNoteForm, Actions, EditNoteData, Token, NotesVisible} from "../storeges/note";

export function EditNote(props){
    
    const [editNote, setEditNote] = useContext(EditNoteForm);
    const [actionVisible, setActionVisible] = useContext(Actions);
    const [editNoteData, setEditNoteData] = useContext(EditNoteData);
    const [notesVisible, setNotesVisible] = useContext(NotesVisible);
    const [token, setToken] = useContext(Token);
    
    const [categories, setCategories] = useState([]);
    const [select, setSelect] = useState('');
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const [newCategory, setNewCategory] = useState('');
    const [important, setImportant] = useState(false);
    const [editCategoryActive, setEditCategoryActive] = useState(true);


    useEffect(() => {
        const categ = [...props.categories, {id: 'qwe', category: 'Новая категория'}];

        setCategories(categ);

        setSelect(editNoteData.category)
        setTitle(editNoteData.title)
        setText(editNoteData.text)
        
        if(editNoteData.important === "true"){
            setImportant(true);
        }
        else{
            setImportant(false);
        }

    }, [props.categories, editNoteData])

    function onEdit(){

        let category;

        if (editCategoryActive === true){
            category = select;
        }
        else{
            category = newCategory;
        }

        axios({
            method: 'post',
            url: '/Note/EditNote',
            headers: { 'Content-Type': 'application/json' },
            data: {
                Id: editNoteData.id,
                Title: title,
                Category: category,
                Important: important.toString(),
                Text: text
            }
        })
            .then(function (response) {
                setSelect('');
                setTitle('');
                setText('');
                setImportant(false);


                setEditNote('hide');
                setActionVisible('');
                setNotesVisible('');

                setToken(!token);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    function onCancel(){
        setSelect(editNoteData.category)
        setTitle(editNoteData.title)
        setText(editNoteData.text)

        if(editNoteData.important === "true"){
            setImportant(true);
        }
        else{
            setImportant(false);
        }
        
        setEditNote('hide');
        setActionVisible('');
        setNotesVisible('');
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

    return(<div className={"edit-note " + editNote}>
        <h3>Редактирование заметки</h3>
        <div className="edit-field">
            <input type="text" placeholder="Название" maxLength={16} value={title} onChange={e => setTitle(e.target.value)}/>
        </div>
        <div className="edit-field">
            <Dropdown categories={categories} select={select} onChangeSelect={onChangeSelect}/>
        </div>
        <div className="edit-field">
            <input type="text" placeholder="Название категории" maxLength={26} value={newCategory} onChange={e => setNewCategory(e.target.value)} disabled={editCategoryActive}/>
        </div>
        <div className="important-field">
            <label htmlFor="important">Важно</label>
            <input type="checkbox" name="important" checked={important} onChange={soldCheckbox}/>
        </div>
        <div className="edit-text">
            <textarea placeholder="Тект заметки" value={text} onChange={e => setText(e.target.value)}/>
        </div>
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