import React from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

//PAGES
import MainPage from './components/index/index';
import LoginPage from './components/login/login';
import NotFoundPage from './components/404';
import RegisterPage from './components/signup/signup';
import ProfilPage from './components/profil/profil';
import Home from './components/FileManager/Home';

export default function app() {
    return (
        <div>
            <Router>
                <Switch>
                    <Route exact path="/" component={MainPage} />
                    <Route path="/login" component={LoginPage} />
                    <Route path="/signup" component={RegisterPage} />
                    <Route path="/home"  component={Home}/>
                    <Route path="/profil" component={ProfilPage} />
                    <Route path="/404" component={NotFoundPage} />
                    <Redirect to="/404" />
                </Switch>
            </Router>
        </div>
    )
}
