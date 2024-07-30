// src/context/CartContext.js
import React, { createContext, useReducer } from "react";

// 장바구니 초기 상태
const initialState = [];

// 장바구니 리듀서
const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      return [...state, action.payload];
    case "REMOVE_FROM_CART":
      return state.filter(item => item.store_idx !== action.payload.store_idx);
    default:
      return state;
  }
};

// CartContext 생성
const CartContext = createContext();

// CartProvider 컴포넌트
export const CartProvider = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, initialState);

  // 장바구니에 아이템 추가
  const addToCart = (item) => {
    dispatch({ type: "ADD_TO_CART", payload: item });
  };

  // 장바구니에서 아이템 삭제
  const removeFromCart = (item) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: item });
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
