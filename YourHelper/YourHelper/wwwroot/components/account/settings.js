import React, { useState, useEffect } from 'react';
import {Validation} from '../validation/validation';
import axios from 'axios';
import {Menu} from "../header/menu";
import {Notification} from "../notification/notification";


export function Settings(props) {
    
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const [errorNewPassword, setErrorNewPassword] = useState('');
    const [errorPassword, setErrorPassword] = useState('');
    const [errorConfirm, setErrorConfirm] = useState('');
    const [changeBody, setChangeBody] = useState('hide');
    const [changeButton, setChangeButton] = useState('');
    const [content, setContent] = useState('');
    const [notificationMessage, setNotificationMessage] = useState('');
    const [notification, setNotification] = useState('');
    const [email, setEmail] = useState('');

    useEffect(() => {
        
        axios({
            method: 'get',
            url: '/Account/GetEmail',
            headers: { 'Content-Type': 'application/json' },
        })
            .then(function (response) {
                setEmail(response.data.email);
            })
            .catch(function (error) {
                console.log(error);
            });

    }, [email]);

    function onPasswordChange(e) {
        if(e.target.value === " "){
            e.target.value = "";
        }
        setPassword(e.target.value);
    }

    function onNewPasswordChange(e) {
        if(e.target.value === " "){
            e.target.value = "";
        }
        setNewPassword(e.target.value);
    }

    function onPasswordConfirmChange(e) {
        if(e.target.value === " "){
            e.target.value = "";
        }
        setConfirm(e.target.value);
    }

    function CheckInputs(){
        if(password === "" || newPassword === "" || confirm === ""){
            setMessage('Поля не должны быть пустыми');
            setErrorPassword('error');
            setErrorNewPassword('error');
            setErrorConfirm('error');
            setError('error');

            return false
        }

        if(password.length < 6){
            setMessage('Пароль должен быть больше 5 символов');
            setErrorPassword('error');
            setErrorNewPassword('');
            setErrorConfirm('');
            setError('error');

            return false;
        }

        if(newPassword.length < 6){
            setMessage('Пароль должен быть больше 5 символов');
            setErrorPassword('');
            setErrorNewPassword('error');
            setErrorConfirm('');
            setError('error');

            return false;
        }

        if(confirm.length < 6){
            setMessage('Пароль должен быть больше 5 символов');
            setErrorPassword('');
            setErrorNewPassword('');
            setErrorConfirm('error');
            setError('error');

            return false;
        }

        if(newPassword !== confirm){
            setMessage('Пароли должны совпадать');
            setErrorPassword('');
            setErrorNewPassword('error');
            setErrorConfirm('error');
            setError('error');

            return false;
        }

        return true;
    }

    function ShowChangePassword(){
        setChangeButton('hide');
        setContent('active');
        setChangeBody('');
    }

    function HideChangePassword(){
        setChangeButton('');
        setContent('');
        setChangeBody('hide');
        setMessage('');
        setErrorPassword('');
        setErrorNewPassword('');
        setErrorConfirm('');
        setError('');
        setPassword('');
        setNewPassword('');
        setConfirm('');
    }

    function NotificationHide(){
        setNotification('');
        setNotificationMessage('');
    }
    
    function handleSubmit(){

        if(!CheckInputs()) {
            return;
        }

        axios({
            method: 'post',
            url: '/Account/ChangePassword',
            headers: { 'Content-Type': 'application/json' },data: {
                Password: password,
                NewPassword: newPassword
            }
        })
            .then(function (response) {
                if (response.data.type === "ok") {

                    setMessage('');
                    setErrorPassword('');
                    setErrorNewPassword('');
                    setErrorConfirm('');
                    setError('');

                    HideChangePassword();
                    
                    setNotification('active');
                    setNotificationMessage('Пароль успешно изменён');
                }
                else {
                    setMessage('Старый пароль не совпадает');
                    setErrorPassword('error');
                    setErrorNewPassword('');
                    setErrorConfirm('');
                    setError('error');
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    
    return (<div>
        <div id="head-menu">
            <Menu />
        </div>
        <form className={"settings_content " + content}>
            <div className={"account-data " + error}>
                <h2>Аккаунт: &nbsp;</h2>
                <h2 className="Email">{email}</h2>
            </div>
            <Validation message={message} />
            <div className={"button-1 change " + changeButton} onClick={ShowChangePassword}>
                <h3>Сменить пароль</h3>
            </div>
            <div className={"change_body " + changeBody}>
                <div className="data-field">
                    <input className={errorPassword} type="password" placeholder="Введите старый пароль" value={password} onChange={value => onPasswordChange(value)} />
                </div>
                <div className="data-field">
                    <input className={errorNewPassword} type="password" placeholder="Введите новый пароль" value={newPassword} onChange={value => onNewPasswordChange(value)} />
                </div>
                <div className="data-field">
                    <input className={errorConfirm} type="password" placeholder="Повторите новый пароль" value={confirm} onChange={value => onPasswordConfirmChange(value)}/>
                </div>
                <div className="buttons">
                    <div className="button-1 confirm" onClick={handleSubmit}>
                        <h3>Подтвердить</h3>
                    </div>
                    <div className="button-2 cancel" onClick={HideChangePassword}>
                        <h3>Отмена</h3>
                    </div>
                </div>
            </div>
        </form>
        <Notification message={notificationMessage} notification={notification} onHide={NotificationHide}/>
    </div>);

}