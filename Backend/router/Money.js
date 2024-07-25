const express = require("express");
const router = express.Router();
const conn = require("../config/database");

router.post("/:mem_id", (req, res) => {
    let mem_id = req.params.mem_id; // URL에서 mem_id를 가져옴
    console.log("내정보 라우터 mem_id:", mem_id);

    let sql = "SELECT * FROM tbl_moneys WHERE mem_id = ?"; // mem_id를 이용한 SQL 쿼리
    
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
            MyMoney: rows,
        });
        } else {
        console.log("내정보 라우터 값 문제");
        res.status(404).json({ error: "데이터가 없습니다." });
        }
    });
});



module.exports = router;
