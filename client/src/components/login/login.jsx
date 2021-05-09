import React, { useEffect } from 'react'
import { auth } from '../../firebase'
import LoginForm from './loginForm'
import { useHistory } from "react-router-dom";
import '../../css/global.css';
import '../../css/login.css';

export default function Signin() {

    // use History | redirect user to profil page if he is login
    let history = useHistory();


    useEffect(() => {
        let body = document.body
        body.classList.add('BackgroundStyle')
        auth.onAuthStateChanged((user) => {
            if(user){
                history.push('/profil')
            }
        })
    })

    return (
        <div id="container">                      
        <div className="container">
        <div className="row mt-5">
        <div className="col-md-4"></div>{/* */}

            <div id="formulaire" className="col-md-4">
                <LoginForm />
            </div>

        <div className="col-md-4"></div>{/* */}
        </div>{/* FIN ROW */}
        </div>{/* FIN CONTAINER */}
    </div>
    )
}
