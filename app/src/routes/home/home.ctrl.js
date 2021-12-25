"use strict";

const output = {
  home: (req, res) => {
    res.render("home/index");
    //render 은 "views아래에 home아래에 index를 가져올 수 있게 해준다."
  },
  login: (req, res) => {
    res.render("home/login");
  },
};

const users = {
  id: ["woorimIT", "나개발", "김팀장"],
  pw: ["1234", "1234", "123456"],
};
// id와 pw를 서버로 넘겼을때 데이터가 맞는지 인증하는 과정을 하려고 만든 users

const process = {
  login: (req, res) => {
    //console.log(req.body); req.body로 해주어야 fetch의 body부분의 req볼수 있음
    const id = req.body.id,
      psword = req.body.psword;
    //프론트에서 넘긴 id,pw가 담긴 객체 req에서 . .를 사용하여 알맹이만 쏙 빼내고 검증과정을 하려고 if구문 사용
    if (users.id.includes(id)) {
      //위에서 만들어준 users라는 배열에 id가 위에서 프론트에서 넘긴 id를 가지고 있다면 (아이디가 있는지 검증하는 부분)
      const idx = users.id.indexOf(id);
      // 그 아이디의 인덱스를 idx로 잡아주어
      if (users.psword[idx] === psword) {
        // 해당 id가 pw랑 일치하는지 psword 배열의 index로 검증과정을 만들어줌
        return res.json({
          success: true,
        });
      }
    }
    return res.json({
      // 두개의 조건중 하나라도 틀린다면 return 으로 실패했다고 알려주어야 함
      success: false,
      msg: "로그인에 실패하셨습니다.",
    });
  },
};

module.exports = {
  output,
  process,
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
