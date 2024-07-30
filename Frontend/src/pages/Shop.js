import React, { useEffect, useState } from "react";
import { Container, Row, Col, Image, Form, Button } from "react-bootstrap";
import {useParams } from "react-router-dom";
import axios from "../axios";
import Map from "../components/Map";
// import Carousels from "../components/Carousel";
// import Carousels2 from "../components/Carousel2";
import Carousels3 from "../components/Carousel3";

const Shop = () => {
  const { store_idx } = useParams();
  const [storeDetail, setStoreDetail] = useState({});
  const [productInfo, setProductInfo] = useState([]);
  const [selectedHall, setSelectedHall] = useState('');
  const [selectedInfo, setSelectedInfo] = useState({ guestCount: '', price: '' });

  useEffect(() => {
    const fetchStoreDetail = async () => {
      try {
        const response = await axios.get(`/shop/${store_idx}`);
        setStoreDetail(response.data.Storeinfo[0]);
      } catch (error) {
        console.error("상점 상세 정보를 가져오는 도중 오류 발생:", error);
      }
    };

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
    fetchStoreDetail();
  }, [store_idx]);



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
    <>
    <Row className="mt-5"></Row>
    <Container>
      <Row className="mt-5">
        <Col lg={12} md={12} sm={12} className="t2">
          {storeDetail.store_name}
        </Col>
      </Row>

      <Row className="my-5">
        <Col lg={6} md={6} sm={12}>
          <Image src={storeDetail.store_img} />
        </Col>
        <Col lg={6} md={6} sm={12} className="t2 login-form-container">
          <Row className="mb-3 mt-4">
            <Col>
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
              <Button variant="success" type="submit" className="login-button mt-5">
                장바구니
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
          <Map lat={storeDetail.lat} lon={storeDetail.lon} />
        </Col>
      </Row>
    </Container>
    </>
  );
};


export default Shop;
