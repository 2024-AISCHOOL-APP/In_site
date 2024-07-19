import { Container, Row, Col, Image, Button } from "react-bootstrap";
import Carousels from "../components/Carousel";
import "aos/dist/aos.css";
import React, { useEffect, useState } from "react";
import AOS from "aos";
import axios from "axios";
import { Link } from "react-router-dom";

import "../css/Main.css";
import Mcard from "../components/Mcard";
import Mnav from "../components/Mnav";

// import Migs from "../components/Migs";

function Main() {
  const [num, setnum] = useState();

  let mem_id = window.sessionStorage.getItem("mem_id");
  const shoes = [
    {
      shoe_img: "img/dmer.jpg",
      positive_percentage: 80,
      negative_percentage: 20,
      reviewCount: 150,
      shoe: "나이키 에어 포스 1dddddddddddd",
      reviews: [
        {
          id: 1,
          user: "사용자1",
          comment: "편안하고 디자인이 좋아요!",
          rating: 5,
        },
        {
          id: 2,
          user: "사용자2",
          comment: "사이즈가 작아서 아쉬웠습니다.",
          rating: 3,
        },
      ],
      shoe_seq: 123456,
    },
    {
      shoe_img: "img/dmer.jpg",
      positive_percentage: 75,
      negative_percentage: 25,
      reviewCount: 120,
      shoe: "아디다스 울트라부스트",
      reviews: [
        {
          id: 1,
          user: "사용자3",
          comment: "훌륭한 쿠션감과 편안한 착용감입니다.",
          rating: 5,
        },
        {
          id: 2,
          user: "사용자4",
          comment: "디자인이 예쁜데 내구성이 좀 아쉬워요.",
          rating: 4,
        },
      ],
      shoe_seq: 234567,
    },
    {
      shoe_img: "img/dmer.jpg",
      positive_percentage: 85,
      negative_percentage: 15,
      reviewCount: 180,
      shoe: "언더아머 커리 8",
      reviews: [
        {
          id: 1,
          user: "사용자5",
          comment: "뛰어난 그립감과 효율적인 디자인입니다.",
          rating: 5,
        },
        { id: 2, user: "사용자6", comment: "무게가 좀 무겁습니다.", rating: 3 },
      ],
      shoe_seq: 345678,
    },
    {
      shoe_img: "img/dmer.jpg",
      positive_percentage: 70,
      negative_percentage: 30,
      reviewCount: 100,
      shoe: "푸마 인터셉트 XT",
      reviews: [
        {
          id: 1,
          user: "사용자7",
          comment: "가격 대비 만족스러운 제품입니다.",
          rating: 4,
        },
        {
          id: 2,
          user: "사용자8",
          comment: "디자인이 별로라고 생각합니다.",
          rating: 2,
        },
      ],
      shoe_seq: 456789,
    },
    // {
    //   shoe_img:"img/main2.png",
    //   positive_percentage: 70,
    //   negative_percentage: 30,
    //   reviewCount: 100,
    //   shoe: "푸마 인터셉트 XT",
    //   reviews: [
    //     { id: 1, user: "사용자7", comment: "가격 대비 만족스러운 제품입니다.", rating: 4 },
    //     { id: 2, user: "사용자8", comment: "디자인이 별로라고 생각합니다.", rating: 2 },
    //   ],
    //   shoe_seq: 456789
    // }
  ];

  useEffect(() => {
    axios
      .get("/")
      .then((res) => {
        console.log("연결");
        setnum(2);
      })
      .catch(() => {
        console.log("데이터 보내기 실패");
      });

    AOS.init();
  }, []);

  return (
    <>
      <Container>
        <Row className="my-3">
          <Col>
          <Carousels />
          </Col>
        </Row>
        <Row>
          <Col>
            <Mnav/>
          </Col>
        </Row>
        <Row className="my-5">
          <Col lg={6} md={12} sm={12} className="t2">
            웨딩홀
          </Col>
          <Col lg={12} md={12} sm={12} className="text-lg-right text-md-left">
            <Link to={"#"}>
              <Button className="mt2btn">더보기</Button>
            </Link>
          </Col>
        </Row>
  
        <Row>
          {shoes.map((shoe, index) => (
            <Mcard
              key={index}
              shoe_img={shoe.shoe_img}
              positivePercentage={shoe.positive_percentage} // 예시 값
              negativePercentage={shoe.negative_percentage} // 예시 값
              reviewCount={shoe.reviewCount}
              shoe={shoe.shoe}
              reviews={shoe.reviews} // 이 부분은 실제 데이터 구조에 따라 조정 필요
              shoe_seq={shoe.shoe_seq}
            />
          ))}
        </Row>
        {/* <Row
          className="my-5"
          data-aos="fade-left"
          data-aos-offset="300"
          data-aos-easing="ease-in-sine"
        >
          <Col lg={6} md={12} sm={12} className="t2">
            메이크업
          </Col>
          <Col lg={6} md={12} sm={12} className="text-lg-right text-md-left">
            <Link to={"#"}>
              <Button className="t2btn">더보기</Button>
            </Link>
          </Col>
        </Row>
        <Row
          data-aos="fade-left"
          data-aos-offset="300"
          data-aos-easing="ease-in-sine"
        >
          {shoes.map((shoe, index) => (
            <Mcard
              key={index}
              shoe_img={shoe.shoe_img}
              positivePercentage={shoe.positive_percentage} // 예시 값
              negativePercentage={shoe.negative_percentage} // 예시 값
              reviewCount={shoe.reviewCount}
              shoe={shoe.shoe}
              reviews={shoe.reviews} // 이 부분은 실제 데이터 구조에 따라 조정 필요
              shoe_seq={shoe.shoe_seq}
            />
          ))}
        </Row>
        <Row
          className="my-5"
          data-aos="fade-right"
          data-aos-offset="300"
          data-aos-easing="ease-in-sine"
        >
          <Col lg={6} md={12} sm={12} className="t2">
            드레스
          </Col>
          <Col lg={6} md={12} sm={12} className="text-lg-right text-md-left">
            <Link to={"#"}>
              <Button className="t2btn">더보기</Button>
            </Link>
          </Col>
        </Row>
        <Row
          data-aos="fade-right"
          data-aos-offset="300"
          data-aos-easing="ease-in-sine"
        >
          {shoes.map((shoe, index) => (
            <Mcard
              key={index}
              shoe_img={shoe.shoe_img}
              positivePercentage={shoe.positive_percentage} // 예시 값
              negativePercentage={shoe.negative_percentage} // 예시 값
              reviewCount={shoe.reviewCount}
              shoe={shoe.shoe}
              reviews={shoe.reviews} // 이 부분은 실제 데이터 구조에 따라 조정 필요
              shoe_seq={shoe.shoe_seq}
            />
          ))}
        </Row> */}
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
            className="my-3 d-flex justify-content-center align-items-center"
          >
            <img src="img/dmer.jpg" alt="Description" />
          </Col>

          <Col
            lg={6}
            className="my-3 d-none d-lg-flex flex-column align-items-center justify-content-center"
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
            className="my-3 d-none d-lg-flex flex-column align-items-center justify-content-center"
          >
            <h1 className="text-center">캘린더</h1>
            <p className="text-center">기능</p>
          </Col>
          <Col
            lg={6}
            className="my-3 d-flex justify-content-center align-items-center"
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
            className="my-3 d-flex justify-content-center align-items-center"
          >
            <img src="img/dmer.jpg" />
          </Col>
          <Col
            lg={6}
            className="my-3 d-none d-lg-flex flex-column align-items-center justify-content-center"
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
            className="my-3 d-none d-lg-flex flex-column align-items-center justify-content-center"
          >
            <h1 className="text-center">캘린더</h1>
            <p className="text-center">기능</p>
          </Col>
          <Col
            lg={6}
            className="my-3 d-flex justify-content-center align-items-center"
          >
            <img src="img/dmer.jpg" />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Main;
