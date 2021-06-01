import React, { Component } from 'react'
import ListElement from './listElement'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faSortAlphaUp, faSortAlphaDown, faThList, faThLarge, faEllipsisV, faPen,
    faTrashAlt, faShare, faDownload, faArrowsAlt, faEye
} from '@fortawesome/free-solid-svg-icons'
import Context from '../context/context'
import { Button, Toast, ToastBody, ToastHeader, Progress, DropdownItem, Modal, ModalHeader, ModalBody } from 'reactstrap';
import FilePreviewer from 'react-file-previewer';
export default class List extends Component {
  
    state = {
        show:false
    }
    toggle = () => { this.setState({ show: !this.state.show }) }
    
    componentDidMount() {
        const concernedElement = document.querySelector(".drp")
        document.addEventListener("mousedown", (event) => {
        if (event.target.matches(".drp , .drp-menu , .drp *" )) {
          
        } else {
            this.setState({show:false})
        }});
    }
    render() {
        return (
            <Context.Consumer >
                {value => (
                <div >              
                    <div className="col-12 py-3 px-3 border-bottom ">
                        <div className=" ml-auto" style={{ width: "max-content" }}>
                                {value.click ?
                                    <>
                                        {
                                            value.itemclicled.hasOwnProperty("leaf") ? <FontAwesomeIcon icon={faEye} className="mr-2 icon p drp-menu"
                                                data-bs-toggle="tooltip" data-bs-placement="bottom" title="preview" onClick={value.viewer}
                                            /> : <span></span>
                                        }
                                        <FontAwesomeIcon icon={faEllipsisV} className="mr-3 icon p drp-menu" onClick={this.toggle}
                                        />
                                        {
                                            this.state.show ? 
                                        <div className="drp">
                                            <DropdownItem data={{ action: "rename" }} onClick={e => value.handleContextClick(e, { action:"rename" , name: value.itemid })}>
                                                <FontAwesomeIcon icon={faPen} className="mr-2 icon" /> Rename </DropdownItem>
                                            <DropdownItem data={{ action: "delete" }} onClick={e => value.handleContextClick(e, { action:"delete" , name: value.itemid })}>
                                                <FontAwesomeIcon icon={faTrashAlt} className="mr-2 icon" />  Delete </DropdownItem>
                                            <DropdownItem data={{ action: "move" }} onClick={e => value.handleContextClick(e, { action:"move" , name: value.itemid })}>
                                                <FontAwesomeIcon icon={faArrowsAlt} className="mr-2 icon" />  Move </DropdownItem>
                                            <DropdownItem divider />
                                            <DropdownItem data={{ action: "download" }} onClick={e => value.handleContextClick(e, { action:"download" , name: value.itemid })}>
                                                <FontAwesomeIcon icon={faDownload} className="mr-2 icon" />Download </DropdownItem>
                                            <DropdownItem data={{ action: "share" }} onClick={e => value.handleContextClick(e, { action:"share" , name: value.itemid })}>
                                                <FontAwesomeIcon icon={faShare} className="mr-2 icon" />Share </DropdownItem>
                                        </div>
                                        :<span></span>
                                        }
                                    </>
                                    :
                                    <div></div>
                                }
                            <FontAwesomeIcon icon={faThList} className="mr-2 icon p" />
                            <FontAwesomeIcon icon={faThLarge} className="mr-2 icon p" />
                            <FontAwesomeIcon icon={faSortAlphaDown} className="mr-2 icon p" />
                            <FontAwesomeIcon icon={faSortAlphaUp} className="mr-2 icon p"/>
                        </div>
                    </div>
                    <div className=" col-12 py-3 px-0 border-bottom r " style={{display:"flex"}}>
                        <div className="col-6 ">Name</div>
                        <div className="col-2 ">Type</div>
                        <div className="col-2 ">Size</div>
                        <div className="col-2 ">Created</div>
                    </div>
                     <div className="scr">
                            <ListElement tab={value.currentfolder} settab={value.setCurrentFolder} s={value.s} iss={value.iss} menu={value.handleContextClick}
                                itemclick={value.itemclick}
                        />
                     </div>       
                        <Toast isOpen={value.show} className="position-fixed bottom-0 end-0 m-3">
                            <ToastHeader toggle={value.toggle}>Importing file</ToastHeader>
                            <ToastBody>
                                <Progress color="success" value={value.progress} max={100} />
                            </ToastBody>
                        </Toast>

                      {  <Modal isOpen={value.modalpreview} toggle={value.toggleviwer}>
                            <ModalBody>
                            <FilePreviewer file={{
                                    url: value.itemclicled ? value.itemclicled.url :"https://static.wikia.nocookie.net/animated_inanimate_battle/images/a/a3/Image-not-found.png/revision/latest?cb=20200723230444"
                                }}
                            />
                            </ModalBody>
                        </Modal> }
                </div>
                           )}
            </Context.Consumer>
        )
    }
}
