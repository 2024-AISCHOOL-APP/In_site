import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import FullCalendarPage from '../components/FullCalendarPage'

const Schedules = () => {
  let mem_id = window.sessionStorage.getItem('mem_id');


  return (
    <Container className='my-5'>
        <Row>
            <Col className='my-5'>
                <FullCalendarPage mem_id={mem_id}/>
            </Col>
        </Row>
    </Container>
  )
}

export default Schedules