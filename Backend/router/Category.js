const express = require("express");
const router = express.Router();
const conn = require("../config/database");

router.get("/", (req, res) => {
    console.log("카테고리 라우터");
    let sql = "select * from tbl_category";
    conn.query(sql, (err, rows) => {
      if (err) {
        console.error('카테고리 라우터 쿼리 오류:', err);
        res.status(500).json({ error: '서버 오류' });
        return;
      }
      if (rows.length > 0) {
        console.log("데이터 가져와짐");
        res.json({
          Category : rows,
        });
      } else {
        console.log("카테고리 라우터 값 문제");
        res.status(404).json({ error: '데이터가 없습니다.' });
      }
    });
  });


  router.get("/:category_p_name", (req, res) => {
    console.log("카테고리 라우터");
    const category_p_name = req.params.category_p_name;
    let sql = "SELECT * FROM tbl_store WHERE category_p_name = ? LIMIT 4";

  
    conn.query(sql, [category_p_name], (err, rows) => {
      if (err) {
        console.error('카테고리 라우터 쿼리 오류:', err);
        res.status(500).json({ error: '서버 오류' });
        return;
      }
      if (rows.length > 0) {
        console.log("데이터 가져와짐");
        res.json({
          Categorys: rows,
        });
      } else {
        console.log("카테고리 라우터 값 문제");
        res.status(404).json({ error: '데이터가 없습니다.' });
      }
    });
  });


  router.get("/all/:category_p_name", (req, res) => {
    console.log("카테고리 라우터");
    const category_p_name = req.params.category_p_name;
    let sql = "SELECT * FROM tbl_store WHERE category_p_name = ?";

  
    conn.query(sql, [category_p_name], (err, rows) => {
      if (err) {
        console.error('카테고리 라우터 쿼리 오류:', err);
        res.status(500).json({ error: '서버 오류' });
        return;
      }
      if (rows.length > 0) {
        console.log("데이터 가져와짐");
        res.json({
          Categorys: rows,
        });
      } else {
        console.log("카테고리 라우터 값 문제");
        res.status(404).json({ error: '데이터가 없습니다.' });
      }
    });
  });



module.exports = router;
