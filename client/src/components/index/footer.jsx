import React from 'react'
import { Link } from 'react-router-dom'

export default function footer() {
    return (
        <>
            <div id="footer" className="col-12">
                <div className="footer-section col-sm-12 col-md-12 col-lg-4 col-xl-4">
                    <img src="images/yfiles-logo.png" alt="yfiles-logo" width="300px" />
                </div>
                <div className="footer-section col-sm-12 col-md-12 col-lg-4 col-xl-4">
                    <h2>Links</h2>
                    <Link to="/" className="" role="">Security</Link>
                    <Link to="/about" className="" role="">Partners</Link>
                    <Link to="/contact" className="" role="">Storage</Link>
                    <Link to="/" className="" role="">Home</Link>
                    <Link to="/about" className="" role="">About</Link>
                    <Link to="/pricing" className="" role="">Pricing</Link>
                </div>
                <div className="footer-section col-sm-12 col-md-12 col-lg-4 col-xl-4">
                    <h2>Support</h2>
                    <Link to="/" className="" role="">Contact us</Link>
                    <Link to="/about" className="" role="">Facebook</Link>
                    <Link to="/contact" className="" role="">Twitter</Link>
                    <Link to="/contact" className="" role="">Contact</Link>
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
