const express = require("express");
const router = express.Router();
const conn = require("../config/database");
const path = require('path');
const multer = require('multer');

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

// 게시글 수정
router.put('/update/:board_seq', upload.single('board_img'), (req, res) => {
    const { board_seq } = req.params;
    const { board_title, board_content } = req.body;
    const board_img = req.file ? `/uploads/Board/${req.file.filename}` : null;

    let sql = "UPDATE board SET board_title = ?, board_content = ?";
    const values = [board_title, board_content];

    if (board_img) {
        sql += ", board_img = ?";
        values.push(board_img);
    }

    sql += " WHERE board_seq = ?";
    values.push(board_seq);

    conn.query(sql, values, (err) => {
        if (err) {
            console.error('게시글 수정 중 오류 발생:', err);
            return res.status(500).json({ error: '서버 오류' });
        }
        res.json({ message: '게시글이 성공적으로 수정되었습니다.' });
    });
});

// 모든 게시글 조회
router.get("/", (req, res) => {
    const sql = "SELECT * FROM board";
    conn.query(sql, (err, rows) => {
        if (err) {
            console.error('게시판 라우터 쿼리 오류:', err);
            return res.status(500).json({ error: '서버 오류' });
        }
        if (rows.length > 0) {
            res.json({ board: rows });
        } else {
            res.status(404).json({ error: '데이터가 없습니다.' });
        }
    });
});

// 게시글 상세 조회
router.get('/:board_seq', (req, res) => {
    const { board_seq } = req.params;
    const sql = "SELECT * FROM board WHERE board_seq = ?";
    conn.query(sql, [board_seq], (err, rows) => {
        if (err) {
            console.error('게시글 상세 정보 조회 중 오류 발생:', err);
            return res.status(500).json({ error: '서버 오류' });
        }
        if (rows.length > 0) {
            const { mem_id, board_title, board_content, board_img } = rows[0];
            res.json({
                id: mem_id,
                title: board_title,
                content: board_content,
                img: board_img
            });
        } else {
            res.status(404).json({ error: '게시글을 찾을 수 없습니다.' });
        }
    });
});

// 게시글 생성
router.post('/create', upload.single('board_img'), (req, res) => {
    const { board_title, board_content, mem_id = '' } = req.body;
    const board_img = req.file ? `/uploads/Board/${req.file.filename}` : '';

    const sql = "INSERT INTO board (mem_id, board_title, board_content, board_img, board_views) VALUES (?, ?, ?, ?, ?)";
    const values = [mem_id, board_title, board_content, board_img, 0];
    conn.query(sql, values, (err) => {
        if (err) {
            console.error('게시글 생성 중 오류 발생:', err);
            return res.status(500).json({ error: '서버 오류' });
        }
        res.status(201).json({ message: '게시글이 성공적으로 생성되었습니다.' });
    });
});

// 게시글 삭제
router.delete('/:board_seq', (req, res) => {
    const { board_seq } = req.params;
    const sql = "DELETE FROM board WHERE board_seq = ?";
    conn.query(sql, [board_seq], (err) => {
        if (err) {
            console.error('게시글 삭제 중 오류 발생:', err);
            return res.status(500).json({ error: '서버 오류' });
        }
        res.json({ message: '게시글이 성공적으로 삭제되었습니다.' });
    });
});

// 모든 게시글의 이미지 경로 조회
router.get('/images', (req, res) => {
    const sql = "SELECT board_img FROM board";
    conn.query(sql, (err, results) => {
        if (err) {
            console.error('이미지 경로를 가져오는 중 오류 발생:', err);
            return res.status(500).json({ error: '서버 오류' });
        }
        const imagePaths = results.map(row => ({ path: row.board_img }));
        res.json({ imagePaths });
    });
});

module.exports = router;
