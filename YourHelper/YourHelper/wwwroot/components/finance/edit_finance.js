import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import {Dropdown} from "../ui/dropdown";
import {ReducerContext} from '../store';
import {Validation} from "../validation/validation";

export function EditFinance(props){

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
    const [id, setId] = useState('');
    const [message, setMessage] = useState('');


    useEffect(() => {
        const categ = [...props.categories, {id: 'qwe', category: 'Новая категория'}];

        setCategories(categ);

        setSelectOperation(state.finance.editFinanceData.operation);
        setSelectCategory(state.finance.editFinanceData.category);
        setSelectCurrency(state.finance.editFinanceData.currency);
        setTitle(state.finance.editFinanceData.title);
        setDateInput(state.finance.date);
        setId(state.finance.editFinanceData.id);
        setMoney(state.finance.money);

    }, [props.categories, state.finance.editFinanceData]);

    function onCancel(){
        setSelectOperation(state.finance.editFinanceData.operation);
        setSelectCategory(state.finance.editFinanceData.category);
        setSelectCurrency(state.finance.editFinanceData.currency);
        setTitle(state.finance.editFinanceData.title);
        setDateInput(state.finance.date);
        setId(state.finance.editFinanceData.id);
        setMoney(state.finance.money);
        setMessage('');
        
        dispatch({type: 'EDIT_FORM_HIDE_FINANCE'});
    }

    function onEdit(){
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
            url: '/Finance/EditFinance',
            headers: { 'Content-Type': 'application/json' },
            data: {
                Id: id,
                Title: title,
                Category: category,
                Date: date,
                Operation: selectOperation,
                Money: money.toString(),
                Currency: selectCurrency

            }
        })
            .then(function (response) {
                setSelectOperation(state.finance.editFinanceData.operation);
                setSelectCategory(state.finance.editFinanceData.category);
                setSelectCurrency(state.finance.editFinanceData.currency);
                setTitle(state.finance.editFinanceData.title);
                setDateInput(state.finance.date);
                setId(state.finance.editFinanceData.id);
                setMoney(state.finance.money);
                setMessage('');

                dispatch({type: 'EDIT_FORM_HIDE_FINANCE'});
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

    return(<div className={"edit-finance " + state.finance.editFinance}>
        <h3>Редактирование записи</h3>
        <div className="edit-field">
            <input type="text" autoComplete="off" placeholder="Название" value={title} onChange={e => setTitle(e.target.value)}/>
        </div>
        <div className="edit-field">
            <Dropdown categories={operations} select={selectOperation} onChangeSelect={onChangeSelectOperation}/>
        </div>
        <div className="edit-field">
            <Dropdown categories={categories} select={selectCategory} onChangeSelect={onChangeSelectCategory}/>
        </div>
        <div className="edit-field">
            <input type="text" autoComplete="off" placeholder="Название категории" disabled={newCategoryActive} value={newCategory} onChange={e => setNewCategory(e.target.value)}/>
        </div>
        <div className="edit-field-date">
            <p>Дата </p>
            <input type="date" value={dateInput} onChange={e => setDateInput(e.target.value)}/>
        </div>
        <div className="edit-field-sum">
            <p>Сумма </p>
            <input type="number" value={money} onKeyDown={event => onKey(event)} onChange={e => setMoney(e.target.value)}/>
            <Dropdown categories={currency} select={selectCurrency} onChangeSelect={onChangeCurrencySelect}/>
        </div>
        <Validation message={message}/>
        <div className="edit-buttons">
            <div className="add button" onClick={() => onEdit()}>
                <p>Изменить</p>
            </div>
            <div className="cancel button" onClick={() => onCancel()} >
                <p>Отмена</p>
            </div>
        </div>
    </div>);
}