import React, { useState } from 'react'
import { auth } from '../../firebase'

export default function Resetpasswordform() {


    //state
    const [email, setEmail] = useState("")
    let [success, setSuccess] = useState("")
    let [alertStyleSuccess, setAlertStyleSuccess] = useState("alert alert-success d-none")

    // handleChange
    function handleChange(e){
        const value = e.target.value
        setEmail(value)
        console.log(value)
    }

    // handle update password with email send
    function handleUpdateUserPassword(e){
        e.preventDefault()
        auth.languageCode = 'fr';
        auth.sendPasswordResetEmail(email).then(function() {
        // Email sent.
            console.log("email send")
            setSuccess( "An email has been sent, Please check you email address in order to update your password" )
            setAlertStyleSuccess( "alert alert-success" )
        }).catch(function(error) {
        // An error happened.
            console.log("Error!", error)
        });
    }

    return (
        <div className="container d-flex justify-content-center flex-wrap d-block">
            <p className="text-center"><img src="images/yfiles-logo.png" align="center" alt="yfiles logo" width="250" /></p>
            <h1 id="reset-password-title" className="mb-2 p-2 text-center">Reset password</h1>
            <hr />

            

            <form id="reset-password" className="d-block p-2 mt-5 col-12 col-xs-12 col-sm-12 col-md-8 col-lg-8 col-xl-4">
                
                {/* Alerts */}
                <div className={ alertStyleSuccess } role="alert"><strong>Success !</strong> { success }</div>
                
                <div className="form-group">
                <label className="sr-only">Email address</label>
                <input
                type="email"
                name="email"
                className="form-control" 
                placeholder="Email address" 
                onChange={ handleChange }
                />
                <small>Please enter your email address in order to send you an reset password email </small>
                </div>

                <button 
                type="button" 
                className="btn btn-block btn-dark"
                onClick={ handleUpdateUserPassword }>
                Send email password reset
                </button>

                <p className="mt-5 text-center"><small className="text-dark"> © Copyright Yfiles All right reserved</small></p>
            </form>
        </div>
    )
}
