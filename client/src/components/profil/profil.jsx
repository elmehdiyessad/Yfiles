import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import { auth } from '../../firebase'
import { useHistory } from "react-router-dom";


export default function Profil() {

    // state
    const [name, setName] = useState("")
    
    // use History
    let history = useHistory();
    // we check if the user is already connected | if not he will be redirected at login page
    auth.onAuthStateChanged((user) => {
        if(user == null){
            history.push('/login')
        }else{
            setName(user.displayName)
        }
    })

    useEffect(() => {
        let body = document.body
        body.classList.remove('BackgroundStyle')
        
    })
    
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
            <hr />
            <h2>Welcome { name }</h2>
            <Button variant="primary" onClick={ handleLogOut }>Log out</Button>{' '}
            
        </div>
    )
}
