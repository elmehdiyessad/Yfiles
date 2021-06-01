import React from 'react'
import { Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'


export default function startnow() {
    return (
        <>
            <div className="col-12" id="start-now-section">
                <h1>Start now</h1>
                <h4>If you need help there's 24/7 email, chat, and phone support from a real person, Please create an account to get started</h4>
                <Button href="/login" variant="danger" size="lg"> Get started <FontAwesomeIcon className="ml-2" icon={faArrowRight} /></Button>
                
            </div>
            
        </>
    )
}
