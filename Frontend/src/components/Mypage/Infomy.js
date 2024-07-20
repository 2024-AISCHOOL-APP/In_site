import React from 'react'
import {
  faCommentDots,
  faEnvelope,
  faLock,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Button,Col, Container, Form, InputGroup, Row } from 'react-bootstrap'
import MyDonutChart from './MyDonutChart'
import '../../css/Infomy.css'

const Infomy = () => {
  return (
    <Container>
      <Row>
        <Col className='my-3'>
          <h1>내 정보</h1>
        </Col>
      </Row>
      <Row>
      {/* <Row className="justify-content-md-center"> */}
          <Col lg={6}>

            <Form >
              <InputGroup className="mb-3">
                <InputGroup.Text>
                  <FontAwesomeIcon icon={faUser} />
                </InputGroup.Text>
                <Form.Control
                  type="text"
                  placeholder="아이디"
                  name="mem_id"
                  disabled
                />
              </InputGroup>

              <InputGroup className="mb-3">
                <InputGroup.Text>
                  <FontAwesomeIcon icon={faLock} />
                </InputGroup.Text>
                <Form.Control
                  type="password"
                  placeholder="비밀번호"
                  name="mem_pw"
                />
                <Button className='btnms'>변경</Button>
              </InputGroup>
            
              <InputGroup className="mb-3">
                <InputGroup.Text>
                  <FontAwesomeIcon icon={faEnvelope} />
                </InputGroup.Text>
                <Form.Control
                  type="email"
                  placeholder="이메일"
                  name="mem_email"
                />
                <Button className='btnms'>변경</Button>
              </InputGroup>

              <InputGroup className="mb-3">
                <InputGroup.Text>
                  <FontAwesomeIcon icon={faCommentDots} />
                </InputGroup.Text>
                <Form.Control
                  type="text"
                  placeholder="닉네임"
                  name="mem_na
                  <Button className='btnms'>변경</Button>me"
                />
                <Button className='btnms'>변경</Button>
              </InputGroup>

              <InputGroup className="mb-3">
                <InputGroup.Text>
                  <FontAwesomeIcon icon={faCommentDots} />
                </InputGroup.Text>
                <Form.Control
                  type="text"
                  placeholder="전화번호 (010-xxxx-xxxx)"
                  name="mem_phone"
                  maxLength="13"
                />
                <Button className='btnms'>변경</Button>
              </InputGroup>

              <Button
                variant="success"
                type="submit"
                className="login-button mb-3"
              >
                회원탈퇴
              </Button>
            </Form>
          </Col>

        <Col lg={6} >
          <MyDonutChart/>
        </Col>
      </Row>
    </Container>
   
  )
}

export default Infomy