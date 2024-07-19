const express = require("express");
const router = express.Router();
const conn = require("../config/database");

router.get("/", (req, res) => {
    console.log("캘린더 라우터  ");
    let sql = "select * from calendar";
    conn.query(sql, (err, rows) => {
      if (err) {
        console.error('캘린더 라우터 쿼리 오류:', err);
        res.status(500).json({ error: '서버 오류' });
        return;
      }
      if (rows.length > 0) {
        console.log("데이터 가져와짐");
        res.json({
          calendar : rows,
        });
        console.log(rows.data);
      } else {
        console.log("캘린더 라우터 값 문제");
        res.status(404).json({ error: '데이터가 없습니다.' });
      }
    });
  });
  

  router.post('/add', (req, res) => {
    const newEvent = req.body; // 클라이언트에서 전송된 새 이벤트 객체
  
    // MySQL 쿼리: 새 이벤트 추가
    const query = 'INSERT INTO calendar (cal_title, cal_st_dt, cal_st_tm, cal_ed_dt, cal_ed_tm, cal_loc, cal_color, mem_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
    const values = [
      newEvent.title,
      newEvent.start.substring(0, 10), // 날짜 부분만 추출하여 사용 (YYYY-MM-DD 형식)
      newEvent.start.substring(11, 19), // 시간 부분만 추출하여 사용 (HH:MM:SS 형식)
      newEvent.end.substring(0, 10), // 날짜 부분만 추출하여 사용 (YYYY-MM-DD 형식)
      newEvent.end.substring(11, 19), // 시간 부분만 추출하여 사용 (HH:MM:SS 형식)
      newEvent.location,
      newEvent.color,
      newEvent.mem_id
    ];
  
    // 쿼리 실행
    conn.query(query, values, (err, result) => {
      if (err) {
        console.error('이벤트 추가 실패:', err);
        res.status(500).send('이벤트 추가 실패');
      } else {
        console.log('새 이벤트가 성공적으로 추가되었습니다.');
        newEvent.cal_idx = result.insertId; // 새로 추가된 이벤트의 인덱스(ID)를 저장
        res.status(201).json(newEvent); // 성공 시 클라이언트에게 추가된 이벤트 객체 응답
      }
    });
  });
module.exports = router;