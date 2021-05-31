import React, { useState } from 'react'
import { auth, googleAuthProvider, FacebookAuthProvider } from '../../firebase'
import { Link, useHistory } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons'


export default function LoginForm() {
    
    //state
    const [state, setState] = useState({
        email: "",
        password: ""
    })
    let [error, setError] = useState("")
    let [alertStyleError, setAlertStyleError] = useState("alert alert-danger d-none")

    // use History
    let history = useHistory();

    // Login With Facebook Params ********
    FacebookAuthProvider.addScope('login_with_facebook')
    auth.languageCode = 'fr';
    FacebookAuthProvider.setCustomParameters({
        'display': 'popup'
    });


    // Login With Google Params
    googleAuthProvider.addScope('https://www.googleapis.com/auth/contacts.readonly');
    

    //handle login with Facebook
    function handleFacebookLogin(e){
        e.preventDefault()
        auth.signInWithPopup(FacebookAuthProvider)
            .then((result) => {
                // The signed-in user info.
                const user = result.user;
                // This gives you a Facebook Access Token. You can use it to access the Facebook API.
                const credential = FacebookAuthProvider.credentialFromResult(result);
                const accessToken = credential.accessToken;

            })
            .catch((error) => {
                // Handle Errors here.
                console.log(error)
                // const errorCode = error.code;
                // const errorMessage = error.message;
                // // The email of the user's account used.
                // const email = error.email;
                // // The AuthCredential type that was used.
                // const credential = FacebookAuthProvider.credentialFromError(error);
            });
    }

    //handle login with Facebook
    function handleGoogleLogin(e){
        e.preventDefault()
        auth.signInWithPopup(googleAuthProvider)
            .then((result) => {
                // The signed-in user info.
                const user = result.user;
                // This gives you a Facebook Access Token. You can use it to access the Facebook API.
                const credential = googleAuthProvider.credentialFromResult(result);
                const accessToken = credential.accessToken;

            })
            .catch((error) => {
                // Handle Errors here.
                console.log(error)
            });
    }



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

        {/* FACEBOOK | GOOGLE sign in buttons */}
        <button id="btn-facebook" className="btn btn-large mt-2" onClick={ handleFacebookLogin }><FontAwesomeIcon className="mr-2" icon={faFacebook} /> Sign in with Facebook</button>
        <button id="btn-google" className="btn btn-large btn-light mt-2 mb-4" onClick={ handleGoogleLogin }><FontAwesomeIcon className="mr-2" icon={faGoogle} />Sign in with Google</button>

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
        className="btn btn-block btn-dark">
        Login
        </button>
        <p className="text-center mt-2"><Link to="/signup" className="text-light">Create an Account</Link></p>
        <p className="mt-5 mb-3 text-white text-center"><small>&copy; Y FILES 2020-2021</small></p>
    </form>
    )
}