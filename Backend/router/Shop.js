const express = require("express");
const router = express.Router();
const conn = require("../config/database");


router.get("/:store_idx", (req, res) => {
    let store_idx = req.params.store_idx; // URL에서 mem_id를 가져옴
    console.log("샵 인포 라우터 store_idx:",store_idx);
  
    let sql = "SELECT * FROM tbl_store WHERE store_idx = ?"; // mem_id를 이용한 SQL 쿼리
  
    conn.query(sql, [store_idx], (err, rows) => {
      if (err) {
        console.error("샵 인포 라우터 쿼리 오류:", err);
        s;
        res.status(500).json({ error: "서버 오류" });
        return;
      }
      if (rows.length > 0) {
        console.log("데이터 가져와짐");
        res.json({
          Storeinfo: rows,
        });
      } else {
        console.log("내정보 라우터 값 문제");
        res.status(404).json({ error: "데이터가 없습니다." });
      }
    });
  });

  router.get("/:store_idx", (req, res) => {
    let store_idx = req.params.store_idx; // URL에서 mem_id를 가져옴
    console.log("샵 인포 라우터 store_idx:",store_idx);
  
    let sql = "SELECT * FROM tbl_store WHERE store_idx = ?"; // mem_id를 이용한 SQL 쿼리
  
    conn.query(sql, [store_idx], (err, rows) => {
      if (err) {
        console.error("샵 인포 라우터 쿼리 오류:", err);
        s;
        res.status(500).json({ error: "서버 오류" });
        return;
      }
      if (rows.length > 0) {
        console.log("데이터 가져와짐");
        res.json({
          Storeinfo: rows,
        });
      } else {
        console.log("내정보 라우터 값 문제");
        res.status(404).json({ error: "데이터가 없습니다." });
      }
    });
  });
  



module.exports = router;
