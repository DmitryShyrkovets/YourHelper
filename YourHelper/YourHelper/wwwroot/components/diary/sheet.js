import React, { useState, useEffect } from 'react';
import {Entry} from './entry';


export function Sheet(props) {
    const [diary, setDiary] = useState([]);
    
    useEffect(() => {
        setDiary(props.diary)
    }, [props.diary]);
    return (
        <div className="sheet">
            {diary.map((entry) =>
                <Entry key={entry.id} entry={entry} onRemove={entry => props.onRemove(entry)} onEdit={entry => props.onEdit(entry)}/>)
            }
            {diary.length < 1 &&
            <h2 className="empty">Записей нету</h2>
            }
        </div>
    );
}