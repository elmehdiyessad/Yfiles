import React from 'react'
import { Carousel, Button } from 'react-bootstrap';

export default function Slider() {

      
  return (
  <>
    <Carousel style={{ marginBottom: "30px" }}>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="images/01.png"
          alt="First slide"
        />
        <Carousel.Caption>
          <Button variant="dark" size="lg">Get started now</Button>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={1500}>
        <img
          className="d-block w-100"
          src="images/03.png"
          alt="Second slide"
        />
        <Carousel.Caption>
          <Button variant="danger" size="lg">Get started now</Button>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>

  </>
  )



  
}

