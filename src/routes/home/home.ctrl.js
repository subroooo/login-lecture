"use strict";

const home = (req, res) => {
  res.render("home/index");
  //render 은 "views아래에 home아래에 index를 가져올 수 있게 해준다."
};
const login = (req, res) => {
  res.render("home/login");
};

module.exports = {
  home,
  login,
};
/*hello와 login을 home.ctrl.js의 외부에서 사용할 수 있게 해줌
객체에서 key값을 안넣어주면 value값과 같은 key값이 알아서 생성되어 저장
{
    hello : hello,
    login : login,
}

exports로 넘겨주었을면 사용할 곳에서는 require를 이용하여 사용한다고 명시해주어야함
index.js에서 hello와 login 을 사용할 경우에는 
const ctrl = require("./home.ctrl"); 로 가져올 경로 표시해 주면됨.
*/
