import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import MyDonutChart from './MyDonutChart';


const Moneys = () => {
  return (
    <Container>
      <Row>
        <Col className='my-3'>
          <h1>가계부</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <MyDonutChart/>
        </Col>
      </Row>
      <Row>
        <Col lg={6}>
          <MyDonutChart/>
        </Col>
        <Col lg={6}>
          <MyDonutChart/>
        </Col>
      </Row>
    </Container>
  );
};

export default Moneys;
