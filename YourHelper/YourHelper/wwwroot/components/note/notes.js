import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import {Menu} from "../header/menu";
import {AddNote} from "./add_note";
import {EditNote} from "./edit_note";
import {Note} from "./note";
import {Filter} from "./filter";
import {AddNoteForm, FilterVisible, Actions, ImportantOnly, Token, NotesVisible} from "../storeges/note";
import {DatePicker} from "../ui/datepicker";
import {Sheet} from "../diary/sheet";

export function Notes(props){

    const [addNote, setAddNote] = useContext(AddNoteForm);
    const [filter, setFilter] = useContext(FilterVisible);
    const [actionVisible, setActionVisible] = useContext(Actions);
    const [notesVisible, setNotesVisible] = useContext(NotesVisible);
    const [importantOnly, setImportantOnly] = useContext(ImportantOnly);
    const [token, setToken] = useContext(Token);

    const [select, setSelect] = useState('Все');
    const [notes, setNotes] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios({
            method: 'post',
            url: '/Note/LoadNotes',
            headers: { 'Content-Type': 'application/json' },
            data: {
                Category: select,
                Important: importantOnly.toString()
            }

        })
            .then(function (response) {
                setNotes(response.data);

                axios({
                    method: 'get',
                    url: '/Note/LoadCategories',
                    headers: { 'Content-Type': 'application/json' },

                })
                    .then(function (response) {
                        setCategories(response.data);
                        setLoading(false);

                    })
                    .catch(function (error) {
                        console.log(error);
                    });

            })
            .catch(function (error) {
                console.log(error);
            });

    }, [token]);
    
    function onChangeSelect(value){
        setSelect(value);
        setToken(!token);
    }
    
    function onAdd(){
        setAddNote('');
        setActionVisible('hide');
        setNotesVisible('hide');
    }

    function onParam(){
        setFilter('');
        setActionVisible('hide')
    }

    const content = loading ? (<h2 className="loading">Подождите идёт загрузка...</h2>) : (
        <div className="content container notes">
            <div className="notes-actions">
                <div className={"add-action " + actionVisible} onClick={() => onAdd()}>
                    <div className="add-icon icon">

                    </div>
                </div>
                <div className={"param-action " + actionVisible} onClick={() => onParam()}>
                    <div className="settings-icon icon">

                    </div>
                </div>
                <Filter categories={categories} select={select} onChangeSelect={onChangeSelect}/>
            </div>
            <div className="notes-content">
                <AddNote categories={categories}/>
                <EditNote categories={categories}/>
                {notes.length < 1 &&
                <h2 className={"empty " + notesVisible}>Заметок нету</h2>
                }
                <div className={"note-list " + notesVisible}>
                    {notes.map((note) =>
                        <Note key={note.id} note={note}/>)
                    }
                </div>
            </div>
        </div>);
    
    return(<div>
        <div id="head-menu">
            <Menu />
        </div>
        {content}
    </div>);
}

