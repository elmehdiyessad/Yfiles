import React, { Component } from 'react'
import ListElement from './ListElement'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSortAlphaUp ,faSortAlphaDown , faThList , faThLarge} from '@fortawesome/free-solid-svg-icons'
export default class List extends Component {
    render() {
        return (
            <div>
                <div className="col-12 py-3 px-4 border-bottom">
                    <div className="float-end ml-auto" style={{width:"max-content"}}>
                        <FontAwesomeIcon icon={faThList} className="mr-2 icon" />
                        <FontAwesomeIcon icon={faThLarge} className="mr-2 icon" />
                        <FontAwesomeIcon icon={faSortAlphaDown} className="mr-2 icon"/>
                    </div>
                </div>
                <div className="py-3 pl-0 border-bottom d-flex">
                    <div className="col-6">Name</div>
                    <div className="col-2">Type</div>
                    <div className="col-2">Size</div>
                    <div className="col-2">Created</div>
                </div>
                <ListElement/>
            </div>
        )
    }
}
