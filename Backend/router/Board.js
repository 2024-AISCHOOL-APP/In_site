const express = require("express");
const router = express.Router();
const conn = require("../config/database");
const path = require('path');
const multer = require('multer');


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


  
// 'uploads/Board' 디렉토리 설정
const uploadDir = path.join(__dirname, '..', 'uploads', 'Board');


// Multer 설정: 파일 저장 위치 및 파일 이름 설정
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir); // 실제 파일 시스템 경로 사용
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // 파일 이름 설정
    }
});

const upload = multer({ storage: storage });

// 정적 파일 서빙 설정
router.use('/uploads/Board', express.static(uploadDir));




  router.post('/create', upload.single('board_img'), (req, res) => {
    const { board_title, board_content } = req.body;
    const mem_id = req.body.mem_id || ''; // mem_id를 클라이언트로부터 받아오며 기본값으로 빈 문자열 설정
    const board_img = req.file ? `/uploads/Board/${req.file.filename}` : ''; // 웹에서 접근할 상대 경로
  
    const sql = "INSERT INTO board (mem_id, board_title, board_content, board_img, board_views) VALUES (?, ?, ?, ?, ?)";
    const values = [mem_id, board_title, board_content, board_img, 0]; // board_views 기본값으로 0 설정
    conn.query(sql, values, (err, result) => {
      if (err) {
        console.error('게시글 생성 중 오류 발생:', err);
        res.status(500).json({ error: '서버 오류' });
        return;
      }
      console.log('게시글이 성공적으로 생성되었습니다.');
      res.status(201).json({ message: '게시글이 성공적으로 생성되었습니다.' });
    });
  });
  
  router.get('/images', (req, res) => {
    const sql = "SELECT board_img FROM board";  // 이미지 경로를 저장한 컬럼명을 사용

    conn.query(sql, (err, results) => {
        if (err) {
            console.error('이미지 경로를 가져오는 중 오류 발생:', err);
            res.status(500).json({ error: '서버 오류' });
            return;
        }

        const imagePaths = results.map(row => ({ path: row.board_img }));
        res.json({ imagePaths });
    });
});




  module.exports = router;