import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import { auth } from '../../firebase'
import { useHistory } from 'react-router-dom'
import PasswordForm from './password-form'
import Sidebar from './sidebar'
import UserInfos from './userInfos'
import '../../css/media.css'
import '../../css/profil.css'

export default function Profil() {

    // state
    const [uid, setUid] = useState("")
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [photoUrl, setPhotoUrl] = useState("")
    const [emailVerified, setEmailVerified] = useState("")

    const [url, setUrl] = useState("informations")


    useEffect(() => {
        let body = document.body
        body.classList.remove('BackgroundStyle')
    })

    // we check if the user is already connected | if not he will be redirected at login page
    let history = useHistory()
    auth.onAuthStateChanged((user) => {
        if(user == null){
            history.push('/login')
        }else{
            // var user = firebase.auth().currentUser;
            setUid( user.uid )
            setUsername( user.displayName )
            setEmail( user.email )
            setEmailVerified( user.emailVerified )
            user.photoURL == null ? setPhotoUrl("images/user-profil.png") : setPhotoUrl( user.photoURL )
        }
    })
    
    // handleTest *****
    function handleTest(){
        if(url === 'informations'){
            console.log('URL is : informations')
        }else{
            console.log('URL is : change-password')
        }
        // console.log('URL', url)
    }

    // function to have state from child *****
    function handleSomething(childData) {
        return setUrl(childData)
    }
        
    



    return (
        <>
            <div className="d-flex">
                <div className="p-2 flex-shrink-1"><Sidebar parentCallback={ handleSomething } username={ username } photoUrl={ photoUrl } /></div>
                <div className="container">
                    <a href="#" id="toggle-menu-btn" role="button"><img src="images/toggle-btn.png" width="45px" alt="" /></a>
                    <h1 className="mt-4">Welcome { username } </h1>
                    <hr />


                    { url === 'informations' ? <UserInfos /> : <PasswordForm /> }
                    
                    
                </div>
            </div>
        </>
    )
}
