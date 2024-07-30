import React, {useCallback} from 'react'
import { Col, Container, Row, Tabs, Tab } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import Nav from 'react-bootstrap/Nav';

const Money_Tab = () => {

  const navigate = useNavigate();
  const navigateTo = useCallback((path) => navigate(path), [navigate]);
  return (
    <>
    <Container>
      <Row className='mt-4'>
        <Col className='my-3'></Col>
      </Row>
      <Row>
        <Col>
      <Nav variant="underline" defaultActiveKey="/home">
      <Nav.Item>
        <Nav.Link onClick={() => navigateTo("/Mypage/moneys")}>입력</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link onClick={() => navigateTo("/Mypage/moneys/cal")}>캘린더</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link onClick={() => navigateTo("/Mypage/moneys/chart")}>차트</Nav.Link>
      </Nav.Item>
    </Nav>
    </Col>
      </Row>
    </Container>
    </>
  )
}

export default Money_Tab