const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const session = require('express-session');
const app = express();
const indexRouter = require("./router/index");
const BoardRouter = require("./router/Board")
const CalenderRouter = require("./router/Cal")



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


// 서버 시작
const port = 5000;
app.listen(port, () => {
  console.log(`서버가 포트 ${port}에서 실행 중입니다.`);
});