import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { auth } from '../../firebase'

function SignupForm() {

    //state
    const [state, setState] = useState({
        username: "",
        email: "",
        password: "",
        passwordConfirm: ""
    })

    let [error, setError] = useState("")
    let [success, setSuccess] = useState("")
    let [alertStyleError, setAlertStyleError] = useState("alert alert-danger d-none")
    let [alertStyleSuccess, setAlertStyleSuccess] = useState("alert alert-success d-none")

    // handleSubmit
    function handleSubmit(e){
        e.preventDefault()

        if(state.username !== "" && state.email !== "" && state.password !== "" && state.passwordConfirm !== ""){
            if(state.password.length >= 6){

                if(state.password === state.passwordConfirm){
                    // create a new user createUserWithEmailAndPassword()
                    auth.createUserWithEmailAndPassword(state.email, state.password).then(credentials => {
                        console.log(credentials)
                    })
                    .catch(error => {
                        console.log(error)
                    })
                    setError( "" )
                    setSuccess( "Your account is created" )
                    setAlertStyleSuccess( "alert alert-success" )
                    setAlertStyleError( "alert alert-danger d-none" )

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
        <div>
            
            <form onSubmit={ handleSubmit }>
                <p className="text-center"><img className="mt-3" src="images/yfiles-logo.png" align="center" alt="logo" width="250" /></p>
                <h1 className="h3 mb-3 font-weight-normal text-light text-center">Create an account</h1>

                {/* Alerts */}
                <div className={ alertStyleError } role="alert"><strong>Warning !</strong> { error }</div>
                <div className={ alertStyleSuccess } role="alert"><strong>Success !</strong> { success }</div>
                
                
                <div className="form-group">
                    <input 
                    type="text"
                    className="form-control" 
                    name="username" 
                    placeholder="Username" 
                    value={ state.username } 
                    onChange={ handleChange } />
                </div>
                <div className="form-group">
                    <input type="email" 
                    className="form-control" 
                    name="email" 
                    placeholder="Email address" 
                    value={ state.email } 
                    onChange={ handleChange } />
                    <small id="emailHelp" className="form-text text-light">We'll never share your email with anyone else.</small>
                </div>
                <div className="form-group">
                    <input 
                    type="password" 
                    className="form-control" 
                    name="password" 
                    placeholder="Password" 
                    value={ state.password } 
                    onChange={ handleChange } />
                </div>
                <div className="form-group">
                    <input 
                    type="password" 
                    className="form-control" 
                    name="passwordConfirm" 
                    placeholder="Confirm Password" 
                    value={ state.passwordConfirm } 
                    onChange={ handleChange } />
                </div>
                <button type="submit" className="btn btn-dark">Sign up</button>
                <Link to="/login" className="btn btn-light ml-2" role="button">Login</Link>
            </form>
        </div>
    )
}


export default SignupForm