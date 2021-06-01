import React, { Component } from 'react'
import ListElement from './listElement'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSortAlphaUp ,faSortAlphaDown , faThList , faThLarge} from '@fortawesome/free-solid-svg-icons'
export default class List extends Component {
    render() {
        return (
            <div className="">
                <div className="col-12 py-3 px-3 border-bottom  ">
                    <div className=" ml-auto" style={{width:"max-content"}}>
                        <FontAwesomeIcon icon={faThList} className="mr-2 icon p" />
                        <FontAwesomeIcon icon={faThLarge} className="mr-2 icon p" />
                        <FontAwesomeIcon icon={faSortAlphaDown} className="mr-2 icon p"/>
                    </div>
                </div>
                <div className=" col-12 py-3 px-0 border-bottom r " style={{display:"flex"}}>
                    <div className="col-6 ">Name</div>
                    <div className="col-2 ">Type</div>
                    <div className="col-2 ">Size</div>
                    <div className="col-2 ">Created</div>
                </div>
                <ListElement/>
            </div>
        )
    }
}
