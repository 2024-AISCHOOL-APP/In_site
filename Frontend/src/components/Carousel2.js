import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/Carousels2.css";

const Carousel2 = () => {
  const [mainImage, setMainImage] = useState("/img/dmer.jpg");

  const thumbnailImages = [
    "/img/mig.png",
    "/img/dmer.jpg",
    "/img/main3.png",
    "/img/mig.png",
  ];

  const handleThumbnailClick = (imageSrc) => {
    setMainImage(imageSrc);
  };

  return (
    <Container>
      <Row>
        <Col md={6}>
          <div className="main-content">
            <img src={mainImage} alt="Main" className="main-image" />
          </div>
        </Col>
        <Col md={6}>
          <div className="main-text">
            <h3>Main Image Title</h3>
            <p>
              This is the description for the main image. It can be a detailed
              text about the image content or any other relevant information.
            </p>
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
          <div className="thumbnail-container">
            {thumbnailImages.map((thumb, index) => (
              <img
                key={index}
                className="thumbnail-img"
                src={thumb}
                alt={`Thumbnail ${index}`}
                onClick={() => handleThumbnailClick(thumb)}
              />
            ))}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Carousel2;
