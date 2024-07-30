import React, { useContext } from 'react';
import CartContext from '../context/CartContext';
import Sbasket from './Sbasket';

const Whyrano = () => {
  const { cart } = useContext(CartContext);

  return (
    <div>
      <h1>Whyrano</h1>
      <div className="user-info">
        <h2>사용자 정보</h2>
        {/* 사용자 정보를 여기에 추가 */}
      </div>
      <Sbasket cart={cart} />
    </div>
  );
};

export default Whyrano;
