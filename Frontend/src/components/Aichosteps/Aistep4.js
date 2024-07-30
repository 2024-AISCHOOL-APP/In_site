import React, { useCallback, useContext, useState, useEffect } from "react";
import { Col, Container, Row, Button, Card, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "../../axios";
import { Appdata } from '../../App';
import "../../css/Aichost.css";

// Format price with comma
const formatPrice = (price) => {
  const number = parseInt(price, 10);
  return new Intl.NumberFormat().format(number);
};

// InfoCard Component
const InfoCard = ({ title, item }) => (
  <Card className="mb-4 shadow-sm">
    <Card.Header style={{ backgroundColor: '#DAC4FB' }}>
      <h5 style={{ fontWeight: 'bold' }}>{title}</h5>
    </Card.Header>
    <Row noGutters>
      <Col md={12} lg={12} xl={6}>
        <Card.Img src={item.img} alt={item.name} />
      </Col>
      <Col md={12} lg={12} xl={6}>
        <Card.Body>
          <Card.Text className="mb-1 text-align-center">상호명 : {item.name}</Card.Text>
          {item.sit && <Card.Text className="mb-1 text-align-center">좌석수 : {item.sit}석</Card.Text>}
          <Card.Text className="mb-1 text-align-center">가격 : {formatPrice(item.price)}원</Card.Text>
          <Card.Text className="mb-1 text-align-center">예약 가능 날짜 : {item.date}</Card.Text>
        </Card.Body>
      </Col>
    </Row>
  </Card>
);

// Aistep4 Component
const Aistep4 = () => {
  const data = useContext(Appdata);
  console.log(data, "6단계 확인");

  const navigate = useNavigate();
  const navigateTo = useCallback((path) => navigate(path), [navigate]);

  const [mainItem, setMainItem] = useState(null);
  const [studioItem, setStudioItem] = useState(null);
  const [dressItem, setDressItem] = useState(null);
  const [makeupItem, setMakeupItem] = useState(null);
  const [totalPrice, setTotalPrice] = useState('0'); // 상태 추가

  // Fetch data and update state
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8500/data');
        console.log('Server response:', response.data);

        setMainItem(response.data['wedding-hall'].mainItem);
        setStudioItem(response.data['studio'].mainItem);
        setDressItem(response.data['dress'].mainItem);
        setMakeupItem(response.data['makeup'].mainItem);

        // Calculate and set total price
        const total = calculateTotal(response.data);
        setTotalPrice(total);

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const calculateTotal = (data) => {
    if (!data['wedding-hall'] || !data['studio'] || !data['dress'] || !data['makeup']) return '0';

    const parsePrice = (price) => parseInt(price, 10);

    const total = [
      data['wedding-hall'].mainItem,
      data['studio'].mainItem,
      data['dress'].mainItem,
      data['makeup'].mainItem
    ]
      .map(item => parsePrice(item.price))
      .reduce((sum, price) => sum + price, 0);

    return formatPrice(total);
  };

  const handleBack = () => {
    navigateTo(-1);
  };

  const handleNext = () => {
    // Additional steps to be performed
  };

  if (!mainItem || !studioItem || !dressItem || !makeupItem) {
    return (
      <Container className="text-center my-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col md={8} sm={10} xs={12}>
          <Card className="m-auto p-4 shadow-lg">
            <Row>
              <Col className="text-center">
                <h2 className="text-purple">결과</h2>
              </Col>
            </Row>
            <Row className="mt-5">
              <Col md={12}>
                <InfoCard title="웨딩홀" item={mainItem} />
              </Col>
            </Row>
            <hr />
            <Row className="mt-3">
              <Col md={12}>
                <InfoCard title="스튜디오" item={studioItem} />
              </Col>
            </Row>
            <hr />
            <Row className="mt-3">
              <Col md={12}>
                <InfoCard title="드레스" item={dressItem} />
              </Col>
            </Row>
            <hr />
            <Row className="mt-3">
              <Col md={12}>
                <InfoCard title="메이크업" item={makeupItem} />
              </Col>
            </Row>
            <Row className="text-center my-5">
              <Col>
                <Button className="me-4 btns">총합: {totalPrice}원</Button>
              </Col>
            </Row>
            <Row className="text-center my-5">
              <Col>
                <Button onClick={handleBack} className="me-4 btns">취소</Button>
                <Button onClick={handleNext} className="btns">일정저장</Button>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Aistep4;
