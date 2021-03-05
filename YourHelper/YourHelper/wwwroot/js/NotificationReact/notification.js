
const { useState, useEffect } = React

function Notification(props) {
    const [message, setMessage] = useState('');
    const [notification, setNotification] = useState('');

    useEffect(() => {
        setMessage(props.message);
        setNotification(props.notification);
    });
    
    function Hide(){
        setMessage('');
        setNotification('');
        props.onHide();
    }

    return (
        <div className={"notification " + notification}>
            <div className="notification_content">
                <div className="header">
                    <h2>Уведомление</h2>
                    <div className="close" onClick={Hide}>
                        <h4>&#10006;</h4>
                    </div>
                </div>
                <h3 className="body">{message}</h3>
            </div> 
        </div>
    );
}