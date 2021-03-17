import React, { useState, useEffect } from 'react';
import {Menu} from '../header/menu';

export function General(props) {

    return (<div>
        <div id="head-menu">
            <Menu />
        </div>
        <div className="content container general">
            <h1>Главная дневника</h1>
        </div>
    </div>)
}
