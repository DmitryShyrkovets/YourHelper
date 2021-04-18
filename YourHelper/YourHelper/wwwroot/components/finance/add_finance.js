import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import {Dropdown} from "../ui/dropdown";
import {ReducerContext} from '../store';
import {Validation} from "../validation/validation";

export function AddFinance(props){

    const { state, dispatch } = useContext(ReducerContext);
    
    const [categories, setCategories] = useState([]);
    const [operations, setOperations] = useState([{id: '0', category: 'Приход'}, {id: '1', category: 'Расход'}]);
    const [currency, setCurrency] = useState([{id: '0', category: 'BYN'}, {id: '1', category: 'RUB'}, {id: '2', category: 'UAH'}, {id: '3', category: 'USD'}, {id: '4', category: 'EUR'}]);
    const [selectOperation, setSelectOperation] = useState('Приход');
    const [selectCategory, setSelectCategory] = useState('Категория');
    const [selectCurrency, setSelectCurrency] = useState('BYN');
    const [title, setTitle] = useState('');
    const [newCategoryActive, setNewCategoryActive] = useState(true);
    const [newCategory, setNewCategory] = useState('');
    const [dateInput, setDateInput] = useState('');
    const [money, setMoney] = useState(0);
    const [message, setMessage] = useState('');
    
    useEffect(() => {
        const categ = [...props.categories, {id: 'qwe', category: 'Новая категория'}];

        setCategories(categ);

    }, [props.categories]);

    function onCancel(){
        setSelectOperation('Приход');
        setSelectCategory('Категория');
        setSelectCurrency('BYN');
        setTitle('');
        setNewCategory('');
        setDateInput('');
        setMoney(0);
        setMessage('');
        dispatch({type: 'ADD_FORM_HIDE_FINANCE'});
    }

    function onAdd(){
        let category;

        if (newCategoryActive === true){
            category = selectCategory;
        }
        else{
            category = newCategory;
        }

        if (title === ''){
            setMessage('Поле названия пустое');
            return;
        }
        
        if (category === 'Категория' || category === ''){
            setMessage('Категория не выбрана');
            return;
        }
        
        if (dateInput === ''){
            setMessage('Дата не выбрана');
            return;
        }

        if (money === 0){
            setMessage('Сумма = 0');
            return;
        }
        
        let date = dateInput.slice(8, 10) + '.' + dateInput.slice(5, 7) + '.' + dateInput.slice(0, 4);
        
        axios({
            method: 'post',
            url: '/Finance/AddFinance',
            headers: { 'Content-Type': 'application/json' },
            data: {
                Title: title,
                Category: category,
                Date: date,
                Operation: selectOperation,
                Money: money.toString(),
                Currency: selectCurrency

            }
        })
            .then(function (response) {
                setSelectOperation('Приход');
                setSelectCategory('Категория');
                setSelectCurrency('BYN');
                setTitle('');
                setNewCategory('');
                setDateInput('');
                setMoney(0);
                setMessage('');
                dispatch({type: 'ADD_FORM_HIDE_FINANCE'});
                dispatch({type: 'TOKEN'});
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    
    function onChangeSelectCategory(value){
        if (value === 'Новая категория'){
            setNewCategoryActive(false)
        }
        else{
            setNewCategoryActive(true)
        }

        setSelectCategory(value);
    }

    function onChangeSelectOperation(value){
        setSelectOperation(value);
    }

    function onChangeCurrencySelect(value){
        setSelectCurrency(value);
    }

    function onKey(e){

        var invalidChars = [
            "-",
            "+",
            "e",
            "E"
        ];

        if (invalidChars.includes(e.key)) {
            e.preventDefault();
        }

    }

    return(<div className={"add-finance " + state.finance.addFinance}>
        <h3>Новая запись</h3>
        <div className="add-field">
            <input type="text" autoComplete="off" placeholder="Название" value={title} onChange={e => setTitle(e.target.value)}/>
        </div>
        <div className="add-field">
            <Dropdown categories={operations} select={selectOperation} onChangeSelect={onChangeSelectOperation}/>
        </div>
        <div className="add-field">
            <Dropdown categories={categories} select={selectCategory} onChangeSelect={onChangeSelectCategory}/>
        </div>
        <div className="add-field">
            <input type="text" autoComplete="off" placeholder="Название категории" disabled={newCategoryActive} value={newCategory} onChange={e => setNewCategory(e.target.value)}/>
        </div>
        <div className="add-field-date">
            <p>Дата </p>
            <input type="date" value={dateInput} onChange={e => setDateInput(e.target.value)}/>
        </div>
        <div className="add-field-sum">
            <p>Сумма </p>
            <input type="number" value={money} onKeyDown={ (event) => onKey(event)} onChange={e => setMoney(e.target.value)}/>
            <Dropdown categories={currency} select={selectCurrency} onChangeSelect={onChangeCurrencySelect}/>
        </div>
        <Validation message={message}/>
        <div className="add-buttons">
            <div className="add button" onClick={() => onAdd()}>
                <p>Добавить</p>
            </div>
            <div className="cancel button" onClick={() => onCancel()} >
                <p>Отмена</p>
            </div>
        </div>
    </div>);
}