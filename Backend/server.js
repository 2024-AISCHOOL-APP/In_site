const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const session = require('express-session');
const app = express();
const multer = require('multer');
const path = require('path');

const indexRouter = require("./router/index");
const BoardRouter = require("./router/Board")
const CalenderRouter = require("./router/Cal")
const InfoRouter = require('./router/MyInfo')
const CategoryRouter = require('./router/Category')
const ShopRouter = require('./router/Shop')


app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
  secret: 'session-secret123!@#',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false, // HTTPS를 통해 전송되어야 할 경우 true로 설
    maxAge: 1000 * 60 * 60 * 2 // 세션 유효 기간 (예: 2시간)
  }
}));

// 라우터 등록
app.use("/", indexRouter);
app.use("/board", BoardRouter);
app.use("/Calender",CalenderRouter)
app.use("/Myinfo",InfoRouter)
app.use("/Category",CategoryRouter)
app.use("/Shop",ShopRouter)


// 'uploads/Board' 디렉토리 설정
const uploadDir = path.join(__dirname, 'uploads', 'Board');

// Multer 설정: 파일 저장 위치 및 파일 이름 설정
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// 정적 파일 서빙 설정
app.use('/uploads/Board', express.static(uploadDir));





// 서버 시작
const port = 8300;
app.listen(port, () => {
  console.log(`서버가 포트 ${port}에서 실행 중입니다.`);
});