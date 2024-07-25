import React, { useState } from "react";
import { Col, Card, Button } from "react-bootstrap";
import "../css/Mcard.css";
import { Link } from "react-router-dom";

const Ccard = ({
  store_img,
  store,
  store_idx,
  store_info
}) => {
  return (
    <Col xs={12} sm={6} md={6} lg={3} xl={3} className="mb-4">
         <Card className="product-card">
      <Link to={`/Shop/${store_idx}`}>
          <Card.Img
            variant="top"
            src={store_img}
            alt="Product"
            className="product-image"
          />
        </Link>
        <Card.Body className="card-body-custom">
          <Card.Title className="product-title">{store}</Card.Title>
          <div
            className="review-container"
          >
              <span className="review-text">{store_info}</span>
     
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default Ccard;
