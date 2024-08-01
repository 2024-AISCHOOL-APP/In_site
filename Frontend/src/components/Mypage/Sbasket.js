import React, { useContext, useState, useEffect } from "react";
import { Container, Row, Col, Table, Button, Image } from "react-bootstrap";
import CartContext from "../CartContext";
import "../../css/Sbasket.css";
import axios from "../../axios";
import Swal from 'sweetalert2';

const Sbasket = () => {
  const { cartItems, removeItem } = useContext(CartContext);
  const [totalPrice, setTotalPrice] = useState(0);
  const [dataMoney, setDataMoney] = useState([]);

  const mem_id = window.sessionStorage.getItem('mem_id');

  useEffect(() => {
    axios
      .post(`/shop/cart/s/${mem_id}`)
      .then((res) => {
        console.log("게시판 데이터", res.data.Cartinfo);
        setDataMoney(res.data.Cartinfo);
        calculateTotal(res.data.Cartinfo);
      })
      .catch(() => {
        console.log("데이터 보내기 실패");
      });
  }, [mem_id]);

  const handleDelete = (cart_idx) => {
    Swal.fire({
      title: '삭제하시겠습니까?',
      text: "이 작업은 되돌릴 수 없습니다!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6 ',
      cancelButtonText: '아니요',
      confirmButtonText: '네'
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete('/shop/cart/delete', { data: { ids: [cart_idx] } })
          .then((res) => {
            if (res.data) {
              setDataMoney(dataMoney.filter((item) => item.cart_idx !== cart_idx));
              calculateTotal(dataMoney.filter((item) => item.cart_idx !== cart_idx)); // 총 가격 업데이트
              Swal.fire(
                '삭제되었습니다!',
                '장바구니에서 삭제되었습니다.',
                'success'
              );
            } else {
              console.error("삭제 실패:", res.data);
            }
          })
          .catch((err) => {
            console.error("삭제 요청 실패:", err);
          });
      }
    });
  };

  const calculateTotal = (items) => {
    const total = items.reduce((sum, item) => sum + (item.prod_price || 0), 0);
    setTotalPrice(total);
  };

  return (
    <Container className="sbasket-container">
      <Row className="justify-content-center">
        <Col xs={12} md={10}>
          <h2 className="sbasket-header">장바구니</h2>
          {dataMoney.length === 0 ? (
            <p className="sbasket-empty">장바구니가 비어 있습니다.</p>
          ) : (
            <Table responsive striped bordered hover className="sbasket-table">
              <thead>
                <tr>
                  <th>이미지</th>
                  <th>상품명</th>
                  <th>가격</th>
                  <th>삭제</th>
                </tr>
              </thead>
              <tbody>
                {dataMoney.map((item, index) => (
                  <tr key={index} >
                    <td data-label="이미지">
                      <Image src={item.prod_img} rounded className="cart-item-image" />
                    </td>
                    <td data-label="상품명" className="table_ddddd">{item.prod_name}</td>
                    <td data-label="가격" className="table_ddddd">{item.prod_price ? item.prod_price.toLocaleString() : "0"}원</td>
                    <td data-label="삭제" className="table_ddddd">
                      <Button variant="danger" onClick={() => handleDelete(item.cart_idx)}>
                        <span>삭제</span>
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
          <h3 className="sbasket-total">총 가격: {totalPrice.toLocaleString()}원</h3>
        </Col>
      </Row>
    </Container>
  );
};

export default Sbasket;
