import React from 'react'

export default function statistics() {
    return (
        <>
            <div id="sections" className="col-12 row">
                <h1 align="center" className="mb-4" style={{ marginTop: "90px" }}>Our collaborations</h1>
                <h5 align="center" className="text-secondary">More than +1800 users around the world</h5>
                
                <div className="section col-12 col-sm-12 col-md-12 col-lg-4 col-xl-4">
					<img src="images/customers.png" className="statistics-images" alt="file" width="70px" />
                    <h1>Customers</h1> 
                    <h2>+1800</h2>
                </div>
                <div className="section col-12 col-sm-12 col-md-12 col-lg-4 col-xl-4">
					<img src="images/collaborators.png" className="statistics-images" alt="file" width="80px" />
                    <h1>Collaborators</h1> 
                    <h2>+33</h2>
                </div>
                <div className="section col-12 col-sm-12 col-md-12 col-lg-4 col-xl-4">
					<img src="images/files.png" className="statistics-images" alt="file" width="70px" />
                    <h1>Files stored</h1> 
                    <h2>+20 000</h2>
                </div>
            </div>
        </>
    )
}
