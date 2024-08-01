import React, { useCallback, useEffect, useState } from "react";
import { Container, Row, Col, Image, Form, Button } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../axios";
import Map from "../components/Map";
import Carousels3 from "../components/Carousel3";
import Swal from 'sweetalert2';
import "../css/shop.css";

const formatPrice = (price) => {
  return new Intl.NumberFormat('ko-KR').format(price);
};

const Shop = () => {
  const { store_idx } = useParams();
  const [storeDetail, setStoreDetail] = useState({});
  const [productInfo, setProductInfo] = useState([]);
  const [selectedHall, setSelectedHall] = useState('');
  const [selectedInfo, setSelectedInfo] = useState({ guestCount: '', price: '' });
  const [selectedHallImage, setSelectedHallImage] = useState('');

  let mem_id = window.sessionStorage.getItem('mem_id');

  const navigate = useNavigate();
  const navigateTo = useCallback((path) => navigate(path), [navigate]);

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
        console.log(response.data.productInfo, "tfghfgh");
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
        console.log(selected.prod_img, "Selected product image");
        setSelectedInfo({ 
          prod_idx: selected.prod_idx,
          guestCount: selected.prod_info,
          price: selected.prod_price === 0 ? null : selected.prod_price ,
          prod_img :selected.prod_img,
          prod_name : selected.prod_name
        });
  
        setSelectedHallImage(selected.prod_img || ''); // 선택된 홀의 이미지 URL 업데이트
    } else {
        setSelectedInfo({ guestCount: '', price: null });
        setSelectedHallImage(storeDetail.store_img); // 선택 해제 시 이미지 초기화
    }
};

  console.log(selectedHallImage.prod_img);
  
  const handleAddToCart = async () => {
    try {
      const item = {
        prod_idx: selectedInfo.prod_idx,
        mem_id: mem_id, // 실제 사용자 ID로 대체
        prod_cnt: 1, // 기본 수량
        prod_price:selectedInfo.price,
        prod_img : selectedInfo.prod_img,
        prod_name : selectedInfo.prod_name
      };

      await axios.post('/shop/cart/add', item); // 서버에 아이템 추가 요청
      Swal.fire({
        title: '장바구니 추가 성공',
        text: '장바구니로 이동하시겠습니까?',
        icon: 'success',
        showCancelButton: true,
        confirmButtonText: '네',
        cancelButtonText: '아니요'
      }).then((result) => {
        if (result.isConfirmed) {
          navigateTo("/Mypage/Sbasket");
        }
      });
    } catch (error) {
      console.error("장바구니 추가 오류:", error);
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

        <Row className="my-5 center-img3">
          <Col lg={6} md={6} sm={12}>
            <Image className="img-fluid2"
              src={selectedHallImage || storeDetail.store_img} 
              alt="Selected Hall" 
              fluid 
              onError={(e) => {
                e.target.src = storeDetail.store_img; // 이미지 로드 실패 시 기본 이미지로 변경
              }}
            />
          </Col>
          <Col lg={6} md={6} sm={12} className="t2 login-form-container mt-5">
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
                      <p className="smoneys">가격 : {formatPrice(selectedInfo.price)}</p>
                    </Col>
                  </Row>
                )}
              </>
            )}
            <Row>
              <Col>
                <Button variant="success" type="submit" className="login-button mt-5" onClick={handleAddToCart} >
                  장바구니
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>

        <Row className="my-5">
          <Col lg={12} md={12} sm={12} className="t2"></Col>
        </Row>
        <Row className="my-5 d-flex justify-content-center">
          <Col>
            <Carousels3 store_idx={store_idx} />
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
