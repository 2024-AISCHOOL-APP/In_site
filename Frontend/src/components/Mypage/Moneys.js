import React, { memo } from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';
import Money_Tab from './Money_Tab';
import Money_Cal from './Money_Cal';

const Moneys = () => {
  return (
    <div>
      <Money_Tab/>
      <Outlet></Outlet>
    </div>
  )
}

export default Moneys