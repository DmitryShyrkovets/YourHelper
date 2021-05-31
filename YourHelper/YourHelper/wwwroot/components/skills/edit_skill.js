import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import {Dropdown} from "../ui/dropdown";
import {ReducerContext} from '../store';
import {Validation} from "../validation/validation";

export function EditSkill(props){
    
    const [categories, setCategories] = useState([]);
    const [select, setSelect] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [newCategory, setNewCategory] = useState('');
    const [message, setMessage] = useState('');
    const [editCategoryActive, setEditCategoryActive] = useState(true);

    const { state, dispatch } = useContext(ReducerContext);

    useEffect(() => {
        const categ = [...props.categories, {id: 'qwe', category: 'Новая категория'}];

        setCategories(categ);

        setSelect(state.skills.editSkillData.category)
        setTitle(state.skills.editSkillData.title)
        setDescription(state.skills.editSkillData.description)

    }, [props.categories, state.skills.editSkillData])

    function filter(){

        let category;

        if (editCategoryActive === true){
            category = select;
        }
        else{
            category = newCategory;
        }

        if (title === '' || title === ' '){
            setMessage('Поле названия не должно быть пустым');
            return true;
        }

        if (category === '' || category === ' '){
            setMessage('Поле не категории должно быть пустым');
            return true;
        }

        if (description === '' || description === ' '){
            setMessage('Поле текста не должно быть пустым');
            return true;
        }

        if (category === 'Категория'){
            setMessage('Категория не выбрана');
            return true;
        }

        return false;
    }

    function cleaning(){
        setSelect(state.skills.editSkillData.category)
        setTitle(state.skills.editSkillData.title)
        setDescription(state.skills.editSkillData.description)
        setNewCategory('')
        setMessage('');
    }

    function onEdit(){

        let category;

        if (editCategoryActive === true){
            category = select;
        }
        else{
            category = newCategory;
        }

        if(filter()){
            return;
        }

        axios({
            method: 'post',
            url: '/Skill/EditSkill',
            headers: { 'Content-Type': 'application/json' },
            data: {
                Id: state.skills.editSkillData.id,
                Title: title,
                Category: category,
                Description: description
            }
        })
            .then(function (response) {
                cleaning();

                dispatch({type: 'EDIT_FORM_HIDE_SKILL'});

                dispatch({type: 'TOKEN'});
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    function onCancel(){
        cleaning();

        dispatch({type: 'EDIT_FORM_HIDE_SKILL'});
    }

    function onChangeSelect(value){
        setSelect(value);
        console.log(select)
        if (value === 'Новая категория'){
            setEditCategoryActive(false)
        }
        else{
            setEditCategoryActive(true)
        }
        
    }

    function onTitleChange(value){
        value = value.replace(/\s+/g, ' ');

        setTitle(value);
    }

    function onNewCategoryChange(value){
        value = value.replace(/\s+/g, ' ');

        setNewCategory(value);
    }

    function onDescriptionChange(value){
        value = value.replace(/\s+/g, ' ');

        setDescription(value);
    }

    return(<div className={"edit-skill " + state.skills.editSkill}>
        <h3>Редактирование навыка</h3>
        <div className="edit-field">
            <input type="text" autoComplete="off" placeholder="Название" maxLength={16} value={title} onChange={e => onTitleChange(e.target.value)}/>
        </div>
        <div className="edit-field">
            <Dropdown categories={categories} select={select} onChangeSelect={onChangeSelect}/>
        </div>
        <div className="edit-field">
            <input type="text" autoComplete="off" placeholder="Название категории" maxLength={25} value={newCategory} onChange={e => onNewCategoryChange(e.target.value)} disabled={editCategoryActive}/>
        </div>
        <div className="edit-description">
            <textarea placeholder="Описание" value={description} onChange={e => onDescriptionChange(e.target.value)}/>
        </div>
        <Validation message={message}/>
        <div className="edit-buttons">
            <div className="edit button" onClick={() => onEdit()}>
                <p>Изменить</p>
            </div>
            <div className="cancel button" onClick={() => onCancel()} >
                <p>Отмена</p>
            </div>
        </div>
    </div>);
}