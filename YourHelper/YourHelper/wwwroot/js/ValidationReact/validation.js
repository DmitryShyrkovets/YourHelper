
const { useState, useEffect } = React

function Validation(props) {
    const [message, setMessage] = useState('');

    useEffect(() => {
        setMessage(props.message);
    });
    
    return (
        <div className="validation">{message}</div>
    );
}