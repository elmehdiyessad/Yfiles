import React, { Component } from 'react';
import List from './list';
import NavBar from './navbar'
import SideBar from './sidebar'
import "./style/styles.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons'
import Provider from '../context/provider'
class Home extends Component {

     show = () => {
        var el = document.querySelector(".sidebar")
         el.style.display= "block"
    }
    render() {
        return (
            <Provider>
                <div className="container-fluid fm">
                    <div className="row flex">
                        <div className=" col-lg-auto pl-1 col-md-auto col-sm-auto pr-3" style={{backgroundColor:"#f9f9f9" , maxWidth: "230px"}}>
                            <div className="s" ><FontAwesomeIcon icon={faEllipsisV} className="m-2 icon float-left p" onClick={ this.show}/></div>
                            <SideBar />               
                        </div>             
                        <div className=" col  p-0 list " style={{width:"100%"}}>
                            <NavBar />
                            <List />
                        </div>              
                    </div>
                </div>
            </Provider>
        );
    }
}

export default Home