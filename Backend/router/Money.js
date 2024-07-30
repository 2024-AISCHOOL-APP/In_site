const express = require("express");
const router = express.Router();
const conn = require("../config/database");

// router.post("/:mem_id", (req, res) => {
//     let mem_id = req.params.mem_id; // URL에서 mem_id를 가져옴
//     console.log("내정보 라우터 mem_id:", mem_id);

//     let sql = "SELECT * FROM tbl_moneys WHERE mem_id = ?"; // mem_id를 이용한 SQL 쿼리
    
//     conn.query(sql, [mem_id], (err, rows) => {

//         console.log("조회된 데이터:", rows); // 데이터 확인용 로그

//         if (rows.length > 0) {
//         console.log("데이터 가져와짐55");
//         res.json({
//             MyMoney: rows
//         });
//         } else {
//         console.log("내정보 라우터 값 문제");
//         res.status(404).json({ error: "데이터가 없습니다." });
//         }
//     });
// });

router.post("/m/add", (req, res) => {
    const newEvent = req.body; // 클라이언트에서 전송된 새 객체

    const sql = "INSERT INTO tbl_moneys(category_name, moneys_contents, moneys_amount, moneys_bank, moneys_created_at, mem_id) VALUES (?, ?, ?, ?, ?, ?)";

    const values = [
        newEvent.category,
        newEvent.content, // 날짜 부분만 추출하여 사용 (YYYY-MM-DD 형식)
        newEvent.price, // 시간 부분만 추출하여 사용 (HH:MM:SS 형식)
        newEvent.bank, // 날짜 부분만 추출하여 사용 (YYYY-MM-DD 형식)
        newEvent.date.substring(0,10), // 시간 부분만 추출하여 사용 (HH:MM:SS 형식)
        newEvent.mem_id
        // newEvent.memo
      ];     
  // 쿼리 실행
  conn.query(sql, values, (err, result) => {

    if (err) {
      console.log("추가값 라우터 값 문제");
      console.error("정보 추가 실패:", err);
      res.status(500).send("정보 추가 실패");

    } else {
      console.log("새 이벤트가 성공적으로 추가되었습니다.");
      newEvent.moneys_idx = result.insertId; // 새로 추가된 이벤트의 인덱스(ID)를 저장
      res.status(201).json(newEvent); // 성공 시 클라이언트에게 추가된 이벤트 객체 응답

       // MySQL 쿼리: 새 이벤트 추가
    }
  });
});

router.post("/m/update", (req, res) => {
  const postData = req.body;
  const sql = "UPDATE tbl_moneys SET category_name=?, moneys_contents =?, moneys_amount=?, moneys_bank=?, moneys_created_at=? WHERE moneys_idx=? AND mem_id=? ";

  const values = [
    postData.category,
    postData.content,
    postData.price,
    postData.bank,
    postData.date.substring(0, 10),
    postData.moneys_idx,
    postData.mem_id
  ];

    // 쿼리 실행
    conn.query(sql, values, (err, res) => {
      if (err) {
        console.log("수정값 라우터 값 문제");
        console.error("정보 수정 실패:", err);
        res.status(500).send("정보 수정 실패");
      } else {
        console.log("이벤트가 성공적으로 수정되었습니다.");

      }
    });
})



router.delete("/m/delete", (req, res) => {
  const {ids} = req.body;
  const sql = `DELETE FROM tbl_moneys WHERE moneys_idx IN (?)`;

  conn.query(sql, [ids], (err, results) => {
    if(err) {
      console.log("삭제값 라우터 값 문제");
      console.error("삭제 실패:", err);
      res.status(500).send('삭제 실패');
    } else{
      console.log("삭제 성공");
      res.status(201).send('삭제성공')
    }
  })
});




module.exports = router;
