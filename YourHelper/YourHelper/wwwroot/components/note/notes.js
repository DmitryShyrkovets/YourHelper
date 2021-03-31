import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import {Menu} from "../header/menu";
import {AddNote} from "./add_note";
import {EditNote} from "./edit_note";
import {Note} from "./note";
import {Filter} from "./filter";
import {ReducerContext} from '../store';

export function Notes(props){

    const { state, dispatch } = useContext(ReducerContext);

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
                Important: state.note.importantOnly.toString()
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

    }, [state.note.token]);
    
    function onChangeSelect(value){
        setSelect(value);
        dispatch({type: 'TOKEN'});
    }
    
    function onAdd(){
        dispatch({type: 'ADD_FORM_SHOW'});
    }

    function onParam(){
        dispatch({type: 'PARAM_FORM_SHOW'});
    }

    const content = loading ? (<h2 className="loading">Подождите идёт загрузка...</h2>) : (
        <div className="content container notes">
            <div className="notes-actions">
                <div className={"add-action " + state.note.actionVisible} onClick={() => onAdd()}>
                    <div className="add-icon icon">

                    </div>
                </div>
                <div className={"param-action " + state.note.actionVisible} onClick={() => onParam()}>
                    <div className="settings-icon icon">

                    </div>
                </div>
                <Filter categories={categories} select={select} onChangeSelect={onChangeSelect}/>
            </div>
            <div className="notes-content">
                <AddNote categories={categories}/>
                <EditNote categories={categories}/>
                {notes.length < 1 &&
                <h2 className={"empty " + state.note.notesVisible}>Заметок нету</h2>
                }
                <div className={"note-list " + state.note.notesVisible}>
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

