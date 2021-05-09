import React, { Component } from 'react';
import List from './List';
import NavBar from './NavBar'
import SideBar from './Sidebar'
import "./style/styles.css"
class Home extends Component {
    render() {
        return (
            <div className="row">
                <div className="col-2 col-lg-2 col-md-3 ">
                    <SideBar />
                </div>
              
                <div className="col-10 col-lg-10 col-md-9 p-0 list">
                    <NavBar />
                    <List/>
                </div>
               
            </div>
        );
    }
}

export default Home;