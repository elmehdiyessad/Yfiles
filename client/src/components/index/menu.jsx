import React from 'react'
import { Link } from 'react-router-dom'


function Menu() {
    return (
        <>
        <div id="menu">
            <img className="mt-4" src="images/yfiles-logo-web.png" align="center" alt="logo" width="200" />
            <ul>
                <li><a href="#">Home</a></li>
                <li><a href="#">About</a></li>
                <li><a href="#">Pricing</a></li>
                <li><a href="#">Contact</a></li>
                <li><Link to="/login" className="btn btn-primary ml-2" role="button">Login</Link></li>
                <li><Link to="/signup" className="btn btn-danger ml-2" role="button">Sign up</Link></li>
            </ul>
        </div>
        </>
    )
}


export default Menu