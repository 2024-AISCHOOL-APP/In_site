import React, { useEffect, useState } from 'react'
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
import axios from "../../axios";

const Infomy = () => {

  const [InfoMydata,setInfoMydata] = useState('');
  const [InfoId,setInfoId] = useState('');
  const [InfoEmail,setInfoEmail] = useState('');
  const [InfoNick,setInfoNick] = useState('');
  const [InfoPhon,setInfoPhon] = useState('');
  const [InfoPw,setInfoPw] = useState('');


  let mem_id = window.sessionStorage.getItem('mem_id')
  
  useEffect(() => {
    axios.get(`/Myinfo/${mem_id}`)
      .then((res) => {
        setInfoId(res.data.Myinfo[0].mem_id)
        setInfoEmail(res.data.Myinfo[0].mem_email)
        setInfoNick(res.data.Myinfo[0].mem_nick)
        setInfoPhon(res.data.Myinfo[0].mem_phone)
        setInfoPw(res.data.Myinfo[0].mem_pw)

        console.log("내 정보",res.data.Myinfo);
      })
      .catch((error) => {
        console.error("Error fetching events:", error);
      });
  }, []);
  console.log(InfoMydata);

  function Upbutton(){
  if(InfoEmail !='' && InfoPw !='' && InfoNick !=''&& InfoPhon !=''){
    alert('정보변경되었습니다')
  }else{
    alert('값을 써주세요')
  }
}
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
                  value={InfoId}
                 
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
                  onChange={(e) => setInfoPw(e.target.value)}

                />
                {/* <Button className='btnms'>변경</Button> */}
              </InputGroup>
            
              <InputGroup className="mb-3">
                <InputGroup.Text>
                  <FontAwesomeIcon icon={faEnvelope} />
                </InputGroup.Text>
                <Form.Control
                  type="email"
                  placeholder="이메일"
                  name="mem_email"
                  value={InfoEmail}
                  onChange={(e) => setInfoEmail(e.target.value)}
                />
                {/* <Button className='btnms'>변경</Button> */}
              </InputGroup>

              <InputGroup className="mb-3">
                <InputGroup.Text>
                  <FontAwesomeIcon icon={faCommentDots} />
                </InputGroup.Text>
                <Form.Control
                  type="text"
                  placeholder="닉네임"
                  name="mem_nick"
                  value={InfoNick}
                />
                {/* <Button className='btnms'>변경</Button> */}
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
                  value={InfoPhon}
                />
                {/* <Button className='btnms'>변경</Button> */}
              </InputGroup>
              <Row>
                <Col lg={6}>
              <Button
                variant="success"
                type="submit"
                className="login-button mb-3"
                onClick={Upbutton()}
              >
                정보변경
              </Button>
              </Col>
              <Col lg={6}>
              <Button
                variant="success"
                type="submit"
                className="login-button mb-3"
              >
                회원탈퇴
              </Button>
              </Col>
              </Row>
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