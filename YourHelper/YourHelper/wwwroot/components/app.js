import React from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {Login} from './account/login';
import {Register} from './account/register';
import {Recovery} from './account/recovery';
import {Settings} from './account/settings';
import {General} from './general/general';
import {Diary} from './diary/diary';
import {Notes} from './note/notes';
import {Schedules} from './schedule/schedules';
import Store from './store';

export default class App extends React.Component {
    render() {
        return (
            <Router>
                <Store>
                    <Switch>
                        <Route strict path="/Account/Login" component={Login} />
                        <Route strict path="/Account/Register" component={Register} />
                        <Route strict path="/Account/Recovery" component={Recovery} />
                        <Route strict path="/Account/Settings" component={Settings} />
                        <Route strict path="/Home/Index" component={General} />
                        <Route strict path="/Home/Diary" component={Diary} />
                        <Route strict path="/Home/Note" component={Notes} />
                        <Route strict path="/Home/Schedule" component={Schedules} />
                        <Route strict path="/" component={General} />
                    </Switch>
                </Store>
            </Router>
        );
    }
};