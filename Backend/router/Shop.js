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

// 제품 정보 조회 라우터
router.get("/p/:store_idx", (req, res) =>{
let store_idx = req.params.store_idx; // URL에서 mem_id를 가져옴
console.log("샵 인포 라우터 store_idx:",store_idx);

let sql = "SELECT * FROM tbl_product WHERE store_idx = ?"; // mem_id를 이용한 SQL 쿼리

conn.query(sql, [store_idx], (err, rows) => {
  if (err) {
    console.error("샵 인포 라우터 쿼리 오류:", err);
    res.status(500).json({ error: "서버 오류" });
    return;
  }
  if (rows.length > 0) {
    console.log("데이터dd 가져와짐");
    res.json({
      productInfo: rows,
    });
  } else {
    console.log("내정보 라우터 값 문제");
    res.status(404).json({ error: "데이터가 없습니다." });
  }
});
});

router.get('/p/p/:store_idx', (req, res) => {
const store_idx = req.params.store_idx;

console.log("샵 인포 라우터 store_idx:", store_idx);

const sql = `
    SELECT p.prod_idx, p.prod_name, i.prod_img
    FROM tbl_product p
    LEFT JOIN tbl_product_img i ON p.prod_idx = i.prod_idx
    WHERE p.store_idx = ?
`;

conn.query(sql, [store_idx], (err, rows) => {
    if (err) {
        console.error("샵 인포 라우터 쿼리 오류:", err);
        res.status(500).json({ error: "서버 오류" });
        return;
    }

    const productInfo = rows.reduce((acc, row) => {
        const existingProduct = acc.find(p => p.prod_idx === row.prod_idx);
        if (existingProduct) {
            if (row.prod_img) {
                existingProduct.images.push(row.prod_img);
            }
        } else {
            acc.push({
                prod_idx: row.prod_idx,
                prod_name: row.prod_name,
                images: row.prod_img ? [row.prod_img] : []
            });
        }
        return acc;
    }, []);

    if (productInfo.length > 0) {
        console.log("데이터 가져와짐");
        res.json({ productInfo });
    } else {
        console.log("데이터가 없습니다.");
        res.status(404).json({ error: "데이터가 없습니다." });
    }
});
});


// 장바구니 정보 조회 라우터
router.post("/cart/s/:mem_id", (req, res) => {
    let mem_id = req.params.mem_id; // URL에서 mem_id를 가져옴
    console.log("내정보 라우터 mem_id:", mem_id);
  
    let sql = "SELECT * FROM tbl_cart WHERE mem_id = ?"; // mem_id를 이용한 SQL 쿼리
  
    conn.query(sql, [mem_id], (err, rows) => {
      if (err) {
        console.error("내정보 라우터 쿼리 오류:", err);
        
        res.status(500).json({ error: "서버 오류" });
        return;
      }
      if (rows.length > 0) {
        console.log("데이터 가져와짐");
        res.json({
          Cartinfo: rows,
        });
      } else {
        console.log("내정보 라우터 값dd 문제");
        res.status(404).json({ error: "데이터가 없습니다." });
      }
    });
  });


// 장바구니 아이템 추가 라우터
router.post('/cart/add', (req, res) => {
  const { prod_idx, mem_id, prod_cnt, prod_price, prod_img, prod_name } = req.body;
  if (!prod_idx || !mem_id || !prod_cnt) {
      return res.status(400).json({ error: "모든 필드를 제공해야 합니다." });
  }
  
  // 현재 시간을 'YYYY-MM-DD HH:MM:SS' 형식으로 변환
  const created_at = new Date().toISOString().slice(0, 19).replace('T', ' ');
  
  const sql = 'INSERT INTO tbl_cart (prod_idx, mem_id, prod_cnt, created_at,prod_price,prod_img, prod_name ) VALUES (?, ?, ?, ?,?,?,?)';
  conn.query(sql, [prod_idx, mem_id, prod_cnt, created_at,prod_price,prod_img, prod_name], (err, result) => {
      if (err) {
          console.error("장바구니 추가 오류:", err);
          return res.status(500).json({ error: "서버 오류" });
      }
      res.status(201).json({ message: "장바구니에 아이템이 추가되었습니다." });
  });
});

router.delete("/cart/delete", (req, res) => {
    const {ids} = req.body;
    const sql = `DELETE FROM tbl_cart WHERE cart_idx=?`;
  
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