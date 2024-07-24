import React, { useCallback, useContext, useRef, useState } from "react";
import { Col, Container, Row, Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Appdata } from '../../App';
import "../../css/Aichost.css";

const InfoCard = ({ item, onClick, showArrow}) => (
  <Card onClick={onClick} className="mb-3 purple-border">
    <Row noGutters>
      <Col md={4}>
        <Card.Img src={item.img} />
      </Col>
      <Col md={8}>
        <Card.Body >
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

const Aistep6 = () => {
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
    sit : '좌석수: 200~300석',
    price : '가격: 4,000,000원',
    date: '예약 가능 날짜 : 2024.07.19'
  });

  const [hiddenItems, setHiddenItems] = useState([
    {
      img: '/img/dmer.jpg',
      hall: '도메인호텔 호텔 홀',
      sit : '좌석수: 200~300석',
      price : '가격: 3,000,000원',
      date: '예약 가능 날짜 : 2024.07.19'
    },
    {
      img: '/img/dmer.jpg',
      hall: '도메인호텔 호텔 홀',
      sit : '좌석수: 200~300석',
      price : '가격: 2,000,000원',
      date: '예약 가능 날짜 : 2024.07.19'
    }
  ]);

  const [showHidden, setShowHidden] = useState(false);

  const toggleHiddenItems = () => {
    setShowHidden(!showHidden);
  };
  

  const swapContent = (index) => {
    const newMainItem = hiddenItems[index];
    const newHiddenItems = [...hiddenItems];
    newHiddenItems[index] = mainItem;
    setMainItem(newMainItem);
    setHiddenItems(newHiddenItems);
  };

  const [studioItem, setStudioItem] = useState({
    img: '/img/dmer.jpg',
    hall: '프라이빗 스튜디오',
    price: '가격: 4,000,000원',
    date: '예약 가능 날짜 : 2024.07.19'
  });

  const [studioHiddenItems, setStudioHiddenItems] = useState([
    {
      img: '/img/dmer.jpg',
      hall: '프라이빗 스튜디오',
      price: '가격: 3,000,000원',
      date: '예약 가능 날짜 : 2024.07.19'
    },
    {
      img: '/img/dmer.jpg',
      hall: '프라이빗 스튜디오',
      price: '가격: 2,000,000원',
      date: '예약 가능 날짜 : 2024.07.19'
    }
  ]);

  const [studioShowHidden, setStudioShowHidden] = useState(false);

  const toggleStudioHiddenItems = () => {
    setStudioShowHidden(!studioShowHidden);
  };

  const swapStudioContent = (index) => {
    const newStudioItem = studioHiddenItems[index];
    const newStudioHiddenItems = [...studioHiddenItems];
    newStudioHiddenItems[index] = studioItem;
    setStudioItem(newStudioItem);
    setStudioHiddenItems(newStudioHiddenItems);
  };

  const [dressItem, setDressItem] = useState({
    img: '/img/dmer.jpg',
    hall: '프라이빗 드레스',
    price: '가격: 4,000,000원',
    date: '예약 가능 날짜 : 2024.07.19'
  });

  const [dressHiddenItems, setDressHiddenItems] = useState([
    {
      img: '/img/dmer.jpg',
      hall: '프라이빗 드레스',
      price: '가격: 3,000,000원',
      date: '예약 가능 날짜 : 2024.07.19'
    },
    {
      img: '/img/dmer.jpg',
      hall: '프라이빗 드레스',
      price: '가격: 2,000,000원',
      date: '예약 가능 날짜 : 2024.07.19'
    }
  ]);

  const [dressShowHidden, setDressShowHidden] = useState(false);

  const toggleDressHiddenItems = () => {
    setDressShowHidden(!dressShowHidden);
  };

  const swapDressContent = (index) => {
    const newDressItem = dressHiddenItems[index];
    const newDressHiddenItems = [...dressHiddenItems];
    newDressHiddenItems[index] = dressItem;
    setDressItem(newDressItem);
    setDressHiddenItems(newDressHiddenItems);
  };

  const [makeupItem, setMakeupItem] = useState({
    img: '/img/dmer.jpg',
    hall: '프라이빗 메이크업',
    price: '가격: 4,000,000원',
    date: '예약 가능 날짜 : 2024.07.19'
  });

  const [makeupHiddenItems, setMakeupHiddenItems] = useState([
    {
      img: '/img/dmer.jpg',
      hall: '프라이빗 메이크업',
      price: '가격: 3,000,000원',
      date: '예약 가능 날짜 : 2024.07.19'
    },
    {
      img: '/img/dmer.jpg',
      hall: '프라이빗 메이크업',
      price: '가격: 2,000,000원',
      date: '예약 가능 날짜 : 2024.07.19'
    }
  ]);

  const [makeupShowHidden, setMakeupShowHidden] = useState(false);

  const toggleMakeupHiddenItems = () => {
    setMakeupShowHidden(!makeupShowHidden);
  };

  const swapMakeupContent = (index) => {
    const newMakeupItem = makeupHiddenItems[index];
    const newMakeupHiddenItems = [...makeupHiddenItems];
    newMakeupHiddenItems[index] = makeupItem;
    setMakeupItem(newMakeupItem);
    setMakeupHiddenItems(newMakeupHiddenItems);
  };

  const calculateTotal = () => {
    // 각 항목의 가격에서 숫자 부분을 추출하여 합산
    const price1 = parseInt(mainItem.price.split(':')[1].trim().replace(/[^\d]/g, ''));
    const price2 = parseInt(studioItem.price.split(':')[1].trim().replace(/[^\d]/g, ''));
    const price3 = parseInt(dressItem.price.split(':')[1].trim().replace(/[^\d]/g, ''));
    const price4 = parseInt(makeupItem.price.split(':')[1].trim().replace(/[^\d]/g, ''));
  
    // 합산된 총합 계산
    const total = price1 + price2 + price3 + price4;
  
    // 천 단위 구분 기호 포함하여 반환
    return total.toLocaleString();
  };

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
                <img src="/img/dmer.jpg"></img>
              </div>
                {/* <div className={`image-upload-box ${groomUploaded ? 'uploaded' : ''}`}>
                  <label 
                    htmlFor="groom-upload" 
                    className="custom-file-upload"
                  >
                    {groomUploaded ? "신랑 이미지가 업로드 되었습니다" : "사진"}
                  </label>
                  <input 
                    id="groom-upload" 
                    type="file" 
                    onChange={handleGroomUpload}
                    ref={husref}
                  />
                </div> */}
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
                <hr/>
            <Row className="mt-3 justify-content-center">
              <Col md={9}>
                <InfoCard item={studioItem} onClick={toggleStudioHiddenItems} showArrow={true} />
                {studioShowHidden && studioHiddenItems.map((item, index) => (
                  <InfoCard key={index} item={item} onClick={() => swapStudioContent(index)} showArrow={false} />
                ))}
              </Col>
            </Row>
            <hr/>
            <Row className="mt-3 justify-content-center">
              <Col md={9}>
                <InfoCard item={dressItem} onClick={toggleDressHiddenItems} showArrow={true} />
                {dressShowHidden && dressHiddenItems.map((item, index) => (
                  <InfoCard key={index} item={item} onClick={() => swapDressContent(index)} showArrow={false} />
                ))}
              </Col>
            </Row>
            <hr/>
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

export default Aistep6;
