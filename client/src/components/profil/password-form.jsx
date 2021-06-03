import React, { useState } from 'react'
import { auth, firebase } from '../../firebase'


export default function PasswordForm() {

// state
const [state, setState] = useState({
    password: "",
    newPassword: "",
    passwordConfirm: ""
})

let [error, setError] = useState("")
let [success, setSuccess] = useState("")
let [alertStyleError, setAlertStyleError] = useState("alert alert-danger d-none")
let [alertStyleSuccess, setAlertStyleSuccess] = useState("alert alert-success d-none")


// handleSubmit
function handleSubmit(e){
    e.preventDefault()

    if(state.password !== "" && state.newPassword !== "" && state.passwordConfirm !== ""){

        if(state.passwordConfirm.length >= 6){

            if(state.newPassword === state.passwordConfirm){
                // change password
                const user = auth.currentUser

                // userProvidedPassword
                var credential = firebase.auth.EmailAuthProvider.credential(
                    user.email,
                    state.password
                );

                // Prompt the user to re-provide their sign-in credentials
                user.reauthenticateWithCredential(credential).then(function() {
                    user.updatePassword(state.newPassword).then(function() {
                        // Update successful.
                        console.log("everything OKEY")
                        setError( "" )
                        setSuccess( "Your password is updated successfully" )
                        setAlertStyleSuccess( "alert alert-success" )
                        setAlertStyleError( "alert alert-danger d-none" )
                    }).catch(function(error) {
                        console.log("ERROR updatePassword !", error.code)
                        // if(error.code == "auth/requires-recent-login"){
                        //     setError( "Your old password is wrong ! Please enter the right password" )
                        //     setAlertStyleError( "alert alert-danger" )
                        // }
                    });
                }).catch(function(error) {
                    console.log("ERROR reauthenticateWithCredential !", error.code)
                });
                

            }else{
                console.log("The passwords not matching")
                setError( "The passwords not matching!" )
                setAlertStyleError( "alert alert-danger" )
            }
        }else{
            console.log("Please your password should have min 6 characters!")
            setError( "Please your password should have min 6 characters!" )
            setAlertStyleError( "alert alert-danger" )
        }
    }else{
        setError( "All the fields are required!" )
        setAlertStyleError( "alert alert-danger" )
    }
}

// handleChange
function handleChange(e){
    const value = e.target.value
    setState({
        ...state,
        [e.target.name]: value
    })
}




return (
    <div className="row col-12 col-xs-12 col-sm-12 col-md-8 col-lg-6 col-xl-6">
    <form onSubmit={ handleSubmit }>

        {/* Alerts */}
        <div className={ alertStyleError } role="alert"><strong>Warning !</strong> { error }</div>
        <div className={ alertStyleSuccess } role="alert"><strong>Success !</strong> { success }</div>
        
        <div className="form-group">
            <label htmlFor="password">Your Password</label>
            <input 
            type="password"
            id="password"
            className="form-control"
            name="password"
            value={ state.password } 
            onChange={ handleChange } />
        </div>
        <div className="form-group">
            <label htmlFor="newpassword">New Password</label>
            <input 
            type="password"
            id="newpassword"
            className="form-control"
            name="newPassword"
            value={ state.newPassword } 
            onChange={ handleChange } />
        </div>
        <div className="form-group">
            <label htmlFor="confirmnewpassword">Confirm New Password</label>
            <input 
            type="password"
            id="confirmnewpassword"
            className="form-control"
            name="passwordConfirm"
            value={ state.passwordConfirm } 
            onChange={ handleChange } />
        </div>
        <button type="submit" className="btn btn-primary">Change password</button>
    </form>
    </div>
)



}
