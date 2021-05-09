import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFolder , faFileAlt , faFileImage} from '@fortawesome/free-solid-svg-icons'
class ListElement extends Component {
    render() {
        return (
            <div>
            <div className="py-3 pl-0 border-bottom d-flex">
                    <div className="col-6"><FontAwesomeIcon icon={faFolder} className="mr-2 icon"/>Folder1</div>
                    <div className="col-2">Folder</div>
                    <div className="col-2">-</div>
                    <div className="col-2">19/04/2021</div>
            </div>
               <div className="py-3 pl-0 border-bottom d-flex">
                    <div className="col-6"><FontAwesomeIcon icon={faFolder} className="mr-2 icon"/>Folder2</div>
                    <div className="col-2">Folder</div>
                    <div className="col-2">-</div>
                    <div className="col-2">19/04/2021</div>
            </div>
               <div className="py-3 pl-0 border-bottom d-flex">
                    <div className="col-6"><FontAwesomeIcon icon={faFileAlt} className="mr-2 icon"/>File.txt</div>
                    <div className="col-2">Text file</div>
                    <div className="col-2">13 Mo</div>
                    <div className="col-2">19/04/2021</div>
                </div>
                 <div className="py-3 pl-0 border-bottom d-flex">
                    <div className="col-6"><FontAwesomeIcon icon={faFileImage} className="mr-2 icon"/>Image.png</div>
                    <div className="col-2">Image file</div>
                    <div className="col-2">20 ko</div>
                    <div className="col-2">19/04/2021</div>
                </div>
            </div>
        );
    }
}

export default ListElement;