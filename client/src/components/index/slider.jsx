import React from 'react'
import { Carousel, Button } from 'react-bootstrap';

export default function Slider() {

      
  return (
  <>
    <Carousel>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="images/01.png"
          alt="First slide"
        />
        <Carousel.Caption>
          <Button variant="danger" size="lg">Get started</Button>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={1500}>
        <img
          className="d-block w-100"
          src="images/03.png"
          alt="Second slide"
        />
        <Carousel.Caption>
          <Button variant="danger" size="lg">Get started</Button>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>

  </>
  )



  
}

