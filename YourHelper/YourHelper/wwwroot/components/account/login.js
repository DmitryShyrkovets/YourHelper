import React, { useState, useEffect } from 'react';
import {Validation} from '../validation/validation.js';
import axios from 'axios';
import { Link } from 'react-router-dom';

export function Login(props) {
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorEmail, setErrorEmail] = useState('');
    const [errorPassword, setErrorPassword] = useState('');

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

    function CheckInputs(){
        let pattern  = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if(email === "" || password === ""){
            setMessage('Поля не должны быть пустыми');
            setErrorEmail('error');
            setErrorPassword('error');
            setError('error');

            return false;
        }

        if(!pattern .test(email)){
            setMessage('Почта введена неправильно');
            setErrorEmail('error');
            setErrorPassword('');
            setError('error');

            return false;
        }

        if(password.length < 6){
            setMessage('Пароль должен быть не меньше 6 символов');
            setErrorEmail('');
            setErrorPassword('error');
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
            url: '/Account/Login',
            headers: { 'Content-Type': 'application/json' },
            data: {
                Email: email,
                Password: password
            }
        })
            .then(function (response) {
                if (response.data.type === "ok") {
                    window.location.href =  response.data.redirectToUrl;
                    console.log('ok')
                }
                else {
                    setMessage(response.data.error);
                    setErrorEmail('error');
                    setErrorPassword('error');
                    setError('error');
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    
    return (<form className="login-form" onSubmit={e => handleSubmit(e)}>
        <h1 className={error}>Авторизация</h1>

        <Validation message={message} />
        
        <div className="data-field">
            <input className={errorEmail} autoComplete="off" type="text" placeholder="Введите почту" value={email} onChange={value => onEmailChange(value)} />
        </div>
        <div className="data-field">
            <input className={errorPassword} autoComplete="off" type="password" placeholder="Введите пароль" value={password} onChange={value => onPasswordChange(value)} />
        </div>
        <div className="link-area">
            <a href="../Account/Recovery" className="recovery-link">Забыли данные?</a>
        </div>
        <div className="login-button">
            <input type="submit" value="Войти" />
        </div>
        <div className="link-area">
            <a className="register-link" href="../Account/Register">создать аккаунт</a>
        </div>
    </form>)
}
