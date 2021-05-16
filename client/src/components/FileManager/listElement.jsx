import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFolder , faFileAlt , faFileImage} from '@fortawesome/free-solid-svg-icons'
class ListElement extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        
        {
            if (!this.props.iss) return (
                this.props.tab.map((item, i) => (
                    <div className="py-3 pl-0 border-bottom d-flex p" onClick={() => this.props.settab(item.id)} key={item.id}>
                        <div className="col-6"><FontAwesomeIcon icon={
                            item.hasOwnProperty("children") ? faFolder : faFileAlt
                        } className="mr-2 icon" />
                            {item.module}</div>
                        <div className="col-2 r">{item.hasOwnProperty("children") ? "folder" : "file"}</div>
                        <div className="col-2 r">{item.hasOwnProperty("children") ? "-" : "13Mo"}</div>
                        <div className="col-2 r">19/04/2021</div>
                    </div>
                )))
                
            
            else return (
                this.props.s.length === 0 ? <h4 className="m-3 float-left">No result found</h4>
                :
                this.props.s.map((item, i) => (
                    <div className="py-3 pl-0 border-bottom d-flex p" onClick={() => this.props.settab(item.id)} key={item.id}>
                        <div className="col-6"><FontAwesomeIcon icon={
                            item.hasOwnProperty("children") ? faFolder : faFileAlt
                        } className="mr-2 icon" />
                            {item.module}</div>
                        <div className="col-2 r">{item.hasOwnProperty("children") ? "folder" : "file"}</div>
                        <div className="col-2 r">{item.hasOwnProperty("children") ? "-" : "13Mo"}</div>
                        <div className="col-2 r">19/04/2021</div>
                    </div>
                ))
            
            
            )
        
        }
    }
}

export default ListElement;