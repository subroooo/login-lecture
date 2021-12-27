"use strict";

const express = require("express");
const router = express.Router();

const ctrl = require("./home.ctrl");
// ./home.ctrl에있는 모듈 가져다 쓸꺼임.. 이라고 알려주는역할

router.get("/", ctrl.output.home);
//가져다 쓸때도 ctrl에 있는 home라고 자세하게 지정해 줘야 사용할 수 있음.

/*
home 원래 부분(req, res) => {
    res.render("home/index"); //render 은 "views아래에 home아래에 index를 가져올 수 있게 해준다."
  });
*/

router.get("/login", ctrl.output.login);
router.get("/register", ctrl.output.register);

router.post("/login", ctrl.process.login);
router.post("/register", ctrl.process.register);
/*
login 원래 부분 (req, res) => {
  res.render("home/login");
}); home.ctrl.js라는 파일로 옮겨 준다..
*/
//router는 /login라는 도메인으로 들어왔을 때 클라이언트의 요청을 연결해 주는 부분임
//요청을 수행하는 부분이 (req, res) => {} 부분인데 이를 컨트롤러라고 생각하면됨.
module.exports = router;
//router를 외부파일에서 사용할 수 있도록 exports(내보내기)를 해줌
//app.js와 index.js를 연결시켜주는 역할
