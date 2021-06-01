import React, { Component } from 'react'
import Avatar from '@material-ui/core/Avatar';
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, Navbar } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCog , faSignOutAlt} from '@fortawesome/free-solid-svg-icons'
import "./style/styles.css"
import Context from '../context/context'
import {Link} from 'react-router-dom'
export default class NavBar extends Component {
    render() {
        return (
            <div>
                <Navbar className="bg-white shadow-sm ml-auto"  light expand="lg">      
                        <div  className="justify-content-between d-inline-flex" style={{width:"100%"}}>                                           
                        <div style={{ minWidth: "200px", maxWidth: "600px" }} className="float-left col">
                            <Context.Consumer >
                                {value => (
                                    <input className="form-control form-control-sm" type="search" placeholder="Search"
                                        aria-label="Search" onChange={(e) => value.search(e.target.value) }/>
                                )}
                                </Context.Consumer>
                        </div>
                        
                            <div className="d-inline-flex float-right ">
                                <Avatar alt="profil" src="images/user.png" />
                                <UncontrolledDropdown setActiveFromChild className="p">
                                    <DropdownToggle tag="a" className="nav-link " caret  style={{color:"#223B62"}}>
                                    </DropdownToggle>
                                    <DropdownMenu className="d">
                                        <DropdownItem  className="d-inline-flex pl-2"> <Avatar alt="profil" src="images/user.png"  className="mr-2"/> <h6 className="mt-auto">Username</h6> </DropdownItem>
                                        <DropdownItem  ><Link to="/profil" className="text-decoration-none"><FontAwesomeIcon icon={faUserCog} className="mr-2 icon"/> Profil </Link></DropdownItem>
                                        <DropdownItem  > <FontAwesomeIcon icon={faSignOutAlt} className="mr-2 icon"/> Logout</DropdownItem>
                                    </DropdownMenu>
                                </UncontrolledDropdown>
                            </div>
                      
                   </div>
                </Navbar>
            </div>
        )
    }
}
