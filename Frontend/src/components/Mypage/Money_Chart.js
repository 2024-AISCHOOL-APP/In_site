import React, { useEffect, useState } from 'react'
import MyDonutCharts from './MyDonutCharts'
import axios from "../../axios";
import { Row, Col, ProgressBar } from 'react-bootstrap'
import '../../css/Money_Chart.css'

const Money_Chart = () => {

  const [dataMoney, setDataMoney] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  let mem_id = window.sessionStorage.getItem('mem_id');

  useEffect(() => {
    axios
      .post(`/Money/${mem_id}`)
      .then((res) => {
        if (res.data.MyMoney) {
          const formattedEvents = res.data.MyMoney.reduce((acc, item) => {
            const { category_name, moneys_amount } = item;
            if (acc[category_name]) {
              acc[category_name] += moneys_amount;
            } else {
              acc[category_name] = moneys_amount;
            }
            return acc;
          }, {});

          const formattedData = Object.keys(formattedEvents).map(category_name => ({
            title: category_name,
            price: formattedEvents[category_name]
          }));

          setDataMoney(formattedData);
          setIsLoading(false);
          console.log('성공');
        } else {
          setIsLoading(false);
        }
      })
      .catch((error) => {
        console.error("fetching 에러입니다:", error);
        setIsLoading(false);
      });
  }, [mem_id]);

  const totalAmount = dataMoney.reduce((acc, item) => acc + item.price, 0);

  return (
    <div>
      {/* 초기화면 표시 조건 */}
      {isLoading ? (
        <div>Loading...</div> // 데이터 로딩 중일 때 표시할 내용
      ) : dataMoney.length === 0 ? (
        <div className='mt-4'>
          <p>데이터가 없습니다. '입력' 탭에서 데이터를 추가해주세요.</p>
        </div>
      ) : (
        <>

          <div>
            <Row className='mt-4'><br />
              <Col lg={6}>
                <MyDonutCharts />
              </Col>

              <Col className='mt-5' lg={6}>
                <br /><br />
                {dataMoney.map((item, index) => (
                  <div key={index}>
                    <h5 className='mt-4'>{item.title}</h5>
                    <ProgressBar
                      // 각 카테고리의 비중을 프로그레스 바에 반영
                      className={`mt-4 num${index + 1}`}
                      striped
                      animated
                      now={(item.price / totalAmount) * 100}
                      // 프로그레스바 라벨 추가 (비율 표시)
                      label={`${((item.price / totalAmount) * 100).toFixed(2)}%`}
                    />
                  </div>
                ))}
                {/* <ProgressBar className='mt-4 num1' striped animated now={40} /><br/><br/>
          <ProgressBar className='mt-4 num2' striped animated now={40} /><br/><br/>
          <ProgressBar className='mt-4 num3' striped animated now={40} /><br/><br/>
          <ProgressBar className='mt-4 num4' striped animated now={40} /><br/><br/> */}
              </Col>
            </Row>
          </div>
        </>
      )}
    </div>
  );
}

export default Money_Chart