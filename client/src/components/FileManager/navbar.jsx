import React, { Component } from 'react'
import Avatar from '@material-ui/core/Avatar';
// import Img from 'images/user.png'
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCog , faSignOutAlt} from '@fortawesome/free-solid-svg-icons'
import "./style/styles.css"
export default class NavBar extends Component {
    render() {
        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
                    <div className="container-fluid">
                        <div style={{minWidth:"400px"}}>   
                            <input className="form-control form-control-sm" type="search" placeholder="Search" aria-label="Search" />
                        </div> 
                        <div className="d-inline-flex">
                            <Avatar alt="profil" src="images/user.png" />
                            <UncontrolledDropdown setActiveFromChild>
                                <DropdownToggle tag="a" className="nav-link" caret  style={{color:"#223B62"}}>
                                </DropdownToggle>
                                <DropdownMenu className="d">
                                    <DropdownItem tag="a" href="/blah" className="d-inline-flex pl-2"> <Avatar alt="profil" src="images/user.png" className="mr-2"/> <h6 className="mt-auto">Username</h6> </DropdownItem>
                                    <DropdownItem tag="a" href="/blah" > <FontAwesomeIcon icon={faUserCog} className="mr-2 icon"/> Profil</DropdownItem>
                                    <DropdownItem tag="a" href="/blah" > <FontAwesomeIcon icon={faSignOutAlt} className="mr-2 icon"/> Logout</DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                        </div>
                    </div>
                </nav>
            </div>
        )
    }
}
