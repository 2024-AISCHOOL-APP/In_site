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
  
  module.exports = router;