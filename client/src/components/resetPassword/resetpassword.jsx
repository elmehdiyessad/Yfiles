import React, { useEffect } from 'react'
import ResetForm from './resetform'
import '../../css/resetpassword.css'


export default function Resetpassword() {

    useEffect(() => {
        let body = document.body
        body.classList.remove('BackgroundStyle')
      })


    return (
        <div className="container">
            <ResetForm />
        </div>
    )
}
