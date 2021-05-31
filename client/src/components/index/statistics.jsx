import React from 'react'

export default function statistics() {
    return (
        <>
            <div id="sections" className="col-12">
                <div className="section col-sm-12 col-md-12 col-lg-4 col-xl-4">
					<img src="images/customers.png" className="statistics-images" alt="file" width="100px" />
                    <h1>Customers</h1> 
                    <h2>+1800</h2>
                </div>
                <div className="section col-sm-12 col-md-12 col-lg-4 col-xl-4">
					<img src="images/collaborators.png" className="statistics-images" alt="file" width="100px" />
                    <h1>Collaborators</h1> 
                    <h2>+33</h2>
                </div>
                <div className="section col-sm-12 col-md-12 col-lg-4 col-xl-4">
					<img src="images/files.png" className="statistics-images" alt="file" width="100px" />
                    <h1>Files stored</h1> 
                    <h2>+20 000</h2>
                </div>
            </div>
        </>
    )
}
