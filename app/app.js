"use strict";

//모듈
const express = require("express");
const app = express();

//라우팅
const home = require("./src/routes/home"); // "현재폴더에서 routes라는 폴더내부의 home이라는 폴더를 읽어와줘"

//앱 세팅
app.set("views", "./src/views"); //views를 ./views라는 경로로 지정
app.set("view engine", "ejs");

app.use("/", home);
/*
"/"라는 경로로 들어오면 앞줄에서 생성한 home으로 보내줌
따라서 /경로로 들어오면 ./routes/home으로 가게 되어 index.js 로 들어가 "/" 경로로 지정된 애들 찾아서
res.render("home/index")를 실행 시키게 됨.
use 는 미들 웨어를 등록해주는 메서드임
*/

module.exports = app;
