import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'

export default function pricing() {
    return (
        <div id="pricing">
            <h1 align="center" className="mb-4">Pricing plans</h1>
            <h5 align="center" style={{ margin: "0px 200px" }} className="text-secondary">You can start with our solution Free and pick an advanced plan if you want to take advantage of multiple functionalities and to have a wide storage capacity</h5>
            <div id="card-free" className="card">
                <h2 className="mb-5">FREE</h2>
                <h4>0$</h4>
                <div className="cercle-design"></div>
                <em>PER MONTH</em>
                <button className="btn btn-danger mt-5">See plan <FontAwesomeIcon className="ml-2" icon={faArrowRight} /></button>
            </div>
            <div id="card-gold" className="card">
                <img src="images/star.png" className="center" width="50px" alt="gold-pricing-star" />
                <h2 className="mb-5 mt-3">GOLD</h2>
                <h4>50$</h4>
                <em>PER MONTH</em>
                <button className="btn btn-danger mt-5">See plan <FontAwesomeIcon className="ml-2" icon={faArrowRight} /></button>
            </div>
            <div id="card-pro" className="card">
                <h2 className="mb-5">PRO</h2>
                <h4>20$</h4>
                <em>PER MONTH</em>
                <button className="btn btn-danger mt-5">See plan <FontAwesomeIcon className="ml-2" icon={faArrowRight} /></button>
            </div>
        </div>
    )
}
