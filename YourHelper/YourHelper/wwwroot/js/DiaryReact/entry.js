
const { useState, useEffect } = React

function Entry(props) {
    const [active, setActive] = useState('');
    const [entry, setEntry] = useState(props.entry);

    useEffect(() => {

    });

    function onRemove(){
        props.onRemove(entry);
    }

    function onEdit(){
        props.onEdit(entry);
    }
    
    return (
        <div className={"entry " + active} onMouseEnter={() => setActive('active')} onMouseLeave={() => setActive('')}>
            <div className="entry-head ">
                <p>{entry.dateTime.substr(10, 6)}</p>
                <div className="actions">
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
        </div>
    );
}