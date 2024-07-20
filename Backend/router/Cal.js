const express = require("express");
const router = express.Router();
const conn = require("../config/database");

router.get("/:mem_id", (req, res) => {
  let mem_id = req.params.mem_id; // URL에서 mem_id를 가져옴
  console.log("캘린더 라우터 mem_id:", mem_id);

  let sql = "SELECT * FROM calendar WHERE mem_id = ?"; // mem_id를 이용한 SQL 쿼리

  conn.query(sql, [mem_id], (err, rows) => {
    if (err) {
      console.error("캘린더 라우터 쿼리 오류:", err);
      res.status(500).json({ error: "서버 오류" });
      return;
    }
    if (rows.length > 0) {
      console.log("데이터 가져와짐");
      res.json({
        calendar: rows,
      });
    } else {
      console.log("캘린더 라우터 값 문제");
      res.status(404).json({ error: "데이터가 없습니다." });
    }
  });
});

router.post("/add", (req, res) => {
  const newEvent = req.body; // 클라이언트에서 전송된 새 이벤트 객체

  // MySQL 쿼리: 새 이벤트 추가
  const query =
    "INSERT INTO calendar (cal_title, cal_st_dt, cal_st_tm, cal_ed_dt, cal_ed_tm, cal_loc, cal_color, mem_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
  const values = [
    newEvent.title,
    newEvent.start.substring(0, 10), // 날짜 부분만 추출하여 사용 (YYYY-MM-DD 형식)
    newEvent.start.substring(11, 19), // 시간 부분만 추출하여 사용 (HH:MM:SS 형식)
    newEvent.end.substring(0, 10), // 날짜 부분만 추출하여 사용 (YYYY-MM-DD 형식)
    newEvent.end.substring(11, 19), // 시간 부분만 추출하여 사용 (HH:MM:SS 형식)
    newEvent.location,
    newEvent.color,
    newEvent.mem_id,
  ];

  // 쿼리 실행
  conn.query(query, values, (err, result) => {
    if (err) {
      console.error("이벤트 추가 실패:", err);
      res.status(500).send("이벤트 추가 실패");
    } else {
      console.log("새 이벤트가 성공적으로 추가되었습니다.");
      newEvent.cal_idx = result.insertId; // 새로 추가된 이벤트의 인덱스(ID)를 저장
      res.status(201).json(newEvent); // 성공 시 클라이언트에게 추가된 이벤트 객체 응답
    }
  });
});

router.post("/Update", (req, res) => {
  console.log("캘린더 업데이트 라우터");

  // 클라이언트에서 전송된 요청 바디에서 데이터 추출
  const newEvent = req.body;

  // UPDATE 쿼리 준비
  const sql = `
    UPDATE calendar
    SET cal_title = ?,
        cal_st_dt = ?,
        cal_st_tm = ?,
        cal_ed_dt = ?,
        cal_ed_tm = ?,
        cal_loc = ?,
        cal_color = ?
    WHERE mem_id = ? AND cal_idx = ?;
  `;

  // 쿼리 실행을 위한 값 배열 준비
  const values = [
    newEvent.title,
    newEvent.start.substring(0, 10), // 날짜 부분만 추출하여 사용 (YYYY-MM-DD 형식)
    newEvent.start.substring(11, 19), // 시간 부분만 추출하여 사용 (HH:MM:SS 형식)
    newEvent.end.substring(0, 10), // 날짜 부분만 추출하여 사용 (YYYY-MM-DD 형식)
    newEvent.end.substring(11, 19), // 시간 부분만 추출하여 사용 (HH:MM:SS 형식)
    newEvent.location,
    newEvent.color,
    newEvent.mem_id,
    newEvent.cal_idx
  ];

  // 쿼리 실행
  conn.query(sql, values, (err, result) => {
    if (err) {
      console.error("업데이트 실패입니다.", err);
      res.status(500).json({
        error: "업데이트에 실패했습니다."
      });
    } else {
      console.log("업데이트 성공");
      res.json({
        success: "업데이트 되었습니다."
      });
    }
  });
});


router.delete('/delete/:cal_idx', (req, res) => {
  const calIdx = req.params.cal_idx;
  const sql = `DELETE FROM calendar WHERE cal_idx=?`;
  conn.query(sql, [calIdx], (err, result) => {
    if (err) {
      console.error('Error deleting event:', err);
      res.status(500).send('Error deleting event');
      return;
    }
    res.json({ message: 'Event deleted successfully' });
  });
});


module.exports = router;
