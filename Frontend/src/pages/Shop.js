import React, { useEffect, useState, useContext } from "react";
import { Container, Row, Col, Image, Form, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import axios from "../axios";
import Map from "../components/Map";
import Carousels3 from "../components/Carousel3";
<<<<<<< HEAD
import  CartContext  from "../components/CartContext";

const Shop = () => {
  const { store_idx } = useParams();
  const [storeDetail, setStoreDetail] = useState(null);
  const { addToCart } = useContext(CartContext);
=======

const Shop = () => {
  const { store_idx } = useParams();
  const [storeDetail, setStoreDetail] = useState({});
  const [productInfo, setProductInfo] = useState([]);
  const [selectedHall, setSelectedHall] = useState('');
  const [selectedInfo, setSelectedInfo] = useState({ guestCount: '', price: '' });
>>>>>>> 5b01ea8175569b74e90e0cbf75cd7554a72a7b55

  useEffect(() => {
    const fetchStoreDetail = async () => {
      try {
        const response = await axios.get(`/shop/${store_idx}`);
        setStoreDetail(response.data.Storeinfo[0]);
<<<<<<< HEAD
        console.log(response.data.Storeinfo[0], "나오니");
=======
>>>>>>> 5b01ea8175569b74e90e0cbf75cd7554a72a7b55
      } catch (error) {
        console.error("상점 상세 정보를 가져오는 도중 오류 발생:", error);
      }
    };

<<<<<<< HEAD
=======
    const fetchProductInfo = async () => {
      try {
        const response = await axios.get(`/shop/p/${store_idx}`);
        setProductInfo(response.data.productInfo);
        console.log(response.data.productInfo,"tfghfgh");
      } catch (error) {
        console.error("제품 정보를 가져오는 도중 오류 발생:", error);
      }
    };
    fetchProductInfo();
>>>>>>> 5b01ea8175569b74e90e0cbf75cd7554a72a7b55
    fetchStoreDetail();
  }, [store_idx]);

  const handleAddToCart = () => {
    if (storeDetail) {
      addToCart({
        store_idx: storeDetail.store_idx,
        store_name: storeDetail.store_name,
        store_img: storeDetail.store_img,
        store_info: storeDetail.store_info,
      });
    }
  };

  if (!storeDetail) {
    return <p>Loading...</p>;
  }

  const handleSelectChange = (event) => {
    const selectedHall = event.target.value;
    setSelectedHall(selectedHall);

    const selected = productInfo.find(info => info.prod_name === selectedHall);
    if (selected) {
      setSelectedInfo({ guestCount: selected.prod_info, price: selected.prod_price === 0 ? null : selected.prod_price });
    } else {
      setSelectedInfo({ guestCount: '', price: null });
    }
  };

  return (
<<<<<<< HEAD
=======
    <>
    <Row className="mt-5"></Row>
>>>>>>> 5b01ea8175569b74e90e0cbf75cd7554a72a7b55
    <Container>
      <Row className="mt-5">
        <Col lg={12} md={12} sm={12} className="t2">
          {storeDetail.store_name}
        </Col>
      </Row>

      <Row className="my-5">
        <Col lg={6} md={6} sm={12}>
<<<<<<< HEAD
          <Image src={storeDetail.store_img} fluid />
=======
          <Image src={storeDetail.store_img} />
>>>>>>> 5b01ea8175569b74e90e0cbf75cd7554a72a7b55
        </Col>
        <Col lg={6} md={6} sm={12} className="t2 login-form-container">
          <Row className="mb-3 mt-4">
            <Col>
<<<<<<< HEAD
              <Form.Select>
                <option>1층 르씨엘홀</option>
                <option>2층 00홀</option>
                <option>3층 00홀</option>
                <option>4층 00홀</option>
                <option>5층 00홀</option>
              </Form.Select>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col>
              <p className="smoneys">하객수 : 000명</p>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col>
              <p className="smoneys">가격 : 00000원</p>
            </Col>
          </Row>
=======
            <Form.Select onChange={handleSelectChange}>
                  <option value="">홀을 선택하세요</option>
                  {productInfo.length > 0 ? (
                    productInfo.map((info, index) => (
                      <option key={index} value={info.prod_name}>
                        {info.prod_name}
                      </option>
                    ))
                  ) : (
                    <option>제품 정보를 불러오는 중...</option>
                  )}
                </Form.Select>
            </Col>
          </Row>
          {selectedHall && (
            <>
              {selectedInfo.guestCount && (
                  <Row className="mb-3">
                    <Col>
                      <p className="smoneys">하객수 : {selectedInfo.guestCount}</p>
                    </Col>
                  </Row>
                )}
                {selectedInfo.price !== null && selectedInfo.price !== '' && (
                  <Row className="mb-3">
                    <Col>
                      <p className="smoneys">가격 : {selectedInfo.price}</p>
                    </Col>
                  </Row>
                )}
            </>
          )}
>>>>>>> 5b01ea8175569b74e90e0cbf75cd7554a72a7b55
          <Row className="mb-3 align-items-center">
            <Col className="d-flex align-items-center">
              <span className="sdates mb-0 pe-2">일정 :</span>
              <Form.Control
                type="date"
                className="mb-0"
                style={{ display: "inline-block", width: "50%" }}
              />
            </Col>
          </Row>
          <Row>
            <Col>
<<<<<<< HEAD
              <Button
                variant="success"
                type="button"
                className="login-button mt-5"
                onClick={handleAddToCart}
              >
                장바구니에 추가
=======
              <Button variant="success" type="submit" className="login-button mt-5">
                장바구니
>>>>>>> 5b01ea8175569b74e90e0cbf75cd7554a72a7b55
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>

      <Row className="my-5">
        <Col lg={12} md={12} sm={12} className="t2">
          정보
        </Col>
      </Row>
      <Row className="my-5 d-flex justify-content-center">
        <Col>
          <Carousels3 />
        </Col>
      </Row>

      <Row>
        <Col lg={6} md={12} sm={12} className="t2">
          오시는 길
        </Col>
      </Row>
      <Row>
        <Col>
<<<<<<< HEAD
          <Map
            lat={storeDetail.lat}
            lon={storeDetail.lon}
          />
=======
          <Map lat={storeDetail.lat} lon={storeDetail.lon} />
>>>>>>> 5b01ea8175569b74e90e0cbf75cd7554a72a7b55
        </Col>
      </Row>
    </Container>
  );
};

<<<<<<< HEAD
=======

>>>>>>> 5b01ea8175569b74e90e0cbf75cd7554a72a7b55
export default Shop;
