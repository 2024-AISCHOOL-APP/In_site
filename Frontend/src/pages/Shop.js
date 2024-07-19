import React from 'react'
import { Container,Row,Col } from 'react-bootstrap'
import Stops from '../components/Stop'
import Snavs from '../components/Snavs'
import { Outlet } from 'react-router-dom'


const Shop = () => {
  return (
    <Container className='my-5'>
        <Row>
            <Col>
                <Stops/>
            </Col>
        </Row>

                <Snavs/>
                <Outlet/>

    </Container>
  )
}

export default Shop