// import React, { useEffect, useState } from 'react';
// import { Button, Col, Container, Row } from 'react-bootstrap';
// import MyDonutChart from './MyDonutChart';
// import FullCalendarPage from './FullCalendarPage'
// import axios from "../../axios";
// import Moneyss from '../Moneyss';
// import { DateComponent } from '@fullcalendar/core/internal';
// import Table from 'react-bootstrap/Table';
// // import Dropdown from 'react-bootstrap/Dropdown';
// import Tab from 'react-bootstrap/Tab';
// import Tabs from 'react-bootstrap/Tabs';
// import ButtonGroup from 'react-bootstrap/ButtonGroup';
// import MyDonutCharts from './MyDonutCharts';
// import ProgressBar from 'react-bootstrap/ProgressBar';

// const Moneys = () => {

//   const [dataMoney,setDataMoney] = useState([])

//   let mem_id = window.sessionStorage.getItem('mem_id');
//   let seq = window.sessionStorage.getItem('mem_seq')

//   useEffect(() => {
//   //   axios
//   //     .post(`/Money/${mem_id}`)
//   //     .then((res) => {
//   //       console.log("게시판 데이터", res.data.MyMoney);
//   //       setDataMoney(res.data.MyMoney)
//   //     })
//   //     .catch(() => {
//   //       console.log("데이터 보내기 실패");
//   //     });
//   // },[])
//     const 
//   })

//   let today = new Date();
//   let day = ['일', '월', '화', '수', '목', '금', '토'];

//   return (
//     <Container>
//       <Row className='mt-4'>
//         <Col className='my-3'></Col>
//       </Row>
//       <Row>
//         <Tabs
//           defaultActiveKey="profile"
//           id="uncontrolled-tab-example"
//           className="mb-3"
//         >
//           <Tab eventKey="input" title="입력">
//             <Table responsive="sm">
//               <thead>
//                 <tr>
//                   <th colSpan={12} style={{position : 'relative', left : 0, color : 'gray'}}>{today.getMonth()+1}월 {today.getDate()}일 {day[today.getDay()]}요일</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 <tr>
//                   <td>1</td>
//                   <td>드레스</td> 
//                   {/* 구분 */}
//                   <td>(본식) 드레스 1벌</td>
//                   {/* 내용 */}
//                   <td>1,080,000원</td>
//                   {/* 가격 */}
//                   <td>신한</td>
//                   {/* 계좌관리 */}
//                   <td>내용없음</td>
//                   {/* 비고 */}
//                 </tr>
//               </tbody>
//             </Table>
//             <ButtonGroup aria-label="Basic example">
//               <Button variant="secondary" onClick={() => {}}>추가</Button>
//               <Button variant="secondary">수정</Button>
//               <Button variant="secondary">삭제</Button>
//             </ButtonGroup>
//           </Tab>
//           <Tab eventKey="calendar" title="캘린더">
//             <FullCalendarPage></FullCalendarPage>
//             <br/><br/>
//             <ButtonGroup aria-label="Basic example">
//               <Button variant="secondary"onClick={() => {}}>입력</Button>
//               <Button variant="secondary">수정</Button>
//               <Button variant="secondary">삭제</Button>
//             </ButtonGroup>
//           </Tab>
//           <Tab eventKey="chart" title="차트">
//             <MyDonutCharts></MyDonutCharts>
//             <br></br><br></br>
//             <div>
//               <Row xs={12}>
//                 <Col xs={2} className='mt-4'>웨딩홀</Col>
//                 <Col xs={10}>              
//                   <ProgressBar className='mt-4' striped variant="success" animated now={40} />
//                 </Col>
//               </Row>
//               <Row xs={12}>
//                 <Col xs={2} className='mt-4'>드레스</Col>
//                 <Col xs={10}>              
//                   <ProgressBar className='mt-4' striped variant="info" animated now={20} />
//                 </Col>
//               </Row>
//               <Row xs={12}>
//                 <Col xs={2} className='mt-4'>메이크업</Col>
//                 <Col xs={10}>              
//                   <ProgressBar className='mt-4' striped variant="warning" animated now={60} />
//                 </Col>
//               </Row>
//               <Row xs={12}>
//                 <Col xs={2} className='mt-4'>스튜디오</Col>
//                 <Col xs={10}>              
//                   <ProgressBar className='mt-4' striped variant="danger" animated now={80} />
//                 </Col>
//               </Row>
//             </div>
//           </Tab>
//         </Tabs>
//         </Row>
//     </Container>
//   );
// };

// export default Moneys;
