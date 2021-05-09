import React, { useState } from 'react'
import { auth } from '../../firebase'
import { Link, useHistory } from "react-router-dom";

function LoginForm() {
    
    //state
    const [state, setState] = useState({
        email: "",
        password: ""
    })
    let [error, setError] = useState("")
    let [alertStyleError, setAlertStyleError] = useState("alert alert-danger d-none")

    // use History
    let history = useHistory();

    

    // handleSubmit
    function handleSubmit(e){
        e.preventDefault()
        
        if(state.email !== "" && state.password !== ""){
            // SIGN IN
            auth.signInWithEmailAndPassword(state.email, state.password)
            .then(credentials => {
                // console.log("credentials", credentials.user)
                setError("")
                setAlertStyleError("alert alert-danger d-none")
                history.push('/profil')
            })
            .catch(error => {
                // console.log("ERROR", error.message)
                setError(error.message)
                setAlertStyleError("alert alert-danger")
            })
        }else{
            setError("Please fill email and password fields to Log in!")
            setAlertStyleError("alert alert-danger")
        }
    }

    // handleChange
    function handleChange(e){
        const value = e.target.value
        setState({
            ...state,
            [e.target.name]: value
        })
        console.log(state)
    }



    return (
        <form className="form-signin" onSubmit={ handleSubmit }>
        <p className="text-center"><img className="mb-4" src="images/yfiles-logo.png" align="center" alt="logo" width="250" /></p>
        <h1 className="h3 mb-3 font-weight-normal text-center text-white">Sign in</h1>

        {/* Alerts */}
        <div className={ alertStyleError } role="alert"><strong>Warning !</strong> { error }</div>

        <div className="form-group">
        <label className="sr-only">Email address</label>
        <input
        type="email"
        name="email"
        className="form-control" 
        placeholder="Email address" 
        onChange={ handleChange }
        />
        </div>

        <div className="form-group">
        <label className="sr-only">Password</label>
        <input 
        type="password"
        name="password"
        className="form-control" 
        placeholder="Password" 
        onChange={ handleChange } />
        </div>

        <button 
        type="submit" 
        className="btn btn-block btn-primary">
        Login
        </button>
        <p className="text-center mt-2"><Link to="/signup">Create an Account</Link></p>
        <p className="mt-5 mb-3 text-white text-center"><small>&copy; Y FILES 2020-2021</small></p>
    </form>
    )
}


export default LoginForm