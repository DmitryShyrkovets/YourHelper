import React, { useState, useEffect } from 'react';

export function Dropdown(props){

    const [activeDropdown, setActiveDropdown] = useState('');
    const [categories, setCategories] = useState([]);
    const [select, setSelect] = useState(props.select);

    useEffect(() => {
        setCategories(props.categories);
        setSelect(props.select);
    }, [props.categories, props.select]);
    
    
    function DropDownClick(){
        if (activeDropdown === 'active'){
            setActiveDropdown('');
        }
        else{
            setActiveDropdown('active');            
        }

        //$('.add-category-menu').slideToggle(300);
    }
    
    function onChangeSelect(value){
        props.onChangeSelect(value);
    }

    return(<div className={"dropdown " + activeDropdown} onClick={DropDownClick}>
        <div className="select">
            <span>{select}</span>
            <i className="fa fa-chevron-left"></i>
        </div>
        <ul className="dropdown-menu add-category-menu">
            {categories.map((li) =>
                <li key={li.id} onClick={() => onChangeSelect(li.category)}>{li.category}</li>)
            }
        </ul>
    </div>);
}