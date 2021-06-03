import React, { useState, useEffect } from 'react'
import { auth } from '../../firebase'
import { useHistory } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowAltCircleRight } from '@fortawesome/free-solid-svg-icons'
import { faLongArrowAltLeft } from '@fortawesome/free-solid-svg-icons'


export default function Sidebar(props) {

    const [myvariable, setMyvariable] = useState("informations")
    

    useEffect(() => {
        // handleResize
        window.addEventListener("resize", () => {
            var ww = window.innerWidth
            if(ww < 640){
                document.querySelector('#sidebar').style.display = "none"
                document.querySelector('#toggle-menu-btn').style.display = "block"
                console.log("moins 640")
            }else{
                document.querySelector('#sidebar').style.display = "block"
                document.querySelector('#toggle-menu-btn').style.display = "none"
            }
        }, true)
    }, [])





    // myFunction() this function to handle the change variable when the user click on the href link in the sidebar
    function myFunction(e){
        console.log(e.target)
        e.preventDefault()
        if (e.target.name === "informations"){
            setMyvariable("informations")
        }else{
            setMyvariable("change-password")
        }
        const onTrigger = () => {
            props.parentCallback(myvariable)
        }
        onTrigger()
    }


    // delete user
    function handleDeleteUserAccount(e){
    e.preventDefault()
    const user = auth.currentUser
    var r = window.confirm("You sure that you want delete your account, you risk to loose all your folders and files !")
    if(r === true){
        user.delete().then(function() {
        // User deleted.
            
        }).catch(function(error) {
        // An error happened.
            console.log(error)
            alert("Please try to log out and login in again in order to do this operation")
        });
    }
    }

    let history = useHistory()
    // handle Log Out
    function handleLogOut(e){
        e.preventDefault()
        
        auth.signOut()
            .then(() => {
                history.push('/login')
            })
            .catch(error => {
                console.log("ERROR", error.message)
            })
    }


    function handleCloseSidebar(){
        document.querySelector('#sidebar').style.display = "none"
        document.querySelector('#toggle-menu-btn').style.display = "block"
    }



    return (
        <div id="sidebar">
        <div className="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark sticky-top" style={{width: "280px" }}>
            <a href="#" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
            <svg className="bi me-2" width="40" height="32"></svg>
            <span className="fs-4" onClick={ handleCloseSidebar }><FontAwesomeIcon className="mr-2" icon={faLongArrowAltLeft} /> Profil</span>
            </a>
            <hr />
            <ul className="nav nav-pills flex-column mb-auto">
            <li className="nav-item">
                <a href="#" className="nav-link text-white" aria-current="page" name="informations" onClick={ myFunction }>
                <svg className="bi me-2" width="16" height="16"></svg>
                Dashboard
                </a>
            </li>
            <li>
                <a href="/home" className="nav-link text-white">
                <svg className="bi me-2" width="16" height="16"></svg>
                File manager
                </a>
            </li>
            <li>
                <a href="#" className="nav-link text-white" name="change-password" onClick={ myFunction }>
                <svg className="bi me-2" width="16" height="16"></svg>
                Change password
                </a>
            </li>
            <li>
                <a href="#" className="nav-link text-white" onClick={ handleDeleteUserAccount }>
                <svg className="bi me-2" width="16" height="16"></svg>
                Delete account
                </a>
            </li>
            <li>
                <a href="#" className="nav-link text-white active" onClick={ handleLogOut }>
                <svg className="bi me-2" width="16" height="16"></svg>
                Log out &ensp; <FontAwesomeIcon className="mr-2" icon={faArrowAltCircleRight} />
                </a>
            </li>
            </ul>
            <hr />
            <div className="dropdown">
            <a href="#" style={{ paddingTop: "310px" }} className="d-flex align-items-center text-white text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
                <img src={ props.photoUrl } alt="" width="50" height="50" className="rounded-circle me-2" />
                <strong>{ props.username }</strong>
            </a>
            <ul className="dropdown-menu dropdown-menu-dark text-small shadow" aria-labelledby="dropdownUser1">
                <li><a className="dropdown-item" href="#">New project...</a></li>
                <li><a className="dropdown-item" href="#">Settings</a></li>
                <li><a className="dropdown-item" href="#">Profile</a></li>
                <li><hr className="dropdown-divider" /></li>
                <li><a className="dropdown-item" href="#">Sign out</a></li>
            </ul>
            </div>
        </div>
        </div>
    )
}
