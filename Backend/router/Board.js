const express = require("express");
const router = express.Router();
const conn = require("../config/database");


router.get("/", (req, res) => {
    console.log("게시판 라우터");
    let sql = "select * from board";
    conn.query(sql, (err, rows) => {
      if (err) {
        console.error('게시판 라우터 쿼리 오류:', err);
        res.status(500).json({ error: '서버 오류' });
        return;
      }
      if (rows.length > 0) {
        console.log("데이터 가져와짐");
        res.json({
          board : rows,
        });
      } else {
        console.log("게시판 라우터 값 문제");
        res.status(404).json({ error: '데이터가 없습니다.' });
      }
    });
  });
  
  
  
  router.get('/:board_seq', (req, res) => {
    const board_seq = req.params.board_seq;
  
    let sql = "SELECT * FROM board WHERE board_seq = ?";
    conn.query(sql, [board_seq], (err, rows) => {
      if (err) {
        console.error('게시글 상세 정보 조회 중 오류 발생:', err);
        res.status(500).json({ error: '서버 오류' });
        return;
      }
      if (rows.length > 0) {
        console.log("게시글 상세 정보를 성공적으로 가져왔습니다.");
        res.json({
          id: rows[0].mem_id,
          title: rows[0].board_title,
          content: rows[0].board_content,
          img : rows[0].board_img
        });
        console.log(res.json,"게시글 정보");
      } else {
        console.log("게시글을 찾을 수 없습니다.");
        res.status(404).json({ error: '게시글을 찾을 수 없습니다.' });
      }
    });
  });


  router.post("/add", (req, res) => {
    const newEvent = req.body; // 클라이언트에서 전송된 새 이벤트 객체
  
    // MySQL 쿼리: 새 이벤트 추가
    const query =
      "INSERT INTO board (mem_id, board_title, board_at, board_content,board_img) VALUES (?, ?, ?, ?, ?)";
    const values = [
      newEvent.title,
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
  
  module.exports = router;