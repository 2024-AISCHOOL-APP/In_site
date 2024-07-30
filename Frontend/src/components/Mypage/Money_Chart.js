import React, {useEffect, useState} from 'react'
import MyDonutCharts from './MyDonutCharts'
import axios from "../../axios";
import { Row, Col, ProgressBar } from 'react-bootstrap'
import '../../css/Money_Chart.css'

const Money_Chart = () => {

  const [dataMoney, setDataMoney] = useState([]);
  let mem_id = window.sessionStorage.getItem('mem_id');

  useEffect(() => {
    axios
      .post(`/Money/${mem_id}`)
      .then((res) => {
        if (res.data.MyMoney) {
          const formattedEvents = res.data.MyMoney.reduce((acc, item) => {
            const {category_name, moneys_amount} = item;
            if (acc[category_name]) {
              acc[category_name] += moneys_amount;
            } else{
              acc[category_name] = moneys_amount;
            }
            return acc;
          }, {});

          const formattedData = Object.keys(formattedEvents).map(category_name => ({
            title : category_name,
            price : formattedEvents[category_name]
          }));

          setDataMoney(formattedData);
          console.log('성공');
        }
      })
      .catch((error) => {
        console.error("fetching 에러입니다:", error);
      });
  },[mem_id]);

  const totalAmount = dataMoney.reduce((acc, item) => acc + item.price, 0);

  return (
    <div>
      <Row className='mt-4'><br/>
        <Col lg={6}>
          <MyDonutCharts/>
        </Col>
        
        <Col  className='mt-5' lg={6}> 
          {dataMoney.map((item, index) => (
            <div key={index}>
              <h5>{item.title}</h5>
              <ProgressBar
                // 각 카테고리의 비중을 프로그레스 바에 반영
                className={`mt-4 num${index+1}`}
                striped
                animated
                now={(item.price / totalAmount) * 100}
                // 프로그레스바 라벨 추가 (비율 표시)
                label={`${((item.price / totalAmount) *100).toFixed(2)}%`}
              /><br/><br/>
            </div>
          ))}
          {/* <ProgressBar className='mt-4 num1' striped animated now={40} /><br/><br/>
          <ProgressBar className='mt-4 num2' striped animated now={40} /><br/><br/>
          <ProgressBar className='mt-4 num3' striped animated now={40} /><br/><br/>
          <ProgressBar className='mt-4 num4' striped animated now={40} /><br/><br/> */}
        </Col>
      </Row>
    </div>
  )
}

export default Money_Chart