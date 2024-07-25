import React, { useCallback, useEffect, useRef, useState } from "react";
import { Col, Container, Row, Button, Card, Form } from "react-bootstrap";
import "../../css/Aichost.css";
import { useNavigate } from "react-router-dom";
import { useContext } from 'react';
import { Appdata } from '../../App';


const Aistep3 = () => {

  const [persons,setPersons] = useState('');
  const [pluspersons,setplusPersons] = useState('');

  const navigate = useNavigate();
  
  const navigateTo = useCallback((path) => navigate(path), [navigate]);

  const data = useContext(Appdata);

  let perefs = useRef();
  let moneysref = useRef();


  console.log(data,"4단게");

  function Back(){
    navigateTo(-1)
  }


  function Next(){
    setPersons(perefs.current.value)
    setplusPersons(moneysref.current.value)

  }


  useEffect(()=>{
  if(persons!== '' && pluspersons!== '') {
    
    let result ={
      lref : data.shareData.lref,
      sref : data.shareData.sref,
      dates : data.shareData.dates,
      times : data.shareData.times,
      moneys : data.shareData.moneys,
        persons : persons,
        pluspersons : pluspersons,
    }
    navigateTo("/Aichoice/2/3/4/")
    data.setShare(result)
}
},[persons,pluspersons])

  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card className="m-auto">
            <Row>
              <Col className="Qtitle">Q 03.</Col>
            </Row>
            <Row className="my-2">
              <Col className="Qti2">
                예식을 원하는 희망날짜와 시간을 선택 해주세요
              </Col>
            </Row>
            <Row className="my-3">
              <Col className="Qtit3">예상 하객수를 알려주세요</Col>
            </Row>

            <Row>
              <Col md={11} sm={10} xs={10} className="m-auto">
              <Form.Select  ref={perefs}>
                  <option>200명 이하</option>
                  <option>200명 ~ 250명</option>
                  <option>250명 ~ 300명</option>
                  <option>300명 ~ 350명</option>
                  <option>350명 이상</option>
                </Form.Select>
                {/* <Form.Control type="number" ref={peref} /> */}
              </Col>
            </Row>

            <Row className="my-5">
              <Col> 
            <Row className="my-2" >
              <Col className="Qtit3">예상 하객수에 맞는 일정이 없을 경우 조정이 가능하신가요?</Col>
            </Row>

            <Row >
              <Col md={11} sm={10} xs={10} className="m-auto">
              <Form.Select  ref={moneysref}>
                  <option>YES</option>
                  <option>NO</option>
                </Form.Select>
                {/* <Form.Control type="number" ref={perefs} /> */}
              </Col>
            </Row>
            </Col></Row>
            <Row>
              <Col className="my-5 text-center">
              <Button  onClick={Back} className="me-4 btns">취소</Button>
              <Button  onClick={Next} className="me-4 btns">다음</Button>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Aistep3;
