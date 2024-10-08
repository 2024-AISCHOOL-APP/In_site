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

module.exports = router;

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

// 아이디 찾기
router.post('/findId', (req, res) => {
  const { mem_name, mem_phone } = req.body;

  

  if (!mem_name || !mem_phone) {
    return res.status(400).json({ error: '이름과 휴대전화 번호를 입력하세요.' });
  }

  const sql = 'SELECT mem_id FROM tbl_member WHERE mem_nick = ? AND mem_phone = ?';
  conn.query(sql, [mem_name, mem_phone], (error, results) => {
    if (error) {
      console.error('아이디 찾기 오류:', error);
      return res.status(500).json({ error: '서버 오류가 발생했습니다.' });
    }
    if (results.length > 0) {
      return res.json({ mem_id: results[0].mem_id });
    } else {
      return res.status(404).json({ error: '아이디를 찾을 수 없습니다.' });
    }
  });
});

// 비밀번호 찾기 라우트
router.post('/findPw', (req, res) => {
  const { mem_id, mem_phone } = req.body;

  if (!mem_id || !mem_phone) {
    return res.status(400).json({ error: '아이디와 휴대전화 번호를 입력하세요.' });
  }

  // 사용자 존재 확인
  const sql = 'SELECT mem_id FROM tbl_member WHERE mem_id = ? AND mem_phone = ?';
  conn.query(sql, [mem_id, mem_phone], (error, results) => {
    if (error) {
      console.error('비밀번호 찾기 오류:', error);
      return res.status(500).json({ error: '서버 오류가 발생했습니다.' });
    }

    if (results.length > 0) {
      res.json({ message: '비밀번호 변경 요청이 처리되었습니다. 새 비밀번호를 입력하세요.' });
    } else {
      return res.status(404).json({ error: '정보를 찾을 수 없습니다.' });
    }
  });
});

// 비밀번호 변경 요청 API
router.post('/changePw', async (req, res) => {
  const { mem_id, mem_phone, new_password } = req.body;

  // 입력 값 확인
  if (!mem_id || !mem_phone || !new_password) {
    console.error('입력 값 오류:', { mem_id, mem_phone, new_password });
    return res.status(400).json({ error: '아이디, 휴대전화 번호, 새 비밀번호를 입력하세요.' });
  }

  try {
    // 비밀번호 해시화
    const hashedPassword =  md5(new_password);

    // 사용자 존재 확인
    const userSql = 'SELECT mem_id FROM tbl_member WHERE mem_id = ? AND mem_phone = ?';

    // Promise를 사용한 비동기 쿼리 처리
    const userResults = await new Promise((resolve, reject) => {
      conn.query(userSql, [mem_id, mem_phone], (error, results) => {
        if (error) {
          console.error('사용자 확인 쿼리 오류:', error);
          return reject(error);
        }
        resolve(results);
      });
    });

    if (userResults.length > 0) {
      // 비밀번호 업데이트
      const updatePasswordSql = 'UPDATE tbl_member SET mem_pw = ? WHERE mem_id = ?';

      await new Promise((resolve, reject) => {
        conn.query(updatePasswordSql, [hashedPassword, mem_id], (updateError) => {
          if (updateError) {
            console.error('비밀번호 업데이트 쿼리 오류:', updateError);
            return reject(updateError);
          }
          resolve();
        });
      });

      return res.json({ message: '비밀번호가 성공적으로 변경되었습니다.' });
    } else {
      return res.status(404).json({ error: '정보를 찾을 수 없습니다.' });
    }
  } catch (err) {
    console.error('비밀번호 처리 중 오류 발생:', err);
    return res.status(500).json({ error: '서버 오류가 발생했습니다.' });
  }
});




module.exports = router;