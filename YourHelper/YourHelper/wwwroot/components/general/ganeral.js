import React, { useState, useEffect, useContext } from 'react';
import {ReducerContext} from '../store';
import axios from "axios";
import {Notification} from "../notification/notification";

export function General (props){

    const { state, dispatch } = useContext(ReducerContext);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    
    const CheckValidation = () => {
        let pattern  = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if(!pattern .test(email)){
            dispatch({type: 'SHOW_NOTIFICATION', message: 'Почта введена некорректно'});
            return false;
        }

        if(name === '' || email === '' || title === '' || text === ''){
            dispatch({type: 'SHOW_NOTIFICATION', message: 'Не все поля заполнены'});
            return false;
        }
        
        return true;
    }
    
    const Clear = () => {
        setName('');
        setEmail('');
        setTitle('');
        setText('');
    }
    
    const SendMassage = () => {
        
        if(!CheckValidation()){
            return;
        }
        
        axios({
            method: 'post',
            url: '/General/Massage',
            headers: { 'Content-Type': 'application/json' },
            data: {
                email: email,
                text: text,
                title: title,
                name: name
            }
        })
            .then(function (response) {
                dispatch({type: 'SHOW_NOTIFICATION', message: 'Письмо успешно отправлено'});
                Clear();
            })
            .catch(function (error) {
                dispatch({type: 'SHOW_NOTIFICATION', message: 'Произошла какая-то ошибка'});
                console.log(error.response.data);
            });
    }

    return (
        <div className='general'>
            <Notification />
            <div className='start-block'>
                <h1>Добро пожаловать</h1>
                <div className='img'>
                    <img src="../../images/general-start-img.png" alt="general img"/>
                </div>
                <p>Улучши свою жизнь вместе с нами</p>
                <button onClick={() => window.location.href = "./Home/Notes"}>Начать использовать</button>
            </div>
            <div className='info-blocks'>
                <div className='up-info'>
                    <div className='info-block'>
                        <div className='info-img'>
                            <img src="../../images/notes.png" alt="notes"/>
                        </div>
                        <p>Создавайте свои заметки</p>
                    </div>
                    <div className='info-block'>
                        <div className='info-img'>
                            <img src="../../images/diary.png" alt="diary"/>
                        </div>
                        <p>Ведите свой дневник</p>
                    </div>
                    <div className='info-block'>
                        <div className='info-img'>
                            <img src="../../images/schedules.png" alt="schedules"/>
                        </div>
                        <p>Планируйте свой день</p>
                    </div>
                    <div className='info-block'>
                        <div className='info-img'>
                            <img src="../../images/statistic.png" alt="schedules"/>
                        </div>
                        <p>Получайте статистику использования</p>
                    </div>
                </div>
                <div className='down-info'>
                    <div className='info-block'>
                        <div className='info-img'>
                            <img src="../../images/finances.png" alt="finances"/>
                        </div>
                        <p>Контролируйте свои финансы</p>
                    </div>
                    <div className='info-block'>
                        <div className='info-img'>
                            <img src="../../images/targets.png" alt="targets"/>
                        </div>
                        <p>Достигайте поставленных целей</p>
                    </div>
                    <div className='info-block'>
                        <div className='info-img'>
                            <img src="../../images/skills.png" alt="skills"/>
                        </div>
                        <p>Изучайте новые навыки</p>
                    </div>
                    <div className='info-block'>
                        <div className='info-img'>
                            <img src="../../images/search.png" alt="schedules"/>
                        </div>
                        <p>Быстрее находите информацию</p>
                    </div>
                </div>
            </div>
            <div className='description'>
                <h2>Описание</h2>
                <p>
                    Используйте наш сайт для лучшего управления своими делами. 
                    Улучшайте свою продуктивность за счёт распорядка и заметок.
                    Отслеживайте свои мысли и состояние при помощи нашего личного дневника.
                    Учитесь контролировать свои финансы при помощи наших инструментов.
                    Достигайте как долгосрочных так и краткосрочных целей, а так же изучайте новое вместе с нами.
                </p>
                <p>
                    Мы гарантируем вам простоту использования, своевременные оповещения, 
                    сбор и предоставление статистики,
                    удобный поиск и ждём от вас положительных эмоций.
                </p>
            </div>
            <div className='feedback-form'>
                <div className='form-content'>
                    <h2>Связь с нами</h2>
                    <div className='form-field'>
                        <input type="text" placeholder='Ваш имя' value={name} onChange={e => setName(e.target.value)}/>
                    </div>
                    <div className='form-field'>
                        <input type="text" placeholder='Ваша почта' value={email} onChange={e => setEmail(e.target.value)}/>
                    </div>
                    <div className='form-field'>
                        <input type="text" placeholder='Тема' value={title} onChange={e => setTitle(e.target.value)}/>
                    </div>
                    <textarea placeholder='Напишите ваше сообщение' value={text} onChange={e => setText(e.target.value)}/>
                    <div>
                        <button on onClick={SendMassage}>Отправить</button>
                    </div>
                </div>
            </div>
        </div>
    );
}