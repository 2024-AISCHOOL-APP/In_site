const express = require("express");
const router = express.Router();
const conn = require("../config/database");

router.post("/:mem_id", (req, res) => {
  let mem_id = req.params.mem_id; // URL에서 mem_id를 가져옴
  console.log("내정보 라우터 mem_id:", mem_id);

  let sql = "SELECT * FROM tbl_member WHERE mem_id = ?"; // mem_id를 이용한 SQL 쿼리

  conn.query(sql, [mem_id], (err, rows) => {
    if (err) {
      console.error("내정보 라우터 쿼리 오류:", err);
      s;
      res.status(500).json({ error: "서버 오류" });
      return;
    }
    if (rows.length > 0) {
      console.log("데이터 가져와짐");
      res.json({
        Myinfo: rows,
      });
    } else {
      console.log("내정보 라우터 값 문제");
      res.status(404).json({ error: "데이터가 없습니다." });
    }
  });
});

router.post("/UpdateMyinfo/:mem_id", (req, res) => {
    let mem_id = req.params.mem_id; 
    console.log("내정보 라우터 mem_id:", mem_id);
  
    const newEvent = req.body;
  
 
    let sql = `
        UPDATE tbl_member
        SET mem_pw = ?,
            mem_nick = ?,
            mem_phone = ?,
            mem_email = ?
        WHERE mem_id = ?;
      `; 
  
    const values = [
      newEvent.mem_pw,
      newEvent.mem_nick,
      newEvent.mem_phone,
      newEvent.mem_email,
      mem_id
    ];
  
    // 쿼리 실행
    conn.query(sql, values, (err, result) => {
      if (err) {
        console.error("업데이트 실패입니다.", err);
        res.status(500).json({
          error: "업데이트에 실패했습니다.",
        });
      } else {
        console.log("업데이트 성공");
        res.json({
          success: "업데이트 되었습니다.",
        });
      }
    });
  });

  router.delete('/Delete/:mem_id', (req, res) => {
    let mem_id = req.params.mem_id;
    const sql = `DELETE FROM tbl_member WHERE mem_id=?`;
    conn.query(sql, [mem_id], (err, result) => {
      if (err) {
        console.error('Error deleting event:', err);
        res.status(500).send('Error deleting event');
        return;
      }
      res.json({ message: 'Event deleted successfully' });
    });
  });

  router.post("/s/save", (req, res) => {
    const saveData = req.body; // 클라이언트에서 전송된 새 객체
  
    const insertQuery = `
      INSERT INTO tbl_rec_prod_save (
        mem_id, 
        prod_name, 
        prod_price, 
        date, 
        guest_count, 
        prod_img
      ) VALUES (?, ?, ?, ?, ?, ?)
    `;
  
    const weddingHallValues = [
      saveData.mem_id,
      saveData.weddingHall.name,
      saveData.weddingHall.price,
      saveData.weddingHall.date,
      saveData.weddingHall.sit, // Assuming guest_count is the sit field
      saveData.weddingHall.img
    ];
  
    const studioValues = [
      saveData.mem_id,
      saveData.studio.name,
      saveData.studio.price,
      saveData.studio.date,
      saveData.studio.sit, // Assuming guest_count is the sit field
      saveData.studio.img
    ];
  
    const dressValues = [
      saveData.mem_id,
      saveData.dress.name,
      saveData.dress.price,
      saveData.dress.date,
      saveData.dress.sit, // Assuming guest_count is the sit field
      saveData.dress.img
    ];
  
    const makeupValues = [
      saveData.mem_id,
      saveData.makeup.name,
      saveData.makeup.price,
      saveData.makeup.date,
      saveData.makeup.sit, // Assuming guest_count is the sit field
      saveData.makeup.img
    ];
  
    // Save wedding hall
    conn.query(insertQuery, weddingHallValues, (err, result) => {
      if (err) {
        console.log("웨딩홀 저장 오류:", err);
        res.status(500).send("웨딩홀 저장 실패");
        return;
      }
  
      // Save studio
      conn.query(insertQuery, studioValues, (err, result) => {
        if (err) {
          console.log("스튜디오 저장 오류:", err);
          res.status(500).send("스튜디오 저장 실패");
          return;
        }
  
        // Save dress
        conn.query(insertQuery, dressValues, (err, result) => {
          if (err) {
            console.log("드레스 저장 오류:", err);
            res.status(500).send("드레스 저장 실패");
            return;
          }
  
          // Save makeup
          conn.query(insertQuery, makeupValues, (err, result) => {
            if (err) {
              console.log("메이크업 저장 오류:", err);
              res.status(500).send("메이크업 저장 실패");
              return;
            }
  
            console.log("모든 항목이 성공적으로 저장되었습니다.");
            res.status(201).json(saveData); // 성공 시 클라이언트에게 추가된 이벤트 객체 응답
          });
        });
      });
    });
  });



  router.post("/s/search/:mem_id", (req, res) => {
    let mem_id = req.params.mem_id; // URL에서 mem_id를 가져옴
    console.log("내정보 라우터 mem_id:", mem_id);
  
    let sql = "SELECT * FROM tbl_rec_prod_save WHERE mem_id = ?"; // mem_id를 이용한 SQL 쿼리
  
    conn.query(sql, [mem_id], (err, rows) => {
      if (err) {
        console.error("내정보 라우터 쿼리 오류:", err);
        res.status(500).json({ error: "서버 오류" });
        return;
      }
      if (rows.length > 0) {
        console.log("데이터 가져와짐");
        res.json({
          result: rows,
        });
      } else {
        console.log("내정보 라우터 값 문제");
        res.status(404).json({ error: "데이터가 없습니다." });
      }
    });
  });

  
module.exports = router;
