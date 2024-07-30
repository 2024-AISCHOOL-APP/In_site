import React, { useCallback, useContext, useState, useEffect } from "react";
import { Col, Container, Row, Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "../../axios";
import { Appdata } from '../../App';
import "../../css/Aichost.css";

// InfoCard 컴포넌트
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

// Aistep5 컴포넌트
const Aistep5 = () => {
  const data = useContext(Appdata);
  console.log(data, "6단계 확인");

  const navigate = useNavigate();
  const navigateTo = useCallback((path) => navigate(path), [navigate]);

  const [mainItem, setMainItem] = useState(null);
  const [hiddenItems, setHiddenItems] = useState([]);
  const [showHidden, setShowHidden] = useState(false);

  const [studioItem, setStudioItem] = useState(null);
  const [studioHiddenItems, setStudioHiddenItems] = useState([]);
  const [studioShowHidden, setStudioShowHidden] = useState(false);

  const [dressItem, setDressItem] = useState(null);
  const [dressHiddenItems, setDressHiddenItems] = useState([]);
  const [dressShowHidden, setDressShowHidden] = useState(false);

  const [makeupItem, setMakeupItem] = useState(null);
  const [makeupHiddenItems, setMakeupHiddenItems] = useState([]);
  const [makeupShowHidden, setMakeupShowHidden] = useState(false);

  // 데이터 수신 및 상태 업데이트
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8500/data');
        console.log('Server response:', response.data);

        setMainItem(response.data['wedding-hall'].mainItem);
        setHiddenItems(response.data['wedding-hall'].hiddenItems);

        setStudioItem(response.data['studio'].mainItem);
        setStudioHiddenItems(response.data['studio'].hiddenItems);

        setDressItem(response.data['dress'].mainItem);
        setDressHiddenItems(response.data['dress'].hiddenItems);

        setMakeupItem(response.data['makeup'].mainItem);
        setMakeupHiddenItems(response.data['makeup'].hiddenItems);

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const toggleHiddenItems = () => setShowHidden(!showHidden);
  const swapContent = (index) => {
    const newMainItem = hiddenItems[index];
    const newHiddenItems = [...hiddenItems];
    newHiddenItems[index] = mainItem;
    setMainItem(newMainItem);
    setHiddenItems(newHiddenItems);
  };

  const toggleStudioHiddenItems = () => setStudioShowHidden(!studioShowHidden);
  const swapStudioContent = (index) => {
    const newStudioItem = studioHiddenItems[index];
    const newStudioHiddenItems = [...studioHiddenItems];
    newStudioHiddenItems[index] = studioItem;
    setStudioItem(newStudioItem);
    setStudioHiddenItems(newStudioHiddenItems);
  };

  const toggleDressHiddenItems = () => setDressShowHidden(!dressShowHidden);
  const swapDressContent = (index) => {
    const newDressItem = dressHiddenItems[index];
    const newDressHiddenItems = [...dressHiddenItems];
    newDressHiddenItems[index] = dressItem;
    setDressItem(newDressItem);
    setDressHiddenItems(newDressHiddenItems);
  };

  const toggleMakeupHiddenItems = () => setMakeupShowHidden(!makeupShowHidden);
  const swapMakeupContent = (index) => {
    const newMakeupItem = makeupHiddenItems[index];
    const newMakeupHiddenItems = [...makeupHiddenItems];
    newMakeupHiddenItems[index] = makeupItem;
    setMakeupItem(newMakeupItem);
    setMakeupHiddenItems(newMakeupHiddenItems);
  };

  const calculateTotal = () => {
    if (!mainItem || !studioItem || !dressItem || !makeupItem) return '0';
    
    const price1 = parseInt(mainItem.price.split(':')[1].trim().replace(/[^\d]/g, ''));
    const price2 = parseInt(studioItem.price.split(':')[1].trim().replace(/[^\d]/g, ''));
    const price3 = parseInt(dressItem.price.split(':')[1].trim().replace(/[^\d]/g, ''));
    const price4 = parseInt(makeupItem.price.split(':')[1].trim().replace(/[^\d]/g, ''));
    
    const total = price1 + price2 + price3 + price4;
    return total.toLocaleString();
  };

  const Back = () => {
    navigateTo(-1);
  };

  const Next = () => {
    // 필요한 추가 작업 수행
  };

  if (!mainItem || !studioItem || !dressItem || !makeupItem) {
    return <div>Loading...</div>; // 데이터 로딩 중 표시
  }

  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col md={8} sm={10} xs={12}>
          <Card className="m-auto p-4">
            <Row className="my-1">
              <Col className="Qtitle Qti2">가상 사진</Col>
            </Row>
            <Row className="my-4">
              <Col className="m-auto text-center">
                <div className="image-upload-box">
                  <img src="/img/dmer.jpg" alt="Upload" />
                </div>
              </Col>
            </Row>

            <Row>
              <Col className="text-center">
                <Button onClick={Back} className="me-4 btns">사진 저장</Button>
              </Col>
            </Row>

            <Row className="mt-5 justify-content-center">
              <Col md={9}>
                <InfoCard item={mainItem} onClick={toggleHiddenItems} showArrow={true} />
                {showHidden && hiddenItems.map((item, index) => (
                  <InfoCard key={index} item={item} onClick={() => swapContent(index)} showArrow={false} />
                ))}
              </Col>
            </Row>
            <hr />
            <Row className="mt-3 justify-content-center">
              <Col md={9}>
                <InfoCard item={studioItem} onClick={toggleStudioHiddenItems} showArrow={true} />
                {studioShowHidden && studioHiddenItems.map((item, index) => (
                  <InfoCard key={index} item={item} onClick={() => swapStudioContent(index)} showArrow={false} />
                ))}
              </Col>
            </Row>
            <hr />
            <Row className="mt-3 justify-content-center">
              <Col md={9}>
                <InfoCard item={dressItem} onClick={toggleDressHiddenItems} showArrow={true} />
                {dressShowHidden && dressHiddenItems.map((item, index) => (
                  <InfoCard key={index} item={item} onClick={() => swapDressContent(index)} showArrow={false} />
                ))}
              </Col>
            </Row>
            <hr />
            <Row className="mt-3 justify-content-center">
              <Col md={9}>
                <InfoCard item={makeupItem} onClick={toggleMakeupHiddenItems} showArrow={true} />
                {makeupShowHidden && makeupHiddenItems.map((item, index) => (
                  <InfoCard key={index} item={item} onClick={() => swapMakeupContent(index)} showArrow={false} />
                ))}
              </Col>
            </Row>

            <Row>
              <Col className="my-5 text-center">
                <Button onClick={Back} className="me-4 btns">일정 저장</Button>
                <Button className="me-4 btns">총합 : {calculateTotal()}원</Button>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Aistep5;
