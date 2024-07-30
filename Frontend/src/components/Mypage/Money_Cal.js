import React, { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import Swal from 'sweetalert2';
import '../../css/FullCalendarPage.css';
import Camodal from './Camodal';
import axios from "../../axios";
import Upmodal from './Upmodal';
import { Col, Container, Row } from 'react-bootstrap';

const Money_Cal = () => {

  const [events, setEvents] = useState([]);
  let mem_id = window.sessionStorage.getItem('mem_id');

  useEffect(() => {
    console.log("mem_id:", mem_id); // mem_id가 잘 전달되고 있는지 확인
    if (mem_id) {
      fetchEvents();
    } else {
      console.error("mem_id가 설정되지 않았습니다.");
    }
  }, [mem_id]);

  const getCategoryColor = (category) => {
    switch (category) {
      case '웨딩홀':
        return '#FF5733'; // 예: 빨간색
      case '스튜디오':
        return '#33FF57'; // 예: 초록색
      case '드레스':
        return '#3357FF'; // 예: 파란색
      case '메이크업':
        return '#FF33A1'; // 예: 핑크색
      default:
        return '#000000'; // 기본값: 검은색
    }
  };

  const fetchEvents = () => {
    axios
      .post(`/Money/${mem_id}`)
      .then((res) => {
        if (res.data.MyMoney) {
          const formattedEvents = res.data.MyMoney.map(item => ({
            title: item.category_name,
            start: item.moneys_created_at,
            extendedProps: {
              price: item.moneys_amount,
              // backgroundColor : getCategoryColor(item.category_name),
              color : getCategoryColor(item.category_name)
            },
            // end: item.moneys_created_at,
            // category: item.moneys_contents,
            // bank: item.moneys_bank
          }));
          setEvents(formattedEvents);
        }
      })
      .catch((error) => {
        console.error("fetching 에러입니다:", error);
      });
  };

  const dateClick = (info) => {
    console.log('Date clicked:', info.dateStr);
  };

  const eventClick = (info) => {
    console.log('Event clicked:', info.event);
  };

  const renderEventContent = (eventInfo) => {
    if (!eventInfo.event || !eventInfo.event.title) return null;
    return (
      <div style={{color : eventInfo.event.extendedProps.color}}>
        <b>{eventInfo.timeText}</b>
        <i>{eventInfo.event.title}</i><br />
        <i>{eventInfo.event.extendedProps?.price || 'N/A'}원</i>
      </div>
    )
  };

  return (
    <Container>
      <Row className='mt-3'>
        <Col>
          <FullCalendar
            plugins={[dayGridPlugin, interactionPlugin]}
            headerToolbar={{
              left: 'prev,today,next',
              center: 'title',
              right: 'dayGridMonth'
            }}
            buttonText={{
              month: '월',
              today: '오늘'
            }}
            initialView="dayGridMonth"
            nowIndicator={true}
            locale="ko"
            events={events}
            weekends={true}
            selectMirror={false}
            navLinks={true}
            timeZone="local"
            displayEventTime={false}
            dateClick={dateClick}
            eventClick={eventClick}
            eventContent={renderEventContent}
            eventTimeFormat={{
              hour: 'numeric',
              minute: '2-digit',
              meridiem: false
            }}
          />
        </Col>
      </Row>
    </Container>
  );

};

export default Money_Cal;