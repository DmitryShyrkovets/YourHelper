import React, { useState, useEffect } from 'react';
import {ProfileMenu} from './profileMenu';
import $ from 'jquery';

export function Menu(props) {
    const [active, setActive] = useState('');
    const [visible, setVisible] = useState('hide');
    
    useEffect(() => {
        ActivePage();
    });
    
    const ActivePage = () =>{
        $('.header_list a').each(function () {
            var location = window.location.href
            var link = this.href
            var result = location.match(link);

            if(result != null) {
                $(this).addClass('current');
            }
        });
    }
    
    function ShowMenu(){
        if (active === ''){
            setActive('active');
        }
        else {
            setActive('');
        }
        
    }
    
    function ProfileMenuVisible(){
        if (visible === ''){
            setVisible('hide');
        }
        else {
            setVisible('');
        }
    }
    
    return (<div className="container">
        <div className="header_body">
            <div className="header_burger_menu">
                <div className={"header_burger " + active} onClick={ShowMenu}>
                    <span></span>
                </div>
                <nav className={"header_menu " + active}>
                    <ul className="header_list">
                        <div className={'logo '} onClick={() => window.location.href = "../../"}>
                            <img src="../../images/logo.png" alt=""/>
                        </div>
                        <li className='general-ref'>
                            <a href="../../" >Главная</a>
                        </li>
                        <li>
                            <a href="../../Home/Notes" >Заметки</a>
                        </li>
                        <li>
                            <a href="../../Home/Diary" >Дневник</a>
                        </li>
                        <li>
                            <a href="../../Home/Schedules" >Распорядок</a>
                        </li>
                        <li>
                            <a href="../../Home/Targets" >Цели</a>
                        </li>
                        <li>
                            <a href="../../Home/Finances" >Финансы</a>
                        </li>
                        <li>
                            <a href="../../Home/Skills" >Навыки</a>
                        </li>
                    </ul>
                </nav>
            </div>
            <div className="header_profile" onClick={ProfileMenuVisible}>
                <h2>Профиль</h2>
            </div>
        </div>
        <ProfileMenu visible={visible}/>
    </div>);
}
