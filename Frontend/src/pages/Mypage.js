import React from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';
import Mypnavs from '../components/Mypage/Mypnavs';



const Mypage = () => {



    return (
      <Container className='my-5'>
          <Row>
              <Col className='my-3' >
                  {/* <FullCalendarPage mem_id={mem_id}/> */}
                  <h1>마이페이지</h1>
              </Col>
          </Row>
          <Mypnavs/>
          <Outlet/>
      </Container>
    )
}

export default Mypage