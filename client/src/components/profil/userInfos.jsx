import React from 'react'
import { auth, db } from '../../firebase'

export default function userInfos() {

    const user = auth.currentUser

    if(user){
    db.collection('files').doc(user.uid).get()
        .then((collections) => {
            // console.log(collections)
            // check if the collection exist
            if(collections.exists === true){
                // if the collection doesn't exist we create one for the user
                // db.collection("files").doc(user.uid).set({
                //     files: {
                //     children: [],
                //     id: user.uid,
                //     module: "root"
                //     },
                //     uid_user:user.uid
                // })
                console.log(collections)
            }
        })
    }
    

    
    return (
        <>
        <div className="container">
            <h3 className="mb-3"> Informations : </h3>
            <em>Username : { user !== null ? user.displayName : null }</em>
            <br />
            <em>Email address : { user !== null ? user.email : null }</em>

        </div>
            
        </>
    )
}
