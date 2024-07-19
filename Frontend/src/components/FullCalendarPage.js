import React, { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import Swal from 'sweetalert2';
import '../css/FullCalendarPage.css';
import Camodal from './Camodal';
import axios from 'axios';
import Upmodal from './Upmodal';

const FullCalendarPage = ({ mem_id }) => {

  const [showModal, setShowModal] = useState(false);
  const [showeModal,  setShoweModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [startDate, setstartDate] = useState('');
  const [infoTitle, setInfoTitle] = useState('');
  const [infoLocation, setInfoLocation] = useState('');


  const [endDate, setendDate] = useState('');

  // const [events, setEvents] = useState([
  //   { title: 'event 1', start: '2024-07-04', end: '2024-07-07', color: '#0000FF', location : '광주' },
  //   { title: 'Event 2', date: '2024-07-23', start: '2024-07-23T10:00:00', end: '2024-07-23T15:00:00', color: '#0000FF', location : '광주'  },
  //   { title: 'Event 3', date: '2024-07-16', start: '2024-07-16T10:00:00', end: '2024-07-16T12:00:00', color: '#0000FF', location : '광주'  },
  //   { title: 'Event 4', date: '2024-07-16', start: '2024-07-16T15:00:00', end: '2024-07-16T17:00:00', color: '#0000FF' , location : '광주' },
  // ]);

  const [events, setEvents] = useState([]);
  

  useEffect(() => {
    axios
      .get("http://localhost:5000/Calender")
      .then((res) => {
        console.log("캘린더");
        setEvents(res.data.calendar)
        console.log(res.data.calendar);
      })
      .catch(() => {
        console.log("데이터 보내기 실패");
      });
  }, []);

  const dateClick = (info) => {
    setSelectedDate(info.dateStr);
    setShowModal(true);
  };


 

  const handleCloseModal = (newEvent) => {
    setShowModal(false); 
    setShoweModal(false); 
    if (newEvent) {
        setEvents(prevEvents => [...prevEvents, newEvent]);
    }
  };

  const eventClick = (info) => {
    // setSelectedDate(info.event.start);
    console.log(info.event.start,"ㅇ떻게 나오니>");
    console.log(info.event.end,"ㅇ떻게 나오니>");

    Swal.fire({
      title: '삭제 및 수정 하시겠습니까?',
      text: '다시 되돌릴 수 없습니다. 신중하세요.',
      icon: 'warning',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      confirmButtonText: '수정', 
      cancelButtonText: '취소', 
      denyButtonText: '삭제',
      reverseButtons: false, 
    }).then(result => {
      if (result.isConfirmed) { 
        setShoweModal(true);
        setstartDate(info.event.start)
        setendDate(info.event.end)
        setInfoTitle(info.event.title)
        setInfoLocation(info.event.extendedProps.location)
        
        // console.log(info.event.start,"수정 일자");
        // console.log(info.event,'지역 나오라dddd');
        // console.log(info.event.titlem,"제목");

        // console.log(info.event.extendedProps.location,'지역 나오라');
      } else if (result.isDenied) {
        console.log('삭제할 날짜:', info.event.start);
        Swal.fire('삭제되었습니다..', '화끈하시네요~!', 'success');
      }
    });
  };

  return (
    <>
    <h1></h1>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
        headerToolbar={{
          left: 'prev,today,next',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek',
        }}
        buttonText={{
          month: '월',
          week: '주',
          today: '오늘'
        }}
        initialView="dayGridMonth"
        editable={true}
        droppable={true}
        selectable={true}
        nowIndicator={true}
        locale={'ko'}
        dateClick={dateClick}
        eventClick={eventClick}
        events={events.map((schs, cnt) => ({
          title: schs.cal_title,
          start: schs.cal_st_dt,
          end : schs.cal_ed_dt,
          location : schs.cal_location,
          color : schs.cal_color
          
        }))} 
      />

      <Camodal
        show={showModal}
        handleClose={handleCloseModal}
        date={selectedDate}
        mem_id={mem_id}
      />

      <Upmodal 
          show={showeModal}
          handleClose={handleCloseModal}
          start={startDate}
          end={endDate}
          mem_id={mem_id}
          titles = {infoTitle}
          locations ={infoLocation}
      />
    </>
  );
};

export default FullCalendarPage;
