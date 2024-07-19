const express = require("express");
const router = express.Router();
const session = require('express-session');
const conn = require("../config/database");
const md5 = require('md5');

router.get("/", (req, res) => {
  console.log("Welcome!!!! ");
});

router.post('/login', (req, res) => {
  const { mem_id, mem_pw } = req.body;

  const hashedPassword = md5(mem_pw);
  let sql = `SELECT * FROM members WHERE mem_id = ? AND mem_pw = ?`;
  conn.query(sql, [mem_id, hashedPassword], (err, result) => {
    if (err) {
      console.error('Error executing query', err);
      return res.status(500).json({ error: '서버 오류가 발생했습니다.' });
    }

    if (result.length > 0) {

      const user = result[0];
      req.session.isLoggedIn = true;
      req.session.mem_id = user.mem_id;
      req.session.mem_name = user.mem_name;
      req.session.mem_birth = user.mem_birth;
      req.session.mem_profile = user.mem_profile;
      req.session.mem_phone = user.mem_phone;
      res.status(200).json({
        success: true,
        id: user.mem_id,
        name: user.mem_name,
        birth: user.mem_birth,
        profile: user.mem_profile,
        phone: user.mem_phone,
        session: true
      });
    } else {
     
      res.status(401).json({ error: '아이디 또는 비밀번호를 잘못 입력했습니다.' });
    }
  });
});

router.post('/logout', (req, res) => {

  req.session.destroy((err) => {
    if (err) {
      console.error('세션 삭제 오류:', err);
      res.status(500).json({ error: '서버 오류' });
    } else {
      res.json({ message: '로그아웃 성공' });
    }
  });
});

router.get("/checkId/:mem_id", (req, res) => {
  const mem_id = req.params.mem_id;

  let sql = "SELECT COUNT(*) AS count FROM members WHERE mem_id = ?";
  conn.query(sql, [mem_id], (error, results) => { // 수정된 부분
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    const count = results[0].count;
    res.json(count > 0);
  });
});



router.post("/register", (req, res) => {
  const { mem_id, mem_pw, mem_name, mem_phone, mem_email } = req.body;

  const hashedPassword = md5(mem_pw);

  const sql = "INSERT INTO members (mem_id, mem_pw, mem_name, mem_phone, mem_email) VALUES (?, ?, ?, ?, ?)";
  conn.query(sql, [mem_id, hashedPassword, mem_name, mem_phone, mem_email], (err, result) => {
    if (err) {
      console.error("회원가입 실패:", err);
      return res.status(500).json({ message: "회원가입에 실패하였습니다." });
    }
    res.status(201).json({ message: "회원가입 성공" });
  });
});


module.exports = router;
