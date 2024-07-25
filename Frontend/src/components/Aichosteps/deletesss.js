import React, { useCallback, useEffect, useState } from "react";
import { Col, Container, Row, Button, Card } from "react-bootstrap";
import "../../css/Aichost.css";
import { useNavigate } from "react-router-dom";
import { useContext } from 'react';
import { Appdata } from '../../App';



const Aistep3 = () => {
  const venues = [
    "일반/컨벤션홀",
    "호텔",
    "하우스 웨딩홀",
    "채플웨딩홀",
    "야외웨딩홀",
    "한옥웨딩",
  ];
  const data = useContext(Appdata);

  console.log(data);

  const navigate = useNavigate();
  const [selectedBox, setSelectedBox] = useState(null);

  const navigateTo = useCallback((path) => navigate(path), [navigate]);

  const handleBoxClick = (venue) => {
    setSelectedBox(venue);
  };

  console.log(selectedBox);

  function Back(){
    navigateTo(-1)
  }


  function Next(){
    navigateTo("/Aichoice/2/3/4")
  }


  useEffect(()=>{
  if(selectedBox!== '') {
    
    let result ={
        lref : data.shareData.lref,
        sref : data.shareData.sref,
        dates : data.shareData.dates,
        times : data.shareData.times,
        moneys : data.shareData.moneys,
        selectedBox :selectedBox
    }
    
    data.setShare(result)
}
},[selectedBox])

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
            <Row className="my-4 text-center">
              {venues.map((venue, index) => (
                <Col xs={12} sm={6} md={6} lg={4} key={index} className="mb-3">
                  <Card
                    className={`hover-card text-center square-card ${
                      selectedBox === venue ? "active" : ""
                    }`}
                    onClick={() => handleBoxClick(venue)}
                  >
                    <Card.Body>
                      <Card.Text className="box_title">{venue}</Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
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

export default Aistep3;
