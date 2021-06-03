import React, { Component , Fragment} from "react"
import Tree from "react-ui-tree"
import Icon from "react-icons-kit"
import { folder } from "react-icons-kit/feather/folder"
import { file } from "react-icons-kit/feather/file"
import {folderOpenO} from 'react-icons-kit/fa/folderOpenO'
import {folderPlus} from 'react-icons-kit/feather/folderPlus'
import {plus} from 'react-icons-kit/feather/plus'
import styled from "styled-components";
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu"
import _ from "lodash";
import { StrollableContainer } from "react-stroller";
import deepdash from "deepdash"
import "./style/styles.css"
import "react-ui-tree/dist/react-ui-tree.css"
import "./style/theme.css"
import "./style/react-contextmenu.css"
import {  Progress , Button } from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileUpload , faFolderPlus , faTimes , faPen , faTrashAlt , faShare , faDownload , faArrowsAlt } from '@fortawesome/free-solid-svg-icons'
import Context from '../context/context'
import { db, storageRef, auth } from '../../firebase'

// add deepdash to lodash
deepdash(_);

function collect(props) {
  return props;
}


/*                                //////////////////        States      ////////////////                        */

/*                         /////////////////////////       component     //////////////////////////             */
export default class Sidebar extends Component {
    
  state = {
    active: null,
    dropdownOpen: false,
    tree: {},
    collapsed: false,
    size: 0,
    totalsize: "0 B",
    user:{}
  };
  
  toggle = () => {
       this.setState({dropdownOpen : !this.state.dropdownOpen}) 
    }

  
  renderNode = node => {
    const renderFileFolderToolbar = (isFolder, caption) => (
      <Toolbar>
        <FloatLeft>
          <Icon icon={isFolder ? node.collapsed? folder :folderOpenO : file} />
          {caption}
        </FloatLeft>
        <ToolbarFileFolder>
          {isFolder && (
            <Fragment>
              <Icon
                title="New Folder"
                icon={folderPlus}
                onClick={() => this.addItem("folder", node)}
              />
            </Fragment>
          )}
        </ToolbarFileFolder>
      </Toolbar>
    );

   

    const isFolder = node.hasOwnProperty("children");
    return (
      <Context.Consumer >
      {value => (          
      <div onClick={ () => value.setCurrentFolder(node.id)}>
      <ContextMenuTrigger
        id="FILE_CONTEXT_MENU"
        key={node.id}
        name={node.id}
        collect={collect}
        holdToDisplay={-1}
        onItemClick={value.handleContextClick}
      >
        {renderFileFolderToolbar(isFolder, node.module)}
        </ContextMenuTrigger>
        </div>
           )}
      </Context.Consumer>
    );
  };



  addItem = (itemType, active) => {
    if (window.innerWidth <= 768 && document.querySelector(".sidebar").style.display === "block") {
                            document.querySelector(".button-menu").style.display = "block"
                            document.querySelector(".sidebar").style.display= "none"
                            }
    const { tree } = this.state;
    const response = prompt("New folder name", "");
    
    if (response !== null || response !== undefined) {
      var date = new Date()
      var mounth = (date.getMonth() + 1 < 10) ? `0${date.getMonth() + 1}` : date.getMonth() + 1
      var day = (date.getDate() < 10) ? `0${date.getDate()}` : date.getDate()
      const newItem = {
        id: `root-${Date.now()}`,
        creationdate: `${day}/${mounth}/${date.getFullYear()}`,
        module: ( response === "" || !response) ?  `New folder` : response ,
        children: [],
        collapsed: true,
        size: "-",
        type: "folder"
      }
    
      const newTree = _.mapDeep(tree, (item, key, parentValue) => {
        const cloneItem = Object.assign({}, item);
        if (cloneItem) {
          if (cloneItem.id === active.id && cloneItem.children) {
            // folder
            cloneItem.children.unshift(newItem);
          }
        }
        return cloneItem;
      });

      this.setState({ tree: [...newTree] });
      db.collection("files").doc(this.state.user.uid).update({
              "files":this.state.tree
          })
    
    }
  };

  toggleCollapse = () => {
    this.setState(({ collapsed }) => ({ collapsed: !collapsed }));
  };

  close = () => {
    var el = document.querySelector(".sidebar")
    el.style.display = "none"
    var btn = document.querySelector(".button-menu")
    btn.style.display="block"
  }
  
  componentDidMount() {
    auth.onAuthStateChanged((user) => { 
    if (user === null) {
      //history.push('/login')
    } else {
      this.setState({ user: user })
      db.collection("files").doc(this.state.user.uid).onSnapshot(snap => {
          this.setState({ tree: snap.data().files })
          this.getUsedStockage()
      })
    }
    })
  }
  

  getUsedStockage = () => {
    var totalsize ="0 GB"
    var size = 0
    var listRef = storageRef.child(this.state.user.uid);

// Find all the prefixes and items.
    listRef.listAll()
  .then((res) => {
    res.items.forEach((itemRef) => {
      // All the items under listRef.
      itemRef.getMetadata().then((metadata) => {
        size = size + metadata.size
        var _size = size
        var fSExt = new Array('Bytes', 'KB', 'MB', 'GB'),
        i=0;while(_size>900){_size/=1024;i++;}
        totalsize = (Math.round(_size * 100) / 100) + ' ' + fSExt[i];
        this.setState({ size: size, totalsize: totalsize })
      }).finally(() => {
       
      })
    });
   
    
  }).catch((error) => {
    // Uh-oh, an error occurred!
  })
}

  
  /*                    //////////////////////////    render fct ////////////////   */
    render() {
      return (
        <div>
          <Context.Consumer >
            {value => (
              <div>
                <div className="tree sidebar pl-1">
                  <FontAwesomeIcon icon={faTimes} className="m-2 icon float-right p s" onClick={ this.close}/>  
                    <img src="images/yfiles-logo-web.png" className="my-3 ml-0" alt="logo"/>
                    <div  className="ml-1 mb-3 mt-1 d-inline-flex" >                
                      <Button onClick={  e => this.addItem("folder" , value.currentObj )} className="mx-1 d-inline-flex"  style={{backgroundColor:"#223B62"}}><FontAwesomeIcon icon={faFolderPlus} className="mr-2 icon text-white"/> <span style={{fontSize:"10px"}}>New Folder</span></Button>                    
                    {/**   <Button style={{backgroundColor:"#223B62"}}><Icon title="New" icon={folderUpload} className="mr-2 " style={{color:"#4d4d4d"}} />Upload Folder</Button>*/}
                    <Button style={{ backgroundColor: "#223B62" }} className="mx-1 d-inline-flex" onClick={() => { document.getElementById('file').click() }} ><FontAwesomeIcon icon={faFileUpload} className="mr-2 icon text-white" /><input type="file" id="file" onChange={value.handleInput} hidden/> <span style={{fontSize:"10px"}}>Upload File</span> </Button>
                   </div>
                  
                  <div className="scroll-tree">
                     
                    <Tree draggable={false} tree={this.state.tree} onChange={this.handleChange} renderNode={this.renderNode} />
                  </div>
                  <div className="text-center mt-3 mb-2">
                      <h6>{this.state.totalsize + " used of 30MB"}</h6>
                      <Progress value={this.state.size} max={30000000} />
                    </div>
                  
                </div>
                <ContextMenu id="FILE_CONTEXT_MENU">
                  <MenuItem data={{ action: "rename" }} onClick={value.handleContextClick}>
                    <FontAwesomeIcon icon={faPen} className="mr-2 icon" /> Rename </MenuItem>
                  <MenuItem data={{ action: "delete" }} onClick={value.handleContextClick}>
                    <FontAwesomeIcon icon={faTrashAlt} className="mr-2 icon" />  Delete </MenuItem>
                  <MenuItem data={{ action: "move" }} onClick={value.handleContextClick}>
                    <FontAwesomeIcon icon={faArrowsAlt} className="mr-2 icon" />  Move </MenuItem>
                  <MenuItem divider />
                  <MenuItem data={{ action: "download" }} onClick={value.handleContextClick}>
                    <FontAwesomeIcon icon={faDownload} className="mr-2 icon" />Download </MenuItem>
                  <MenuItem data={{ action: "share" }} onClick={value.handleContextClick}>
                    <FontAwesomeIcon icon={faShare} className="mr-2 icon" />Share </MenuItem>
                </ContextMenu>
              </div>
              )}
          </Context.Consumer>
        </div>
      )
    }


 handleChange = tree => {
  /*  this.setState({
      tree: tree
    });
   */
  };
}

/*const LightScrollbar = styled.div`
  width: 10px;
  background-color: #fff;
  opacity: 0.7;
  border-radius: 4px;
  margin: 4px;
`;*/
const Toolbar = styled.div`
  position: relative;
  display: flex;
  color: #4D4D4D;
  z-index: +1;
  /*border: 1px solid white;*/
  padding-bottom: 4px;
  i {
    margin-right: 5px;
    cursor: pointer;
  }
  i :hover {
    color: #d8e0f0;
  }
`;

const FloatLeft = styled.span`
  padding-left: 4px;
  width: 100%;
`;

const ToolbarFileFolder = styled.div`
  position: absolute;
  text-align: right;
  width: 92%;
  color: #4D4D4D;
  &:hover {
    color: #d8e0f0;
  }
`;