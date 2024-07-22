import React from "react";
import { Button, Col, Container, Form, Image, InputGroup, Row } from "react-bootstrap";
import Map from "./Map";
import Carousels from "./Carousel";
import "../css/Shopinfo.css"
import {
    faCommentDots
  } from "@fortawesome/free-solid-svg-icons";
  import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Shopinfo = () => {
  return (
    <Container>
      <Row className="my-5">
        <Col lg={12} md={12} sm={12} className="t2">
          갤러리
        </Col>
      </Row>
      <Row className="my-5 d-flex justify-content-center">
        <Col lg={12} md={12} sm={12} className="t2">
          <Carousels />
        </Col>
      </Row>
      <Row className="my-5">
        <Col lg={6} md={12} sm={12} className="t2">
          정보
        </Col>
      </Row>
      <Row className="my-5">
        <Col lg={6}>
          {/* <Image src='img/dmer.jpg'/> */}
          {/* <Carousels/> */}
        </Col>
        <Col lg={6}>
          {/* <h2>The Unrivaled Wedding</h2>
                <h2>독보적인 웨딩 메리트, 드메르 웨딩홀</h2>
                웨딩 트렌드의 대표 주자로
                오랜 시간 주목받고 있는 드메르 웨딩홀은
                브랜드 건축, 프리미엄 홀, 퍼스트 클래스 서비스까지
                오직 당신의 순간을 위해 최상의 수준을 고집하고 있습니다.

                모든 고객분들이 드메르웨딩홀에서
                가장 소중한 날을, 생애 최고의 추억으로
                간직하길 바라는 마음으로
                최상의 컨텐츠만을
                엄선하여 준비하고 있습니다.

                광주 최대 규모의 단독 웨딩홀 드메르웨딩홀이
                다신 없을 인생 최고의 순간을 선사하겠습니다 */}

          <Image src="img/dmerin.PNG" />
        </Col>
      </Row>
      <Row>
        <Col lg={6} md={6} sm={12} className="t2">
         
         <Row>
              <Col>
                <Form.Select>
                  <option>1층 르씨엘홀</option>
                  <option>2층 00홀</option>
                  <option>3층 00홀</option>
                  <option>4층 00홀</option>
                  <option>5층 00홀</option>
                </Form.Select>
              </Col>
            </Row>
            <Row>
                <Col>
                    <p className="smoneys">하객수 : 000명</p>
                </Col>
            </Row>
            <Row>
                <Col>
                    <p className="smoneys">가격 : 00000원</p>
                </Col>
            </Row>
            <Row className="g-0"> 
                <Col lg={4} md={5} sm={4} xs={4} >
                    <p className="sdates">일정 : </p>
                </Col>
                <Col lg={8} md={7} sm={8} xs={8} >
                <Form.Control type="date"/>
                </Col>
            </Row>


            <Button
                variant="success"
                type="submit"
                className="login-button mb-3"
              >
                장바구니
              </Button>
        </Col>
        <Col lg={6} md={6} sm={12} className="login-form-container" >

            <h3 className="my-5">웨딩홀 방문 신청</h3>
            <p className="t2bs">연락처를 남겨주세요</p>
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
              </InputGroup>

              <Button
                variant="success"
                type="submit"
                className="login-button"
              >
                웨딩홀 방문 신청
              </Button>
      
        </Col>
      </Row>
      <Row>

        <Col lg={6} md={12} sm={12} className="t2">
          오시는 길
        </Col>
      </Row>
      <Row>
        <Col>
          <Map />
        </Col>
      </Row>
    </Container>
  );
};

export default Shopinfo;
