const express = require("express");
const router = express.Router();
const session = require('express-session');
const conn = require("../config/database");
const md5 = require('md5');
const multer = require('multer');
const path = require('path');


router.get("/", (req, res) => {
  console.log("Welcome!!!! ");
});

router.post('/login', (req, res) => {
  const { mem_id, mem_pw } = req.body;

  // 입력 값 확인
  if (!mem_id || !mem_pw) {
    return res.status(400).json({ error: '아이디와 비밀번호를 입력하세요.' });
  }

  // 비밀번호 해시
  const hashedPassword = md5(mem_pw);

  // SQL 쿼리
  const sql = `SELECT * FROM tbl_member WHERE mem_id = ? AND mem_pw = ?`;
  conn.query(sql, [mem_id, hashedPassword], (err, result) => {
    if (err) {
      console.error('Error executing query', err);
      return res.status(500).json({ error: '서버 오류가 발생했습니다.' });
    }

    // 사용자 존재 여부 확인
    if (result.length > 0) {
      const user = result[0];
      
      // 세션 설정
      req.session.isLoggedIn = true;
      req.session.mem_id = user.mem_id;
      req.session.mem_nick = user.mem_nick;
      req.session.mem_phone = user.mem_phone;
      req.session.mem_phone = user.mem_seq;


      // 성공 응답
      res.status(200).json({
        success: true,
        id: user.mem_id,
        nick: user.mem_nick,
        phone: user.mem_phone,
        seq : user.mem_seq,
        session: true
      });
    } else {
      // 로그인 실패 응답
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

  let sql = "SELECT COUNT(*) AS count FROM tbl_member WHERE mem_id = ?";
  conn.query(sql, [mem_id], (error, results) => { // 수정된 부분
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    const count = results[0].count;
    res.json(count > 0);
  });
});



router.post("/register", (req, res) => {
  const { mem_id, mem_pw, mem_nick, mem_phone, mem_email } = req.body;

  const hashedPassword = md5(mem_pw);

  const sql = "INSERT INTO tbl_member (mem_id, mem_pw, mem_nick, mem_phone, mem_email, joined_at) VALUES (?, ?, ?, ?, ?, NOW())";
  conn.query(sql, [mem_id, hashedPassword, mem_nick, mem_phone, mem_email], (err, result) => {
    if (err) {
      console.error("회원가입 실패:", err);
      return res.status(500).json({ message: "회원가입에 실패하였습니다." });
    }
    res.status(201).json({ message: "회원가입 성공" });
  });
});

// 현재 작업 디렉토리에서 상위 디렉토리로 이동하여 'uploads' 폴더를 설정합니다.
const uploadDir = path.join(__dirname, '../uploads', 'Aichoice');

console.log('업로드 디렉토리:', uploadDir);

// Multer 설정: 파일 저장 위치 및 파일 이름 설정
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir); // 절대 경로 사용
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname)); // 파일 이름 설정
    }
});

const upload = multer({ storage: storage });

// 파일 업로드 처리 엔드포인트
router.post('/upload', upload.fields([{ name: 'groomImage' }, { name: 'brideImage' }]), (req, res) => {
    console.log('업로드된 파일:', req.files);
    res.json({
        message: '파일 업로드 완료',
        files: req.files
    });
});


  







module.exports = router;