import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { faFacebook } from '@fortawesome/free-brands-svg-icons'

export default function footer() {
    return (
        <>
            <div id="footer" className="col-12 row">
                <div className="footer-section col-12 col-sm-12 col-md-12 col-lg-4 col-xl-4">
                    <img src="images/yfiles-logo.png" alt="yfiles-logo" width="300px" />
                </div>
                <div className="footer-section col-12 col-sm-12 col-md-12 col-lg-4 col-xl-4">
                    <h2>Links</h2>
                    <Link to="/" className="" role="">Security</Link>
                    <Link to="/about" className="" role="">Partners</Link>
                    <Link to="#services" className="" role="">Services</Link>
                    <Link to="/pricing" className="" role="">Pricing</Link>
                </div>
                <div className="footer-section col-12 col-sm-12 col-md-12 col-lg-4 col-xl-4">
                    <h2>Support</h2>
                    <Link to="/" className="" role=""><FontAwesomeIcon className="ml-2" icon={faEnvelope} /> Contact us</Link>
                    <Link to="/about" className="" role=""><FontAwesomeIcon className="ml-2" icon={faFacebook} /> Facebook</Link>
                    <Link to="/pricing" className="" role="">Email : yfiles@contact.com</Link>
                </div>
            </div>
            <div id="footer-end" className="col-12">
                <em id="copyright">Copyright © 2021 Y files. All rights reserved.</em>
                <ul>
                    <li><Link to="/privacy policy" role="">Privacy policy</Link></li>
                    <li><Link to="/terms of use" role="">Terms of use</Link></li>
                </ul>

            </div>
        </>
    )
}
