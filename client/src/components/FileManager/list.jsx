import React, { Component } from 'react'
import ListElement from './listElement'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faSortAlphaUp, faSortAlphaDown, faThList, faThLarge, faEllipsisV, faPen,
    faTrashAlt, faShare, faDownload, faArrowsAlt, faEye
} from '@fortawesome/free-solid-svg-icons'
import Context from '../context/context'
import { Button, Toast, ToastBody, ToastHeader, Progress, DropdownItem, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import FilePreviewer from 'react-file-previewer';
import { faFolder, faFileAlt } from '@fortawesome/free-solid-svg-icons'
export default class List extends Component {
  
    state = {
        show:false
    }
    toggle = () => { this.setState({ show: !this.state.show }) }
    
    componentDidMount() {
        document.addEventListener("mousedown", (event) => {
        if (event.target.matches(".drp , .drp-menu , .drp *" )) {
          
        } else {
            this.setState({show:false})
        }});
    }

    renderpreview = (type, url) => {
        if (type === "audio" || type === "video") {
            return <div>
                <video width="100%" height="100%" controls >
                <source src={url} />
                </video>
                <ModalFooter>
                    <Button onClick={(e) => { window.open(url) }}>Download</Button>
                </ModalFooter>
            </div>
        }
        if (type === "image") {
            return<div>
                <img src={url} style={{ maxHeight: "100%", maxWidth: "100%" }} />
                <ModalFooter>
                    <Button onClick={(e) => { window.open(url) }}>Download</Button>
                </ModalFooter>
            </div>
        }
        else return <div>
            <h4 className="my-3 mx-auto">No preview available</h4>
            <img src="images/Image-not-found.png" style={{height:"50%" , width:"50%" }} className="d-block mx-auto my-3" />
            <ModalFooter>
                <Button onClick={(e) => { window.open(url) }}>Download</Button>
            </ModalFooter>
        </div>
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
                            <img src="" id="imgtest"></img>
                     </div>       
                        <Toast isOpen={value.show} className="position-fixed bottom-0 end-0 m-3">
                            <ToastHeader toggle={value.toggle}>Importing file</ToastHeader>
                            <ToastBody>
                                <Progress color="success" value={value.progress} max={100} />
                            </ToastBody>
                        </Toast>

                       <Modal isOpen={value.modalpreview} toggle={value.toggleviwer}>
                           <ModalHeader>Preview</ModalHeader>
                            <ModalBody>
                                {
                                    this.renderpreview(value.itemclicled.type, value.itemclicled.url)
                                    
                                }
                                
                            </ModalBody>
                        </Modal>
                        
                        {  <Modal
                            isOpen={value.modalmove}
                            //toggle={value.toggleviwer}
                        >
                            <ModalHeader>Choose Folder</ModalHeader>
                            <ModalBody>
                                <div className="pt-2 pb-3 pl-0 border-bottom  p row " onClick={() => value.navigatemove(value.tree) }
                                                 style={{ with: "100%" }}
                                               // onClick={ }
                                        data-bs-toggle="tooltip" data-bs-placement="bottom" title= "root" 
                                    >
                                        <div className="col-6 d-inline-flex"><FontAwesomeIcon icon={ faFolder } className="mr-2 icon" />
                                                {value.tree.module}</div>
                                        
                                    </div> 

                                {
                                    
                                    value.movefolders.children.length === 0 ? <h4 className="m-3 float-left">No folder found</h4>
                                :
                                    value.movefolders.children.map((item, i) => (
                                    (item.hasOwnProperty("children")) ?
                                    <div className="py-3 pl-4 border-bottom  p row "
                                                onClick={() => value.navigatemove(item) }
                                                key={item.id} style={{ with: "100%" }}
                                               // onClick={ }
                                        data-bs-toggle="tooltip" data-bs-placement="bottom" title={item.hasOwnProperty("children") ? "Open" : ""}
                                    >
                                        <div className="col-6 d-inline-flex"><FontAwesomeIcon icon={
                                                item.hasOwnProperty("children") ? faFolder : faFileAlt} className="mr-2 icon" />
                                                {item.module}</div>
                                        
                                    </div> : <> </>
                                ))
                                }
                                
                            </ModalBody>
                            <ModalFooter> <Button className=" float-end" onClick={ value.moveitem}>Move to {value.movefolders.module }</Button></ModalFooter>
                        </Modal> }
                </div>
                           )}
            </Context.Consumer>
        )
    }
}
