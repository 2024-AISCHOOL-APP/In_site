import React, { useCallback, useContext, useRef, useState, useEffect } from "react";
import { Col, Container, Row, Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "../../axios";
import { Appdata } from '../../App';
import "../../css/Aichost.css";

const InfoCard = ({ item, onClick, showArrow }) => (
  <Card onClick={onClick} className="mb-3 purple-border">
    <Row noGutters>
      <Col md={4}>
        <Card.Img src={item.img} />
      </Col>
      <Col md={8}>
        <Card.Body>
          <Card.Text className="mb-1 text-align-left">{item.hall}</Card.Text>
          {item.sit && <Card.Text className="mb-1 text-align-left">{item.sit}</Card.Text>}
          <Card.Text className="mb-1 text-align-left">{item.price}</Card.Text>
          <Card.Text className="mb-1 text-align-left">{item.date}</Card.Text>
          {showArrow && <p className="arrow mt-5">▼</p>}
        </Card.Body>
      </Col>
    </Row>
  </Card>
);

const Aistep5 = () => {
  const data = useContext(Appdata);
  console.log(data, "6단계 확인");

  const navigate = useNavigate();
  const navigateTo = useCallback((path) => navigate(path), [navigate]);

  const [groomUploaded, setGroomUploaded] = useState(false);

  const husref = useRef();

  const handleGroomUpload = () => {
    setGroomUploaded(true);
  };

  const Back = () => {
    navigateTo(-1);
  };

  function Next() {
    // 필요한 추가 작업 수행
  }

  const [mainItem, setMainItem] = useState({
    img: '/img/dmer.jpg',
    hall: '도메인호텔 호텔 홀',
    sit: '좌석수: 200~300석',
    price: '가격: 4,000,000원',
    date: '예약 가능 날짜 : 2024.07.19'
  });

  const [hiddenItems, setHiddenItems] = useState([
    {
      img: '/img/dmer.jpg',
      hall: '도메인호텔 호텔 홀',
      sit: '좌석수: 200~300석',
      price: '가격: 3,000,000원',
      date: '예약 가능 날짜 : 2024.07.19'
    },
    {
      img: '/img/dmer.jpg',
      hall: '도메인호텔 호텔 홀',
      sit: '좌석수: 200~300석',
      price: '가격: 2,000,000원',
      date: '예약 가능 날짜 : 2024.07.19'
    }
  ]);

  const handleCardClick = (item) => {
    setMainItem(item);
  };

  useEffect(() => {
    // 데이터 받아오기 예시
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8500/data');
        console.log('들어오니2hidden',response.data.hiddenItem);
        console.log('들어오니1main',response.data.mainItem);
        setHiddenItems(response.data.hiddenItems);
        setMainItem(response.data.mainItem);
      } catch (error) {
        console.error('데이터 로드 중 오류 발생:', error);
      }
    };

    fetchData();
  }, []);
  
  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card className="m-auto p-4">
            <Row>
              <Col className="Qtitle">Q 06.</Col>
            </Row>
            <Row className="my-2">
              <Col className="Qti2">정보를 확인하세요</Col>
            </Row>
            <InfoCard item={mainItem} showArrow={false} />
            {hiddenItems.map((item, index) => (
              <InfoCard
                key={index}
                item={item}
                onClick={() => handleCardClick(item)}
                showArrow={false}
              />
            ))}
            <Row className="my-5">
              <Col className="text-center">
                <Button onClick={Back} className="me-4 btns">이전</Button>
                <Button onClick={Next} className="me-4 btns">다음</Button>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Aistep5;
