import React, { useEffect } from 'react'
import { Button } from 'react-bootstrap'
import { auth } from '../../firebase'
import { useHistory } from "react-router-dom";

export default function Profil() {

    useEffect(() => {
        let body = document.body
        body.classList.remove('BackgroundStyle')

        auth.onAuthStateChanged((user) => {
            if(user == null){
                history.push('/login')
            }
        })
    })
    
    // use History
    let history = useHistory();

    // handle Log Out
    function handleLogOut(e){
        e.preventDefault();
        auth.signOut()
        .then(() => {
            history.push('/login')
        })
        .catch(error => {
            console.log("ERROR", error.message)
        })
    }

    return (
        <div>
            <h1>Profil</h1>
            <Button variant="primary" onClick={ handleLogOut }>Log out</Button>{' '}
            
        </div>
    )
}
