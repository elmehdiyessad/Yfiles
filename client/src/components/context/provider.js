import React, { Component } from 'react';
import Context from './context';
import _ from "lodash";
import deepdash from "deepdash";
import { db , storageRef , auth} from '../../firebase'
import JSZIP from "jszip"
import FileSaver from 'file-saver';
deepdash(_);
 
export default class Provider extends Component {
    constructor(props) {
        super(props)
        this.state = {
            tree: {
                children: []
            },
            currentfolder: [],
            s: [],
            iss: false,
            currentObj: {},
            file: null,
            progress:0,
            downloadURL: null,
            show: false,
            itemid: null,
            itemclicled: {
                url:""
            },
            click: false,
            modalpreview: false,
            movefolders: {
                children: []
            },
            modalmove: false,
            IdItemtoMove: "",
            user: { uid: "" },
            usedtorage: 0
        };
       this.deleteFromTree = this.deleteFromTree.bind(this)
    }

 
    
  getUsedStockage = () => {
    var size = 0
    var listRef = storageRef.child(this.state.user.uid);

// Find all the prefixes and items.
    listRef.listAll()
      .then((res) => {
        if (res.items.length === 0) {
          this.setState({ size: 0, totalsize: "0 B" })
          return
     }
    res.items.forEach((itemRef) => {
      // All the items under listRef.
      itemRef.getMetadata().then((metadata) => {
        size = size + metadata.size
        var _size = size
        var fSExt = new Array('Bytes', 'KB', 'MB', 'GB'),
        i=0;while(_size>900){_size/=1024;i++;}
        var totalsize = (Math.round(_size * 100) / 100) 
        this.setState({ usedtorage: totalsize  })
      })
    });
       
  }).catch((error) => {
    // Uh-oh, an error occurred!
  })
}
    componentDidMount() {
        auth.onAuthStateChanged((user) => {
        if(user == null){
            //history.push('/login')
        }else{
            this.setState({user:  user})         
    
        db.collection('files').doc(this.state.user.uid).get()
        .then((docSnapshot) => {
            if (!docSnapshot.exists) {
             db.collection("files").doc(this.state.user.uid).set({
                files: {
                children: [],
                id: this.state.user.uid,
                module: "root"
                },
                uid_user:this.state.user.uid
            })
            }
            if (docSnapshot.exists) { 
                db.collection("files").doc(this.state.user.uid).onSnapshot(snap => {
                    this.getUsedStockage()
                    this.setState({
                        tree: snap.data().files,
                        movefolders: snap.data().files
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
            }
        }).catch((error) => {
            console.log(error);
        })
   
            }
    })
     /*   db.collection("files").doc("6SjQdknzyKiEnGdGi58A").onSnapshot(snap => {
         console.log("get");
             db.collection("files").doc("lxK4KkEkcLPxOR0UZJotLlDo4Bs2").set(snap.data())
         })*/
            
    }
    
    gettype = (type) => {
        
        
            if (type.includes('audio/'))
                return("audio")
            
            if (type.startsWith('image/'))
                return("image")
            
            if (type.includes('video/'))
                return("video")
            
            if (type === 'text/plain')
                return("text file")
            
            if (type === 'application/json')
                return("json file")
            
            if (type === 'application/pdf')
                return("PDF file")
            
            if (type === 'application/x-zip-compressed')
                return("ZIP file")
            
            if (type === 'text/css')
                return("CSS file")
            
            if (type === 'text/javascript')
                return("JS file")
            
            if (type === 'text/html')
                return("HTML file")
            
            if (type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
                return ("Excel Document")
            
            if (type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document')
                return ("Word Document")
            
            if (type === 'application/vnd.openxmlformats-officedocument.presentationml.presentation')
                return ("PowerPoint")
                
            else
                return "file"
    
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
          if (a.children[index].hasOwnProperty("children")) {
              _.mapDeep(a.children[index], (i) => {
                    if (i.path) {
                        var desertRef = storageRef.child(i.path);
                        // Delete the file
                        desertRef.delete().then(() => {
                        console.log("sub files deleted")
                        }).catch((error) => {
                        // Uh-oh, an error occurred!
                        });
                    }
              },
                {childrenPath: "children"}  
              )
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

    
deletemove = (o, id , path) => { //o=object tree , id=string
  //////////////////////////////
   let getNode = (a, i) =>{ // a=aray element , i = index element
    if (a.id === id) {
      index = i; //get the index of the element a
      return true; //return true if the id element (a) is equal to the id passed in params of (deleteFromTree) fct
    }
    if (Array.isArray(a.children) && a.children.some(getNode)) {// Array.some test the condition getNode
      if (~index) { // false when index=-1 (element not found)       
          a.children.splice(index, 1);
          console.log(o);
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
       var day = (date.getDate() < 10) ? `0${date.getDate()}` : date.getDate()
        var _size = file.size;
        var fSExt = new Array('Bytes', 'KB', 'MB', 'GB'),
        i=0;while(_size>900){_size/=1024;i++;}
        var exactSize = (Math.round(_size*100)/100)+' '+fSExt[i];
        const newItem = {
            id: `root-${Date.now()}`,
            creationdate: `${day}/${mounth}/${date.getFullYear()}`,
            module: file.name ,
            leaf: true,
            size: exactSize,
            type: this.gettype(file.type),
            contentType: file.type,
            url: fileurl,
            path: filepath,
         }
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
      db.collection("files").doc(this.state.user.uid).update({
              "files":this.state.tree
          })
      if(this.state.progress === 100) this.setState({ show: false })
    
  };
 

    updatedb() {
        db.collection("files").doc(this.state.user.uid).update({
            "files":this.state.tree
        })
    }
 
async getFileFromUrl (url, name, type) {
    const response = await fetch(url, {
        mode: 'no-cors',
      responseType: 'blob',   
  });
  const data = await response.blob();
  return new File([data], name, {
    type: type,
  });
    }
    async findfile(folder) {
    var zip = JSZIP()
    let array = []
    let r = await _.mapDeep(folder, (i) => {
                    if (i.path) {          
                            this.getFileFromUrl(i.url , i.module, i.contentType).then(f => {
                               // console.log(f); 
                               array.push(f) 
                               zip.file(i.module, f)
                            }).then(() => {
                                zip.generateAsync({type:"blob"}).then(function(content) {             
                               FileSaver.saveAs(content, folder.module);
                            });
                            })
                        
                    }
              },
             {
                 childrenPath: "children",
                 
        })
        return array

}
    download = (itemtype, item) => {
    if (itemtype === "file") {
        window.open(item.url)                     
      }
      if (itemtype === "folder") {
                 
          this.findfile(item).then((array) => {
            console.log(array.length);
          })
         
         
        }
        
    }

    move = (id, folder) => {
        var tree = this.state.tree
        var exist = false
        folder.children.forEach((item) => {
            if (item.id === id) { exist = true; return}
        })
        if (id === folder.id) { window.alert("Cannot move to this folder"); return}
        if(exist === true) { window.alert("File already exist in this folder") }
        if (exist === false) {
            //////////////////////////////find/////////////////
            const moveObj = _.findDeep(tree, item => item.id === id, {
                childrenPath: "children"
            });
            //////////////////////////////////////////delete
            this.deletemove(tree, id);
            this.setState({ tree });
            tree = this.state.tree
            /////////////////////////add///////////
            const newTree = _.mapDeep(tree , (item, key, parentValue) => {
                const cloneItem = Object.assign({}, item);
                if (cloneItem) {
                    if (cloneItem.id === folder.id) {
                        cloneItem.children.push(moveObj.value);
                    }
                }
                return item;
            }
                , { childrenPath: "children" }
            );
            this.setState({ tree: newTree[Object.keys(newTree)[0]] });
            this.updatedb()
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
                    movefolders: this.state.movefolders,
                    modalmove: this.state.modalmove,
                    user: this.state.user,
                    toggle: () => { this.setState({ show: !this.state.show }) },
                    navigatemove: (folder) => {
                        this.setState({
                            movefolders: folder
                        })
                    },
                    handleInput: (e) => {
                        if (window.innerWidth <= 768 && document.querySelector(".sidebar").style.display === "block") {
                        document.querySelector(".button-menu").style.display = "block"
                        document.querySelector(".sidebar").style.display= "none"
                        }
                        if (e.target.files[0]) {                       
                            let file = e.target.files[0];
                            if (file.size + this.state.usedtorage > 30000000) { alert("Insufficient storage"); console.log(file.size + this.state.usedtorage)}
                            if(file.size + this.state.usedtorage <= 30000000){
                            var uploadref = storageRef.child(`${this.state.user.uid}/` + file.name)
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
                        }                
                    },
                    setCurrentFolder: id => {
                        this.setState({ iss: false })
                        const renameObj = _.findDeep(this.state.tree, item => item.id === id, {
                            childrenPath: "children"
                        });
                        if (renameObj.value.hasOwnProperty("children")) {
                        if (window.innerWidth <= 768 && document.querySelector(".sidebar").style.display === "block") {
                            document.querySelector(".button-menu").style.display = "block"
                            document.querySelector(".sidebar").style.display= "none"
                            }
                        this.setState({ iss: false })
                        this.setState({ currentfolder: renameObj.value.children , currentObj:renameObj.value })
                    }
                    },
                    search: s => {
                        if (s !== "" && s !== null) {
                            this.setState({ iss: true })
                            var a = []
                         _.eachDeep(this.state.tree, (value) => {
                        if (value.module?.toLocaleLowerCase().includes(s) && value.id !== "root-0" ) a.push(value)
                        }, { childrenPath: "children" });
                         this.setState({ s: a })
                        }
                    if(s === "" || s===null)  this.setState({s: [] , iss: false })
                    },
                     handleContextClick : (e, { action, name: id }) => {
                        if (window.innerWidth <= 768 && document.querySelector(".sidebar").style.display === "block") {
                      
                        document.querySelector(".button-menu").style.display = "block"
                        document.querySelector(".sidebar").style.display= "none"
                        }
                         const { tree } = this.state;
                        switch (action) {
                            case "rename":
                                const renameObj = _.findDeep(tree, item => item.id === id, { childrenPath: "children" });
                                const response = prompt("Please rename", renameObj.value.module);
                                if (response === "" || response === null || response === undefined || response.length === 0) { return; }
                                else {
                                    renameObj.value.module = response;
                                    this.setState(_.mapDeep(tree, item => item.id === id ? { ...item, ...renameObj.value } : item, { childrenPath: "children" }));
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
                                this.setState({ modalmove: true , IdItemtoMove:id })
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
                    },
                    moveitem: ( folder) => {
                        this.move(this.state.IdItemtoMove, this.state.movefolders)
                        this.setState({ modalmove: false, IdItemtoMove: "" })
                        //this.updatedb()
                    }
                }}
            >
                {this.props.children}
            </Context.Provider>
        );
    }
}
