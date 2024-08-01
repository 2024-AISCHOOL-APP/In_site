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
            <img src="img/aire.png" alt="Description" />
          </Col>
          <Col
            lg={6}
            className="my-3 d-none d-lg-flex flex-column align-items-center justify-content-center mkt"
          >
            <h1 className="text-center">AI웨딩플랜</h1>
            <p className="text-center">맞춤형 AI 추천으로 최적의 웨딩홀, 스튜디오, 드레스, 메이크업 업체를 제안받으세요.</p>
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
            <p className="text-center">직관적인 캘린더에서 일정 관리, 장소와 시간의 색상 구분으로 일정을 명확하게 확인하세요.</p>
          </Col>
          <Col
            lg={6}
            className="my-3 d-flex justify-content-center align-items-center login-form-container"
          >
            <img src="img/cal.png" />
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
            <img src="img/gage.png" />
          </Col>
          <Col
            lg={6}
            className="my-3 d-none d-lg-flex flex-column align-items-center justify-content-center mkt"
          >
            <h1 className="text-center">가계부</h1>
            <p className="text-center">입력한 거래 내역을 캘린더와 차트에서 시각화하여 지출을 쉽게 관리하고 분석하세요.</p>
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
            <h1 className="text-center">장바구니</h1>
            <p className="text-center">각 업체의 상세 페이지에서 장바구니에 추가한 항목들을 중앙에서 편리하게 관리하세요.</p>
          </Col>
          <Col
            lg={6}
            className="my-3 d-flex justify-content-center align-items-center login-form-container"
          >
            <img src="img/jang.png" />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Main;
