// src/components/Mypage/Sbasket.js
import React, { useContext } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button"; // Button 임포트 추가
import  CartContext  from "../CartContext";

const Sbasket = () => {
  const { cart, removeFromCart } = useContext(CartContext);

  const handleRemove = (item) => {
    removeFromCart(item);
  };

  return (
    <div>
      <h1 className='mt-4'>장바구니</h1>
      <Table className='mt-4' striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>카테고리</th>
            <th colSpan={2}>제품 정보</th>
            <th>예상금액</th>
            <th>삭제</th>
          </tr>
        </thead>
        <tbody>
          {cart.map((item, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{item.category}</td>
              <td><img src={item.store_img} alt={item.store_name} width="100" /></td>
              <td>{item.store_name}</td>
              <td>{item.price}</td>
              <td>
                <Button
                  variant="danger"
                  onClick={() => handleRemove(item)}
                >
                  삭제
                </Button>
              </td>
            </tr>
          ))}
          <tr>
            <td></td>
            <td colSpan={4}>합계</td>
            <td>
              {/* 총 합계 계산 필요 */}
            </td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
};

export default Sbasket;
