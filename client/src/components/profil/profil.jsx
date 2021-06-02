import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import { auth } from '../../firebase'
import Sidebar from './sidebar'
import { useHistory } from 'react-router-dom'

export default function Profil() {

    // state
    const [name, setName] = useState("")
    
    // we check if the user is already connected | if not he will be redirected at login page
    let history = useHistory()
    auth.onAuthStateChanged((user) => {
        if(user == null){
            history.push('/login')
        }
    })
    
    // auth.onAuthStateChanged((user) => {
    //     if(user == null){
    //         history.push('/login')
    //     }else{
    //         setName(user.displayName)
            
    //         db.collection('files').doc(user.uid).get()
    //         .then((collections) => {
    //             // console.log(collections)
    //             // check if the collection exist
    //             if(collections.exists == false){
    //                 // if the collection doesn't exist we create one for the user
    //                 db.collection("files").doc(user.uid).set({
    //                     files: {
    //                     children: [],
    //                     id: user.uid,
    //                     module: "root"
    //                     },
    //                     uid_user:user.uid
    //                 })
    //             }
    //         })
            
    //     }
    // })

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
        <>
            <div className="container">
            <h1 className="mt-4">Welcome { name }</h1>
            <hr />
            <Button variant="primary" onClick={ handleLogOut }>Log out</Button>
            </div>

            <Sidebar />
        </>
    )
}
