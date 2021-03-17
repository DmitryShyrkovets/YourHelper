import React, { useState, useEffect } from 'react';
import {Validation} from '../validation/validation.js';
import axios from 'axios';

export function Register(props) {
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const [errorEmail, setErrorEmail] = useState('');
    const [errorPassword, setErrorPassword] = useState('');
    const [errorConfirm, setErrorConfirm] = useState('');

    function onEmailChange(e) {
        if(e.target.value === " "){
            e.target.value = "";
        }

        setEmail(e.target.value);
    }

    function onPasswordChange(e) {
        if(e.target.value === " "){
            e.target.value = "";
        }

        setPassword(e.target.value);
    }

    function onPasswordConfirmChange(e) {
        if(e.target.value === " "){
            e.target.value = "";
        }

        setConfirm(e.target.value);
    }

    function CheckInputs(){
        let pattern  = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if(email === "" || password === "" || confirm === ""){
            setMessage('Поля не должны быть пустыми');
            setErrorEmail('error');
            setErrorPassword('error');
            setErrorConfirm('error');
            setError('error');

            return false;
        }

        if(!pattern .test(email)){
            setMessage('Почта введена неправильно');
            setErrorEmail('error');
            setErrorPassword('');
            setErrorConfirm('');
            setError('error');

            return false;
        }


        if(password.length < 6){
            setMessage('Пароль должен быть не меньше 6 символов');
            setErrorEmail('');
            setErrorPassword('error');
            setErrorConfirm('');
            setError('error');

            return false;
        }

        if(password !== confirm){
            setMessage('Пароли должны совпадать');
            setErrorEmail('');
            setErrorPassword('error');
            setErrorConfirm('error');
            setError('error');

            return false;
        }

        return true;
    }

    function handleSubmit(e) {
        e.preventDefault();

        if(!CheckInputs()) {
            return;
        }

        axios({
            method: 'post',
            url: '/Account/Register',
            headers: { 'Content-Type': 'application/json' },
            data: {
                Email: email,
                Password: password
            }
        })
            .then(function (response) {

                if (response.data.type === "ok") {
                    window.location.href =  response.data.redirectToUrl;
                }
                else {
                    setMessage(response.data.error);
                    setErrorEmail('error');
                    setErrorPassword('error');
                    setErrorConfirm('error');
                    setError('error');

                    return false;
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    return (<form className="register-form" onSubmit={e => handleSubmit(e)}>
        <div className="back" onClick={() => window.location.href = "../"}>
            <i className="arrow left"></i>
        </div>
        <h1 className={error}>Регистрация</h1>
        <Validation message={message} />
        <div>
            <div className="data-field">
                <input className={errorEmail} type="text" placeholder="Введите почту" value={email} onChange={value => onEmailChange(value)} />
            </div>
            <div className="data-field">
                <input className={errorPassword} type="password" placeholder="Введите пароль" value={password} onChange={value => onPasswordChange(value)} />
            </div>
            <div className="data-field">
                <input className={errorConfirm} type="password" placeholder="Повторите пароль" value={confirm} onChange={value => onPasswordConfirmChange(value)}/>
            </div>
            <div className="register-button">
                <input type="submit" value="Создать" />
            </div>
        </div>
    </form>);
}