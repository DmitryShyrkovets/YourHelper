import React, { useState, useEffect } from 'react';

export function Entry(props) {
    const [active, setActive] = useState('');
    const [entry, setEntry] = useState(props.entry);

    function onRemove(){
        props.onRemove(entry);
    }

    function onEdit(){
        props.onEdit(entry);
    }

    const onVoice = () =>{
        window.speechSynthesis.cancel();

        const utterance = new SpeechSynthesisUtterance(
            'Время: ' + entry.dateTime.substr(10, 6)
            + '. Текст: ' + entry.text);
        utterance.pitch = 1.2;  // пониже
        utterance.rate = 0.9;   // побыстрее
        utterance.volume = 1; // потише
        window.speechSynthesis.speak(utterance);
    }
    
    return (
        <div className={"entry " + active} onMouseEnter={() => setActive('active')} onMouseLeave={() => setActive('')}>
            <div className="entry-head ">
                <p>{entry.dateTime.substr(10, 6)}</p>
                <div className="actions">
                    <div className="voice-button" onClick={() => onVoice()}>
                        <div className="voice-icon">

                        </div>
                    </div>
                    <div className="edit button " onClick={onEdit}>
                        <div className="edit-icon"></div>
                    </div>
                    <div className="delete button " onClick={onRemove}>
                        <div className="delete-icon"></div>
                    </div>
                </div>
            </div>
            <div className="entry-body">
                <p>{entry.text}</p>
            </div>
            <hr/>
        </div>
    );
}