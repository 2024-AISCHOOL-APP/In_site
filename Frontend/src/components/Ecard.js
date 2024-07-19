import React, { useState } from "react";
import { Col, Card, Row} from "react-bootstrap";

import "../css/Mcard.css"; 
import { Link } from "react-router-dom";

const Ecard = ({
  shoe_img,
  positivePercentage,
  negativePercentage,
  reviewCount,
  shoe,
  reviews,
  shoe_seq
}) => {

 
  return (
    <Row xs={1} md={2} className="g-4">
      {Array.from({ length: 4 }).map((_, idx) => (
        <Col key={idx}>
          <Card  style={{borderRadius:'50px'}}>
            <Card.Img variant="top" src="img/eeeee.jpg"  style={{borderTopRightRadius:'50px',borderTopLeftRadius:'50px'}} />
            <Card.Body>
              <Card.Title>이벤트 제목</Card.Title>
              <Card.Text>
                  이벤트 날짜
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default Ecard;
