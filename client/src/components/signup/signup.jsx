import React, { useEffect } from 'react'
import SignupForm from './signupForm';
import { auth } from '../../firebase'
import { useHistory } from "react-router-dom";
import '../../css/global.css';
import '../../css/signup.css';


function Signup() {

    // use History | redirect user to profil page if he is login
    let history = useHistory()

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
        <div className="row">
        <div className="col-md-4"></div>{/*  */}

            <div className="col-md-4">

                <SignupForm />
                
            </div>

        <div className="col-md-4"></div>{/*  */}
        </div>{/* FIN ROW */}
        </div>{/* FIN CONTAINER */}
    </div>
    )
}


export default Signup