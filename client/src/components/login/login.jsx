import React from 'react'
import { BrowserRouter as Link } from 'react-router-dom';

export default function Signin() {
    return (
        <div>
            <form className="form-signin" onSubmit={this.handleSubmit}>
                <p className="text-center"><img className="mb-4" src="images/meteo.png" align="center" alt="logo" width="100" /></p>
                <h1 className="h3 mb-3 font-weight-normal text-center text-white">Sign in</h1>
                {/* Alert */}
                <div className={this.state.alertDanger} role="alert"><strong>Warning !</strong> { this.state.error }</div>

                <div className="form-group">
                <label className="sr-only">Email address</label>
                <input
                type="email"
                name="email"
                className="form-control" 
                placeholder="Email address" 
                onChange={this.handleChange}
                />
                </div>

                <div className="form-group">
                <label className="sr-only">Password</label>
                <input 
                type="password"
                name="password"
                className="form-control" 
                placeholder="Password" 
                onChange={this.handleChange} />
                </div>

                <button 
                type="submit" 
                className="btn btn-block btn-primary">
                Sign in
                </button>
                <p className="text-center mt-2"><Link to="/register">Create an Account</Link></p>
                <p className="mt-5 mb-3 text-white text-center"><small>&copy; METEO 2019-2020</small></p>
            </form>
        </div>
    )
}
