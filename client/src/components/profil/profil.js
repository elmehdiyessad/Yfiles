import React, { Component } from 'react';
import "../FileManager/style/theme.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignOutAlt, faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import {Link} from 'react-router-dom'
class profil extends Component {
    render() {
        return (
            <div className="container-fluid fm">
                <div className="row">
                    <div className="col-2 tree sidebar" style={{backgroundColor:"#f9f9f9" , maxWidth: "230px"}}>
                        <img src="images/yfiles-logo-web.png" className="my-3 ml-0" />
                        <Link to="/home" className="text-decoration-none"><FontAwesomeIcon icon={faArrowLeft} className="mr-2 icon p" /> Back to files</Link>
                        <div><FontAwesomeIcon icon={faSignOutAlt} className="mr-2 icon p"/>Logout</div>
                        
                    </div>
                    <div className="col-10">
                        
                    </div>
              </div>
            </div>
        );
    }
}

export default profil;
