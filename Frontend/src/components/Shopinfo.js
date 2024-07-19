import React from 'react'
import { Col, Container, Image, Row } from 'react-bootstrap'
import Map from './Map'
import Carousels from './Carousel'

const Shopinfo = () => {
  return (
    <Container>
        <Row className="my-5">
            <Col lg={6} md={12} sm={12} className="t2">
             이 가게의 정보
            </Col>
        </Row>
        <Row className="my-5">
            <Col lg={6}>
                {/* <Image src='img/dmer.jpg'/> */}
                <Carousels/>
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

                    <Image src='img/dmerin.PNG'/>
            </Col>
        </Row>
        
        <Row>            <Col lg={6} md={12} sm={12} className="t2">
             오시는 길
            </Col>
        </Row>
        <Row>
            <Col>
                <Map/>
            </Col>
        </Row>
    </Container>
  )
}

export default Shopinfo