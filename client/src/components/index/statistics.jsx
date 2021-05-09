import React from 'react'
import { Link } from 'react-router-dom'

export default function statistics() {
    return (
        <>
        
            <div id="sections">
                <div className="section">
					<img src="images/customers.png" alt="file" width="100px" />
                    <h1>Customers</h1> 
                    <h2>+1800</h2>
                </div>
                <div className="section">
					<img src="images/collaborators.png" alt="file" width="100px" />
                    <h1>Collaborators</h1> 
                    <h2>+33</h2>
                </div>
                <div className="section">
					<img src="images/files.png" alt="file" width="100px" />
                    <h1>Files stored</h1> 
                    <h2>+20 000</h2>
                </div>
            </div>
        </>
    )
}
