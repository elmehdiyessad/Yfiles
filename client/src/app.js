import React from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

//PAGES
import MainPage from './components/index/index'
import LoginPage from './components/login/login'
import NotFoundPage from './components/404'
import RegisterPage from './components/signup/signup'
import HomePage from './components/fileManager/home'

export default function app() {
    return (
        <div>
            <Router>
                <Switch>
                    <Route exact path="/" component={MainPage} />
                    <Route exact path="/index" component={MainPage} />
                    <Route exact path="/login" component={LoginPage} />
                    <Route exact path="/signup" component={RegisterPage} />
                    <Route exact path="/home" component={HomePage}/>
                    <Route exact path="/404" component={NotFoundPage} />
                    <Redirect to="/404" />
                </Switch>
            </Router>
        </div>
    )
}
