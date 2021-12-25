"use strict";

//모듈
const express = require("express");
const app = express();
const bodyParser = require("body-parser");

//라우팅
const home = require("./src/routes/home"); // "현재폴더에서 routes라는 폴더내부의 home이라는 폴더를 읽어와줘"

//앱 세팅
app.set("views", "./src/views"); //views를 ./views라는 경로로 지정
app.set("view engine", "ejs");
app.use(express.static(`${__dirname}/src/public`));

app.use(bodyParser.json());
//URL을 통해 전달되는 데이터에 한글,공백 등과 같은 문자가 포함될 경우 제대로 인식되지 않는 문제 해결
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/", home); //이 구문이 위에 app.use(bodyParser)사용하는 구문보다 아래에 있어야 undefined 안나옴!! 오류잡느라 한참걸렸네!!!
/*
"/"라는 경로로 들어오면 앞줄에서 생성한 home으로 보내줌
따라서 /경로로 들어오면 ./routes/home으로 가게 되어 index.js 로 들어가 "/" 경로로 지정된 애들 찾아서
res.render("home/index")를 실행 시키게 됨.
use 는 미들 웨어를 등록해주는 메서드임
*/

module.exports = app;
