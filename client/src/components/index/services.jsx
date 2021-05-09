import React from 'react'

export default function services() {
    return (
        <>
            <div id="services">
                <div className="service">
					<img src="images/file.png" alt="file" width="100px" />
                    <h1>Organize team files in a shared space</h1> 
                    <p>Use Yfiles shared to store your team’s work in secure, easy-to-manage shared spaces. Any files added to shared are owned collectively by the team, so everyone stays up to date.</p>
                </div>
                <div className="service">
					<img src="images/storage-files.png" alt="file" width="100px" />
                    <h1>Get all the storage capacity you need</h1> 
                    <p>Yfiles provides flexible storage options so you will always have enough space for your files. With centralized administration, data loss prevention, you can easily manage users and file sharing to help meet data compliance needs.</p>
                </div>
                <div className="service">
					<img src="images/share-folder.png" alt="file" width="100px" />
                    <h1>Control how your files are shared.</h1> 
                    <p>Keep files private until you decide to share them. Avoid multiple versions and file merging by granting others permission to download, edit, comment, or view. You can also give shared files an expiration date.</p>
                </div>
            </div>
        </>
    )
}