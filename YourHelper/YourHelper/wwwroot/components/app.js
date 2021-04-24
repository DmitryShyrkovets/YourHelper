import React from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {Login} from './account/login';
import {Register} from './account/register';
import {Recovery} from './account/recovery';
import {Settings} from './account/settings';
import {Diary} from './diary/diary';
import {Notes} from './note/notes';
import {Schedules} from './schedule/schedules';
import {Targets} from "./target/targets";
import {Finances} from "./finance/finances";
import {Skills} from "./skills/skills";
import {Statistic} from "./statistic/statistic";
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
                        <Route strict path="/Home/Diary" component={Diary} />
                        <Route strict path="/Home/Notes" component={Notes} />
                        <Route strict path="/Home/Schedules" component={Schedules} />
                        <Route strict path="/Home/Targets" component={Targets} />
                        <Route strict path="/Home/Finances" component={Finances} />
                        <Route strict path="/Home/Skills" component={Skills} />
                        <Route strict path="/Home/Statistic" component={Statistic} />
                        <Route strict path="/" component={Notes} />
                    </Switch>
                </Store>
            </Router>
        );
    }
};