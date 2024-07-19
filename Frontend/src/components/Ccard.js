import React, { useState } from "react";
import { Col, Card, Button } from "react-bootstrap";
import "../css/Mcard.css";
import { Link } from "react-router-dom";

const Ccard = ({
  wed_img,
  wed,
  wed_seq
}) => {
  return (
    <Col xs={12} sm={6} md={6} lg={3} xl={3} className="mb-4">
      <Card className="product-card">
      {/* <Link to={`/rboard/${wed_seq}`}> */}
      <Link to={'/Shop'}>
          <Card.Img
            variant="top"
            src={wed_img}
            alt="Product"
            className="product-image"
          />
        </Link>
        <Card.Body className="card-body-custom">
          <Card.Title className="product-title">{wed}</Card.Title>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default Ccard;
