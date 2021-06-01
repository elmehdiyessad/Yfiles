import React, { Component } from 'react';
import Context from './context';
import _ from "lodash";
import deepdash from "deepdash";
import { db , storage , storageRef} from '../../firebase'

deepdash(_);
export default class Provider extends Component {
    constructor(props) {
        super(props)
        this.state = {
            tree: {},
            currentfolder: [],
            s: [],
            iss: false,
            currentObj: {},
            file: null,
            progress:0,
            downloadURL: null,
            show: false,
            itemid: null,
            itemclicled: null,
            click: false,
            modalpreview: false,
        };
       this.deleteFromTree = this.deleteFromTree.bind(this)
    }
    componentDidMount() {
       window.addEventListener('online', () => console.log('Became online'));
       window.addEventListener('offline', () => console.log('Became offline'));
     db.collection("files").doc("lxK4KkEkcLPxOR0UZJotLlDo4Bs2").onSnapshot( snap => {
         this.setState({
             tree: snap.data().files
         })
         if (this.state.currentfolder.length === 0 && Object.keys(this.state.currentObj).length === 0) {
             this.setState({
                 currentfolder: snap.data().files.children,
                 currentObj: snap.data().files
             })
         }
         else {
            const current = _.findDeep(this.state.tree, item => item.id === this.state.currentObj.id, {
                            childrenPath: "children"
            });
            this.setState({ currentfolder: current.value.children , currentObj:current.value }) 
             
         }
        
     })
        
     /*   db.collection("files").doc("6SjQdknzyKiEnGdGi58A").onSnapshot(snap => {
         console.log("get");
             db.collection("files").doc("lxK4KkEkcLPxOR0UZJotLlDo4Bs2").set(snap.data())
         })*/
    }
    
    
deleteFromTree = (o, id , path) => { //o=object tree , id=string
  //////////////////////////////
   let getNode = (a, i) =>{ // a=aray element , i = index element
    if (a.id === id) {
      index = i; //get the index of the element a
      return true; //return true if the id element (a) is equal to the id passed in params of (deleteFromTree) fct
    }
    if (Array.isArray(a.children) && a.children.some(getNode)) {// Array.some test the condition getNode
      if (~index) { // false when index=-1 (element not found)       
          if (a.children[index].path) {
            var desertRef = storageRef.child(a.children[index].path);
            // Delete the file
            desertRef.delete().then(() => {
            // File deleted successfully
            }).catch((error) => {
            // Uh-oh, an error occurred!
            });
          }
          a.children.splice(index, 1);      
          index = -1;
          if (id === this.state.currentObj.id) {
            this.setState({ currentfolder: this.state.tree.children , currentObj:this.state.tree })   
          }
      }
      return true;
    }
  }
//////////////////////////
  var index = -1;
  [o].some(getNode);
}

   addItem = (active , file, filepath , fileurl) => {
     
    const tree  = this.state.tree;

       var date = new Date()
         var mounth = (date.getMonth() + 1 < 10) ? `0${date.getMonth() + 1}` : date.getMonth() + 1
        var _size = file.size;
        var fSExt = new Array('Bytes', 'KB', 'MB', 'GB'),
        i=0;while(_size>900){_size/=1024;i++;}
        var exactSize = (Math.round(_size*100)/100)+' '+fSExt[i];
        const newItem = {
            id: `root-${Date.now()}`,
            creationdate: `${date.getDate()}/${mounth}/${date.getFullYear()}`,
            module: file.name ,
            leaf: true,
            size: exactSize,
            type: "file",
            url: fileurl,
            path:filepath
         }
    //console.log(tree)
      const newTree = _.mapDeep(tree, (item, key, parentValue) => {
        const cloneItem = Object.assign({}, item);
        if (cloneItem) {
          if (cloneItem.id === active.id ) {
            // folder
            cloneItem.children.push(newItem);
          }
        }
        return item;
          }
      , {   childrenPath: "children"}
      );
      this.setState({ tree: newTree[Object.keys(newTree)[0]] });
      db.collection("files").doc("lxK4KkEkcLPxOR0UZJotLlDo4Bs2").update({
              "files":this.state.tree
          })
    
    
  };
 

    updatedb() {
        db.collection("files").doc("lxK4KkEkcLPxOR0UZJotLlDo4Bs2").update({
            "files":this.state.tree
        })
    }


  download = (itemtype, item) => {
    if (itemtype=== "file") {
        window.open(item.url)                     
      }
      if (itemtype === "folder") {
          console.log("download folder");
      }
    }
    render() {
        return (
            <Context.Provider
                value={{
                    tree: this.state.tree,
                    currentfolder: this.state.currentfolder,
                    currentObj: this.state.currentObj,
                    s: this.state.s,
                    iss: this.state.iss,
                    file: this.state.file,
                    progress:this.state.progress,
                    downloadURL: this.state.downloadURL,
                    show: this.state.show,
                    itemid: this.state.itemid,
                    itemclicled:this.state.itemclicled ,
                    click: this.state.click,
                    modalpreview: this.state.modalpreview,
                    toggle: () =>{this.setState({show : !this.state.show})},
                    handleInput : (e) => {                   
                        if (e.target.files[0]) {                       
                            let file = e.target.files[0];
                            console.log(file.type)
                            var uploadref = storageRef.child('lxK4KkEkcLPxOR0UZJotLlDo4Bs2/' + file.name)
                                uploadref.getDownloadURL()
                                .catch((error) => {
                                    if (error.code === "storage/object-not-found") {
                                        this.setState({ show: true })
                                        
                                        var uploadTask = uploadref.put(file)
                                        uploadTask.on( "state_changed",
                                        (snapshot) =>{
                                            var progress = Math.round((snapshot.bytesTransferred/snapshot.totalBytes))*100
                                            this.setState({ progress })
                                            },(error) =>{
                                            throw error
                                            },() =>{
                                            
                                            uploadTask.snapshot.ref.getDownloadURL().then((url) =>{
                                                this.addItem(this.state.currentObj ,file , uploadref.fullPath , url )
                                            })                                                
                                            document.getElementById("file").value = null                                           
                                        })
                                        
                                        
                                    }
                                })
                           
                        }                
                    },
                    setCurrentFolder: id => {
                        this.setState({ iss: false })
                        const renameObj = _.findDeep(this.state.tree, item => item.id === id, {
                            childrenPath: "children"
                        });
                        if (renameObj.value.hasOwnProperty("children")) { 
                        this.setState({ iss: false })
                        this.setState({ currentfolder: renameObj.value.children , currentObj:renameObj.value })
                    }
                    },
                    search: s => {
                        if (s !== "" && s !== null) {
                            this.setState({ iss: true })
                        var a = []
                        var f = _.eachDeep(this.state.tree, (value) => {
                        if (value.module.toLocaleLowerCase().includes(s) && value.id !== "root-0" ) a.push(value)
                        }, { childrenPath: "children" });
                         this.setState({ s: a })
                        }
                    if(s === "" || s===null)  this.setState({s: [] , iss: false })
                    },
                     handleContextClick : (e, { action, name: id }) => {
                        const { tree } = this.state;
                        switch (action) {
                            case "rename":
                                const renameObj = _.findDeep(tree, item => item.id === id, {childrenPath: "children"});
                                const response = prompt("Please rename", renameObj.value.module);
                                if (response === "" || response === null || response === undefined || response.length === 0) {return;}
                                else { 
                                 renameObj.value.module = response;
                                 this.setState( _.mapDeep(tree, item => item.id === id ? { ...item, ...renameObj.value} : item,{ childrenPath: "children" } ));
                                 this.updatedb()
                                }
                            break;
                        case "delete":
                            this.deleteFromTree(this.state.tree, id);
                            this.setState({
                            tree
                            });
                            this.updatedb()
                                break;
                          case "move":
                            console.log("move")
                                break;
                            case "download":
                             const Obj = _.findDeep(this.state.tree, item => item.id === id, {
                            childrenPath: "children"
                             });
                            this.download( Obj.value.hasOwnProperty("children") ? "folder" : "file"  , Obj.value)
                            break;
                        default:
                        }
                    },
                    itemclick: (item) => {
                        this.setState({ itemid: item.id , itemclicled:item , click:true})
                    },
                    viewer: () => {
                       this.setState({modalpreview: true})
                    },
                    toggleviwer: () => {
                        this.setState({modalpreview: !this.state.modalpreview})
                    }
                }}
            >
                {this.props.children}
            </Context.Provider>
        );
    }
}
