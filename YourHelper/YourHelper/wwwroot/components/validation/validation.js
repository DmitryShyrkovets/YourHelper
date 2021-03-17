import React, { useState, useEffect } from 'react';

export function Validation(props) {
    const [message, setMessage] = useState('');

    useEffect(() => {
        setMessage(props.message);
    });
    
    return (
        <div className="validation">{message}</div>
    );
}