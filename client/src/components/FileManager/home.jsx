import React, { Component } from 'react';
import List from './list';
import NavBar from './navbar'
import SideBar from './sidebar'
import "./style/styles.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import Provider from '../context/provider'
import { SettingsRemoteOutlined } from '@material-ui/icons';
import { Redirect } from 'react-router-dom'
import {auth} from '../../firebase'

var user=null
auth.onAuthStateChanged((u) => {
    if (u !== null) {
        user=u
    }
})
class Home extends Component {

    state = {
        r:false
    }
     show = () => {
         var el = document.querySelector(".sidebar")
         var btn = document.querySelector(".button-menu")
         btn.style.display="none"
         el.style.display= "block"
    }
    componentDidMount() {
        var vw =  window.innerWidth ;
        if (vw <= 768) {
            this.setState({r:true})
        }
        if (vw > 768) {
            this.setState({r:false})
        }
        
        window.addEventListener("resize", () => {
            vw =  window.innerWidth ;
            if (vw <= 768) {
                this.setState({ r: true })
            }
            if (vw > 768) {
                this.setState({ r: false })
            }
        }, true)

        document.addEventListener("mousedown", (event) => {
       
        if (!event.target.matches(".sidebar , .sidebar *" )) {
          if (window.innerWidth <= 768 && document.querySelector(".sidebar").style.display === "block") {
              this.setState({ r: true })
              document.querySelector(".button-menu").style.display = "block"
              document.querySelector(".sidebar").style.display= "none"
            }
            }
        });
    }
    render() {
    
            if (user === null) { return (<Redirect to="/login" />) }
            else {
                return ( <Provider>
                <div className="container-fluid fm">
                    <div className="row flex">
                        <div className="col-auto col-lg-auto pl-1 col-md-auto col-sm-auto pr-3" style={{backgroundColor:"#f9f9f9" , maxWidth: "230px"}}>
                            {
                                this.state.r ?
                                    <div>
                                        <FontAwesomeIcon icon={faBars} className="m-2 icon float-right p button-menu" onClick={this.show} />
                                        <SideBar />
                                    </div>    
                                    :
                                    <SideBar />
                            
                           }
                            
                                           
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
}

export default Home