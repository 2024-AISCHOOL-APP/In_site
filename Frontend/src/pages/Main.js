import { Container, Row, Col, Button } from "react-bootstrap";
import Carousels from "../components/Carousel";
import "aos/dist/aos.css";
import React, { useCallback, useEffect, useState } from "react";
import AOS from "aos";
import axios from "../axios";
import { Link, useNavigate } from "react-router-dom";

import "../css/Main.css";
import Mcard from "../components/Mcard";
import Mnav from "../components/Mnav";

function Main() {

  const navigate = useNavigate();
  const navigateTo = useCallback((path) => navigate(path), [navigate]);


  const [categorys, setCategorys] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState({
    category_idx: "",
    category_p_name: "",
    category_name: "웨딩홀"
  });
  
  const handleCategorySelect = (selectedCategory) => {
    setSelectedCategory({
      category_idx: selectedCategory.category_idx,
      category_p_name: selectedCategory.category_p_name,
      category_name: selectedCategory.category_name, // 클릭된 카테고리의 이름으로 업데이트
    });
    
  };



  
  useEffect(() => {
    const fetchCa = () => {
    
      let apiUrl = "/Category/wedding";

      
      if (selectedCategory.category_p_name) {
        apiUrl = `/Category/${selectedCategory.category_p_name}`;
        console.log(selectedCategory.category_p_name,"클릭 되서 나오니?");
      }

      axios
        .get(apiUrl)
        .then((response) => {
          setCategorys(response.data.Categorys);
          console.log(response.data.Categorys,"카테고리스 웨딩");
          
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    };
    fetchCa();
    AOS.init();
  }, [selectedCategory.category_p_name]);

  return (
    <>
      <Container fluid className="p-0">
        <Row noGutters>
          <Col>
            <div className="video-container">
              <video className="video-content" muted autoPlay loop>
                <source src="/videos/test.mp4" type="video/mp4" />
              </video>
              <div className="video-overlay">
                <h1>The First Step To Happiness</h1>
                <p>평생을 함께 할 당신의 이 순간을 아름답게</p>
                <Button onClick={() => navigateTo("/Aichoice")}>
                  시작하기
                </Button>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
      <Container className="mt-4">
        <Row className="my-3">
          <Col className="carou">
            <Carousels />
          </Col>
        </Row>
        <Row>
          <Col>
            <Mnav  onCategorySelect={handleCategorySelect} />
          </Col>
        </Row>
        <Row className="mt-4">
          <Col lg={6} md={12} sm={12} className="t2">
          {selectedCategory.category_name}          
          </Col>
          <Col
            lg={12}
            md={12}
            sm={12}
            className="text-lg-right text-md-left mb-5"
          >
            <Button className="mt2btn" onClick={() => navigateTo("/Category")}>
              더보기
            </Button>
          </Col>
        </Row>
        <Row>
          {categorys.map((ca, index) => (
            <Mcard
              key={index}
              store_img={ca.store_img}
              positivePercentage={50}
              negativePercentage={50}
              reviewCount={45}
              store={ca.store_name}
              reviews={ca.store_info}
              store_seq={ca.store_idx}
            />
          ))}
        </Row>
        <Row className="my-2 no-gutters">
          <Col lg={12} md={12} sm={12} className="t2">
            기능
          </Col>
        </Row>
        <Row
          className="d-flex align-items-center justify-content-center"
          data-aos="fade-left"
          data-aos-offset="300"
          data-aos-easing="ease-in-sine"
        >
          <Col
            lg={6}
            className="my-3 d-flex justify-content-center align-items-center login-form-container"
          >
            <img src="img/dmer.jpg" alt="Description" />
          </Col>
          <Col
            lg={6}
            className="my-3 d-none d-lg-flex flex-column align-items-center justify-content-center mkt"
          >
            <h1 className="text-center">캘린더</h1>
            <p className="text-center">기능</p>
          </Col>
        </Row>
        <Row
          data-aos="fade-right"
          data-aos-offset="300"
          data-aos-easing="ease-in-sine"
        >
          <Col
            lg={6}
            className="my-3 d-none d-lg-flex flex-column align-items-center justify-content-center mkt"
          >
            <h1 className="text-center">캘린더</h1>
            <p className="text-center">기능</p>
          </Col>
          <Col
            lg={6}
            className="my-3 d-flex justify-content-center align-items-center login-form-container"
          >
            <img src="img/dmer.jpg" />
          </Col>
        </Row>
        <Row
          data-aos="fade-left"
          data-aos-offset="300"
          data-aos-easing="ease-in-sine"
        >
          <Col
            lg={6}
            className="my-3 d-flex justify-content-center align-items-center login-form-container"
          >
            <img src="img/dmer.jpg" />
          </Col>
          <Col
            lg={6}
            className="my-3 d-none d-lg-flex flex-column align-items-center justify-content-center mkt"
          >
            <h1 className="text-center">캘린더</h1>
            <p className="text-center">기능</p>
          </Col>
        </Row>
        <Row
          data-aos="fade-right"
          data-aos-offset="300"
          data-aos-easing="ease-in-sine"
        >
          <Col
            lg={6}
            className="my-3 d-none d-lg-flex flex-column align-items-center justify-content-center mkt"
          >
            <h1 className="text-center">캘린더</h1>
            <p className="text-center">기능</p>
          </Col>
          <Col
            lg={6}
            className="my-3 d-flex justify-content-center align-items-center login-form-container"
          >
            <img src="img/dmer.jpg" />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Main;
