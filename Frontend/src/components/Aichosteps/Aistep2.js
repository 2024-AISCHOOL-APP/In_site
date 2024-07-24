import React, { useCallback, useEffect, useRef, useState } from "react";
import { Col, Container, Row, Form, Button, Card } from "react-bootstrap";
import "../../css/Aichost.css";
import { useNavigate } from "react-router-dom";
import { useContext } from 'react';
import { Appdata } from '../../App';

const Aistep2 = () => {

  const [dates,setDates] = useState('')
  const [times,setTimes] = useState('')
  const [moneys,setMoneys] = useState(0)

  let datesref = useRef();
  let timesref = useRef();
  let moneysref = useRef();
  const navigate = useNavigate();

  const navigateTo = useCallback((path) => navigate(path), [navigate]);

  const data = useContext(Appdata);

  console.log(data.shareData.lref);

  function Back(){
    navigateTo(-1)
  }


  function Next(){
    setDates(datesref.current.value)
    setTimes(timesref.current.value)
    setMoneys(moneysref.current.value)

  }


  useEffect(()=>{
  if(dates!== ''&& times !=='' && moneys !=='') {
    
    let result ={
        lref : data.shareData.lref,
        sref : data.shareData.sref,
        dates : dates,
        times : times,
        moneys : moneys
    }
    navigateTo("/Aichoice/2/3")
    data.setShare(result)
}
},[dates,times,moneys])

  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <Card className="m-auto">
            <Row>
              <Col className="Qtitle">Q 02.</Col>
            </Row>
            <Row className="my-2">
              <Col className="Qti2">
                예식을 원하는 희망날짜와 시간을 선택 해주세요
              </Col>
            </Row>
            <Row className="my-3">
              <Col className="Qtit3">날짜를 선택 해주세요</Col>
            </Row>

            <Row>
              <Col md={11} sm={10} xs={10} className="m-auto">
                <Form.Control type="date" className="my-3" ref={datesref} />
              </Col>
            </Row>
            <Row className="my-3">
              <Col className="Qtit3">시간을 선택 해주세요</Col>
            </Row>

            <Row>
              <Col md={11} sm={10} xs={10} className="m-auto">
                <Form.Control type="time" className="my-3" ref={timesref} />
              </Col>
            </Row>
            <Row className="my-3">
              <Col className="Qtit3">예상 금액을 적어주세요</Col>
            </Row>

            <Row>
              <Col md={11} sm={10} xs={10} className="m-auto">
              <Form.Select  ref={moneysref}>
                  <option>400만원 이하</option>
                  <option>400만원 ~ 500만원</option>
                  <option>500만원 ~ 600만원</option>
                  <option>600만원 ~ 700만원</option>
                  <option>700만원 이상</option>
                </Form.Select>
                {/* <Form.Control type="number" className="my-3"  ref={moneysref}/> */}
              </Col>
            </Row>

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

export default Aistep2;
