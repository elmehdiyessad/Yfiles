import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFolder, faFileAlt } from '@fortawesome/free-solid-svg-icons'
import { ContextMenuTrigger } from "react-contextmenu"


function collect(props) {
  return props;
}

class ListElement extends Component {
   
    render() {
        
        {
            if (!this.props.iss) return (
                this.props.tab.length === 0 ? <h4 className="m-3 float-left">Empty folder</h4>
                :
                this.props.tab.map((item, i) => (
                    <div className="py-3 pl-0 border-bottom  p row "
                        onDoubleClick={() => this.props.settab(item.id)} key={item.id} style={{ with: "100%" }} onClick={() => this.props.itemclick(item)}
                         data-bs-toggle="tooltip" data-bs-placement="bottom" title={item.hasOwnProperty("children") ? "Open" : ""}
                    >
                       <ContextMenuTrigger id="FILE_CONTEXT_MENU" key={item.id} name={item.id}  holdToDisplay={-1} collect={collect} onItemClick={this.props.menu} >
                            <div className="col-6 d-inline-flex"><FontAwesomeIcon icon={
                                item.hasOwnProperty("children") ? faFolder : faFileAlt} className="mr-2 icon" />
                                {item.module}</div>
                            <div className="col-2 r inflex">{item.type}</div>
                            <div className="col-2 r inflex">{item.size}</div>
                            <div className="col-2 r inflex">{item.creationdate}</div>
                        </ContextMenuTrigger>
                    </div>
                )))
                
            
            else return (
                this.props.s.length === 0 ? <h4 className="m-3 float-left">No result found</h4>
                :
                this.props.s.map((item, i) => (
                    <div className="py-3 pl-0 border-bottom row p" onClick={() => this.props.settab(item.id)} key={item.id} style={{with:"100%"}}>
                        <ContextMenuTrigger id="FILE_CONTEXT_MENU" key={item.id} name={item.id}  holdToDisplay={-1} collect={collect} onItemClick={this.props.menu} >
                            <div className="col-6 d-inline-flex"><FontAwesomeIcon icon={ item.hasOwnProperty("children") ? faFolder : faFileAlt} className="mr-2 icon" />
                                {item.module}
                            </div>
                            <div className="col-2 r inflex">{item.type}</div>
                            <div className="col-2 r inflex">{item.size}</div>
                            <div className="col-2 r inflex">{item.creationdate}</div>
                        </ContextMenuTrigger>
                    </div>
                ))
            
            
            )
        
        }
    }
}

export default ListElement;