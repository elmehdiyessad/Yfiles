import React from 'react'
import { Link } from 'react-router-dom'
import { Navbar, Nav, Form } from 'react-bootstrap'


export default function Menu() {
    return (
        <>
        <Navbar bg="light" expand="lg">
            <Navbar.Brand href="#"><img src="images/yfiles-logo-web.png" className="mypicture" align="center" alt="logo" width="200" /></Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
                <Nav className="mr-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarscroll="true">
                <Nav.Link href="#">Home</Nav.Link>
                <Nav.Link href="#services">Services</Nav.Link>
                <Nav.Link href="#pricing">Pricing</Nav.Link>
                <Nav.Link href="#start-now-section">Get started</Nav.Link>
                </Nav>
                
                <Form className="d-flex mr-2 justify-content-end">
                    <Link to="/login" className="btn btn-primary ml-2" role="button">Login</Link>
                    <Link to="/signup" className="btn btn-danger ml-2" role="button">Sign up</Link>
                </Form>
            </Navbar.Collapse>
            </Navbar>
        </>
    )
}