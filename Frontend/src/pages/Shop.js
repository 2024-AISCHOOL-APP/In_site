import React, { useEffect, useState } from "react";
import { Container, Row, Col, Image, Form, Button } from "react-bootstrap";
import Snavs from "../components/Snavs";
import { Outlet, useParams } from "react-router-dom";
import axios from "../axios";


const Shop = () => {

  const { store_idx } = useParams();
  const [storeDetail, setStoreDetail] = useState([]);

  useEffect(() => {
    const fetchBoardDetail = async () => {
      try {
        const response = await axios.get(
          `/shop/${store_idx}`
        );
        // 서버에서 받아온 상세 정보를 상태에 저장
        setStoreDetail(response.data.Storeinfo[0]);

        console.log(response.data.Storeinfo[0], "나오니");
      } catch (error) {
        console.error("게시글 상세 정보를 가져오는 도중 오류 발생:", error);
      }
    };

    // board_seq가 변경될 때마다 fetchBoardDetail 함수 호출
    fetchBoardDetail();
  }, [store_idx]);



  return (
    <>
    <Row className="mt-5">
    </Row>
    <Container>
      <Row className="my-4">
        <Col lg={12} md={12} sm={12} className="t2St">
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

      <Snavs />
      <Outlet />
    </Container>
    </>
  );
};
export default Shop;
