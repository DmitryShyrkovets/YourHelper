import React, { useState, useEffect, useContext } from 'react';
import {Actions, EditNoteForm, EditNoteData, Token, NotesVisible} from "../storeges/note";
import axios from 'axios';


export function Note(props){
    
    const [editNote, setEditNote] = useContext(EditNoteForm);
    const [actionVisible, setActionVisible] = useContext(Actions);
    const [editNoteData, setEditNoteData] = useContext(EditNoteData);
    const [token, setToken] = useContext(Token);
    const [notesVisible, setNotesVisible] = useContext(NotesVisible);
    
    const [note, setNote] = useState(props.note);
    const [actions, setActions] = useState('hide');

    useEffect(() => {
        setNote(props.note);
        
    }, [props.note])
    
    function onEdit(){
        setEditNote('');
        setActionVisible('hide');
        setNotesVisible('hide');

        setEditNoteData(note);
    }

    function onRemove(){
        axios({
            method: 'post',
            url: '/Note/RemoveNote',
            headers: { 'Content-Type': 'application/json' },
            data: {
                Id: note.id
            }

        })
            .then(function (response) {
                setToken(!token);
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    
    return(<div className="note" onMouseEnter={() => setActions('')} onMouseLeave={() => setActions('hide')}>
        <div className="header">
            <div className="title">
                <p>{note.title}</p>
                <div className={"important-icon " + note.important}>

                </div>
            </div>
            <div className={"actions " + actions}>
                <div className="edit-button" onClick={() => onEdit()}>
                    <div className="edit-icon">

                    </div>
                </div>
                <div className="remove-button" onClick={() => onRemove()}>
                    <div className="remove-icon">

                    </div>
                </div>
            </div>
        </div>
        <p className="category">{note.category}</p>
        <p className="note-text">{note.text}</p>
    </div>);
}

