
const { useState, useEffect } = React

function Sheet(props) {
    const [diary, setDiary] = useState([]);
    
    useEffect(() => {
        setDiary(props.diary)
    });
    
    return (
        <div className="sheet">
            {diary.map((entry) =>
            <Entry key={entry.id} entry={entry} onRemove={entry => props.onRemove(entry)} onEdit={entry => props.onEdit(entry)}/>)}
        </div>
    );
}