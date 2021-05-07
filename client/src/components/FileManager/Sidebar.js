import React, { Component, Fragment} from "react";
import Tree from "react-ui-tree";
import initialTree from "./tree";
import Icon from "react-icons-kit";
import { folder } from "react-icons-kit/feather/folder";
import { file } from "react-icons-kit/feather/file";
import { folderPlus } from "react-icons-kit/feather/folderPlus";
import { filePlus } from "react-icons-kit/feather/filePlus";
import { folderUpload } from 'react-icons-kit/icomoon/folderUpload'
import {plus} from 'react-icons-kit/feather/plus'
import styled from "styled-components";
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";
import _ from "lodash";
import { StrollableContainer } from "react-stroller";
import deepdash from "deepdash";
import Logo from './logo.png'
import "./style/styles.css";
import "react-ui-tree/dist/react-ui-tree.css";
import "./style/theme.css";
import "./style/react-contextmenu.css";
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileUpload , faFolderPlus} from '@fortawesome/free-solid-svg-icons'

    
// add deepdash to lodash
deepdash(_);

function collect(props) {
  return props;
}


/*                                //////////////////        States      ////////////////                        */
const initialState = {
    active: null,
    dropdownOpen: false,
  tree: {
    ...initialTree
  },
  collapsed: false // start with unmodified tree
};
/*                         /////////////////////////       component     //////////////////////////             */
export default class Sidebar extends Component {
  
 
   
    
    state = initialState;
        toggle = () => {
       this.setState({dropdownOpen : !this.state.dropdownOpen}) 
    }

  renderNode = node => {
    const renderFileFolderToolbar = (isFolder, caption) => (
      <Toolbar>
        <FloatLeft>
          <Icon icon={isFolder ? folder : file} />
          {caption}
        </FloatLeft>
        <ToolbarFileFolder>
          {/*isFolder && (
            <Fragment>
              <Icon
                title="New Folder"
                icon={folderPlus}
                //onClick={() => this.addItem("folder", node)}
              />
              <Icon
                title="New File"
                icon={filePlus}
                //onClick={() => this.addItem("file", node)}
              />
            </Fragment>
          )*/}
        </ToolbarFileFolder>
      </Toolbar>
    );

   

    const isFolder = node.hasOwnProperty("children");
    return (
      <ContextMenuTrigger
        id="FILE_CONTEXT_MENU"
        key={node.id}
        name={node.id}
        collect={collect}
        holdToDisplay={-1}
        onItemClick={this.handleContextClick}
      >
        {renderFileFolderToolbar(isFolder, node.module)}
      </ContextMenuTrigger>
    );
  };

  addItem = (itemType, active) => {

  };

  handleContextClick = (e, { action, name: id }) => {
    //const { tree } = this.state;

    switch (action) {
      case "rename":
     
        break;
      case "delete":
       
        break;
      default:
    }
  };

  toggleCollapse = () => {
    this.setState(({ collapsed }) => ({ collapsed: !collapsed }));
  };


  
  /*                    //////////////////////////    render fct ////////////////   */
    render() {

        return (
            <div>       
                {/*                           //////////////////////      sidebar //////////////////                     */}
                <div className="tree sidebar pl-1">
                    <img src={Logo} className="my-2 ml-1"/>
                    <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle} className="ml-4 mb-4 mt-1">
                        <DropdownToggle caret  style={{backgroundColor:"#223B62"}}>
                            <Icon title="New" icon={plus} className="mr-1"/>
                            Create New
                        </DropdownToggle>
                    <DropdownMenu>                     
                        <DropdownItem><FontAwesomeIcon icon={faFolderPlus} className="mr-2 icon" />New Folder</DropdownItem>
                        <DropdownItem divider />    
                        <DropdownItem><Icon title="New" icon={folderUpload} className="mr-2 " style={{color:"#4d4d4d"}} />Upload Folder</DropdownItem>
                        <DropdownItem><FontAwesomeIcon icon={faFileUpload} className="mr-2 icon"/>Upload File</DropdownItem> 
                        </DropdownMenu>
                    </Dropdown>
          
      
            
          
            <StrollableContainer  >
             
            <Tree
                draggable={false}
                tree={this.state.tree}
                onChange={this.handleChange}
                renderNode={this.renderNode}
              />
              
  
            </StrollableContainer>
          
        </div>
        {/*                           //////////////////////      json  //////////////////                     */}
        
         {/*                           //////////////////////      Contexte menu  //////////////////                     */}
        <ContextMenu id="FILE_CONTEXT_MENU">
          <MenuItem
            data={{ action: "rename" }}
            onClick={this.handleContextClick}
          >
            Rename
          </MenuItem>
          <MenuItem
            data={{ action: "delete" }}
            onClick={this.handleContextClick}
          >
            Delete
          </MenuItem>
           <MenuItem
            data={{ action: "move" }}
            onClick={this.handleContextClick}
          >
            Move
          </MenuItem>
          <MenuItem divider />
          <MenuItem
            data={{ action: "download" }}
            onClick={this.handleContextClick}
          >
            Download
          </MenuItem>
          <MenuItem
            data={{ action: "share" }}
            onClick={this.handleContextClick}
          >
            Share
          </MenuItem>
        </ContextMenu>

            </div>
        )
    }


 handleChange = tree => {
    this.setState({
      tree: tree
    });
  };
}

const LightScrollbar = styled.div`
  width: 10px;
  background-color: #fff;
  opacity: 0.7;
  border-radius: 4px;
  margin: 4px;
`;
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