import React, { useContext, useState, useEffect } from "react";
import { Container, Row, Col, Table, Button, Image } from "react-bootstrap";
import CartContext from "../CartContext";
import "../../css/Sbasket.css";

const Sbasket = () => {
  const { cartItems, removeItem } = useContext(CartContext);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const calculateTotal = () => {
      const total = cartItems.reduce((sum, item) => sum + item.price, 0);
      setTotalPrice(total);
    };

    calculateTotal();
  }, [cartItems]);

  return (
    <Container className="my-5">
      <h2 className="text-center mb-4">장바구니</h2>
      {cartItems.length === 0 ? (
        <p className="text-center">장바구니가 비어 있습니다.</p>
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>이미지</th>
              <th>상품명</th>
              <th>가격</th>
              <th>삭제</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item, index) => (
              <tr key={index}>
                <td>
                  <Image src={item.store_img} rounded style={{ width: "100px", height: "100px" }} />
                </td>
                <td>{item.store}</td>
                <td>{item.price ? item.price.toLocaleString() : "0"}원</td>
                <td>
                  <Button variant="danger" onClick={() => removeItem(index)}>
                    삭제
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
      <h3 className="text-end">총 가격: {totalPrice.toLocaleString()}원</h3>
    </Container>
  );
};

export default Sbasket;
