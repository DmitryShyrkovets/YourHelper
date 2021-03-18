import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import {Menu} from "../header/menu";

export function Note(props){
    
    return(<div>
        <div id="head-menu">
            <Menu />
        </div>
        <div className="content container note">
            <div className="note-actions">
                <div className="add-action">
                    <div className="">
                        
                    </div>
                </div>
                <div className="param-action">
                    <div>
                        
                    </div>
                </div>
            </div>
        </div>
    </div>);
}

