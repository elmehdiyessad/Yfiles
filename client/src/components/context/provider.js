import React, { Component } from 'react';
import Context from './context';
import initialTree from "../FileManager/tree"
import _ from "lodash";
import deepdash from "deepdash";
import { createGlobalStyle } from 'styled-components';
deepdash(_);
export default class Provider extends Component {
    state = {
        tree: {
    ...initialTree
        },
        currentfolder: initialTree.children,
        s: [],
        iss: false
    };

   
    render() {
        return (
            <Context.Provider
                value={{
                    tree: this.state.tree,
                    currentfolder: this.state.currentfolder,
                    s: this.state.s,
                    iss:this.state.iss,
                    setCurrentFolder: id => {
                        this.setState({iss: false})
                      const renameObj = _.findDeep(this.state.tree, item => item.id === id, {
                        childrenPath: "children"
                      });
                        if (renameObj.value.hasOwnProperty("children"))
                        this.setState({iss: false})
                         this.setState({ currentfolder: renameObj.value.children})                      
                    },
                    search: s => {
                        if (s != "" && s != null) {
                            this.setState({ iss: true })
                        var a = []
                        var f = _.eachDeep(this.state.tree, (value) => {
                        if (value.module.toLocaleLowerCase().includes(s) && value.id != "root-0" ) a.push(value)
                        }, { childrenPath: "children" });
                         this.setState({ s: a })
                         console.log(a)
                        }
                    if(s == "" || s==null)  this.setState({s: [] , iss: false })
                }
                }}
            >
                {this.props.children}
            </Context.Provider>
        );
    }
}
