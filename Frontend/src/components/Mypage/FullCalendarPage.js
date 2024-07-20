import React, { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import Swal from 'sweetalert2';
import '../../css/FullCalendarPage.css';
import Camodal from './Camodal';
import axios from 'axios';
import Upmodal from './Upmodal';

const FullCalendarPage = ({ mem_id }) => {
  const [showModal, setShowModal] = useState(false);
  const [showeModal, setShoweModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [startDate, setStartDate] = useState('');
  const [infoTitle, setInfoTitle] = useState('');
  const [infoLocation, setInfoLocation] = useState('');
  const [endDate, setEndDate] = useState('');
  const [events, setEvents] = useState([]);
  const [calIdx, setCalIdx] = useState('');

  useEffect(() => {
    fetchEvents();
  }, [showModal, showeModal,calIdx]);

  const fetchEvents = () => {
    axios.get(`http://localhost:5000/Calender/${mem_id}`)
      .then((res) => {
        const formattedEvents = res.data.calendar.map(event => ({
          title: event.cal_title,
          start: combineDateTime(event.cal_st_dt, event.cal_st_tm),
          end: combineDateTime(event.cal_ed_dt, event.cal_ed_tm),
          location: event.cal_loc,
          color: event.cal_color,
          cal_idx: event.cal_idx
        }));
        setEvents(formattedEvents);
      })
      .catch((error) => {
        console.error("Error fetching events:", error);
      });
  };

  const combineDateTime = (dateStr, timeStr) => {
    const date = new Date(dateStr);
    const time = timeStr.split(':');
    date.setHours(Number(time[0]));
    date.setMinutes(Number(time[1]));
    return date;
  };

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
    const eventStart = info.event.start;
    const eventEnd = info.event.end;
    const eventTitle = info.event.title;
    const eventLocation = info.event.extendedProps.location;
    const calIdx = info.event.extendedProps.cal_idx;

    Swal.fire({
      title: '일정',
      html:
        `<div style="text-align: center; background-color: #f0f0f0; border-radius: 8px; padding: 16px; margin-top: 16px;">
          <div style="text-align: left; padding-left: 16px;">
            <div style="margin-bottom: 12px;">
              <strong style="display: inline-block; width: 100px; font-weight: bold; color: #3085d6;">일정 내용:</strong> ${eventTitle}
            </div>
            <div style="margin-bottom: 12px;">
              <strong style="display: inline-block; width: 100px; font-weight: bold; color: #3085d6; padding-left:40px;">장소:</strong> ${eventLocation}
            </div>
            <div style="margin-bottom: 12px;">
              <strong style="display: inline-block; width: 100px; font-weight: bold; color: #3085d6;  padding-left:40px; ">시작:</strong> ${eventStart.toLocaleString()}
            </div>
            <div>
              <strong style="display: inline-block; width: 100px; font-weight: bold; color: #3085d6;  padding-left:40px;">종료:</strong> ${eventEnd.toLocaleString()}
            </div>
          </div>
        </div>`,
      icon: 'info', // Changing the icon to an information icon
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
        setStartDate(eventStart);
        setEndDate(eventEnd);
        setInfoTitle(eventTitle);
        setInfoLocation(eventLocation);
        setCalIdx(calIdx);
      } else if (result.isDenied) {
        deleteEvent(calIdx);
      }
    });
  };

  const deleteEvent = (calIdx) => {
    axios.delete(`http://localhost:5000/Calender/Delete/${calIdx}`)
      .then(response => {
        console.log(response.data);
        // 삭제가 성공적으로 이루어졌을 때, 캘린더에서도 해당 이벤트를 제거
        setEvents(events.filter(event => event.cal_idx !== calIdx));
        Swal.fire('삭제되었습니다.', '화끈하시네요~!', 'success');
      })
      .catch(error => {
        console.error('삭제 실패:', error);
        Swal.fire('삭제 실패', '문제가 발생하여 삭제하지 못했습니다.', 'error');
      });
  };

  return (
    <>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        headerToolbar={{
          left: 'prev,today,next',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek'
        }}
        buttonText={{
          month: '월',
          week: '주',
          today: '오늘'
        }}
        initialView="dayGridMonth"
        // editable={true}
        // selectable={true}
        nowIndicator={true}
        locale="ko"
        events={events}
        timeZone="local"
        dateClick={dateClick}
        eventClick={eventClick}
        eventTimeFormat={{
          hour: 'numeric',
          minute: '2-digit',
          meridiem: false
        }}
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
        titles={infoTitle}
        locations={infoLocation}
        cal_Idx={calIdx}
      />
    </>
  );
};

export default FullCalendarPage;
