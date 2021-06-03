import React, { useState, useEffect } from 'react'
import { auth, db, storageRef } from '../../firebase'
import { Progress } from 'reactstrap'


export default function UserInfos() {

    // state
    const [state, setState] = useState({
        size: 0,
        totalsize: "0 B",
        user: {}
    })

    // handlegetUsedStockage *********
    function getUsedStockage () {
        var totalsize ="0 GB"
        var size = 0
        var listRef = storageRef.child(user.uid);
        // Find all the prefixes and items.
        listRef.listAll()
      .then((res) => {
        res.items.forEach((itemRef) => {
          // All the items under listRef.
          itemRef.getMetadata().then((metadata) => {
            size = size + metadata.size
            var _size = size
            var fSExt = new Array('Bytes', 'KB', 'MB', 'GB'),
            i=0;while(_size>900){_size/=1024;i++;}
            totalsize = (Math.round(_size * 100) / 100) + ' ' + fSExt[i];
            this.setState({ size: size, totalsize: totalsize })
          })
        });
    
      }).catch((error) => {
          console.log(error)
      })
    
    }


    useEffect(() => {
        getUsedStockage()
    }, [])

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
        <div className="container col-xs-12 col-sm-12 col-md-8">
            <h3 className="mb-3"> Informations : </h3>
            <em>Username : { user !== null ? user.displayName : null }</em>
            <br />
            <em>Email address : { user !== null ? user.email : null }</em>

            <h6>{state.totalsize + " used of 30MB"}</h6>
            <Progress value={state.size} max={30000000} />

        </div>
            
        </>
    )
}
