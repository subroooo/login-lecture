"use strict";
// const UserStorage = require("../../models/UserStorage");
const User = require("../../models/User"); //대표님 이거 설명 안하고 넘어감..(왜 process내부의 User인스턴스 안만들어지나 했네)
//절대 경로기 때문에 상위로 두번 올라간 다음 UserStorage를 가지고 있는 models파일로 내려오고 한번더 내려가야함
const output = {
  home: (req, res) => {
    res.render("home/index");
    //render 은 "views아래에 home아래에 index를 가져올 수 있게 해준다."
  },
  login: (req, res) => {
    res.render("home/login");
  },
  register: (req, res) => {
    res.render("home/register");
  },
};

// id와 pw를 서버로 넘겼을때 데이터가 맞는지 인증하는 과정을 하려고 만든 users

const process = {
  login: async (req, res) => {
    const user = new User(req.body); //이렇게 req.bodysms User.js의 class인 User의 body로 들어감 따라서 new User를 user라는 인스턴스로 만들수 있게 됨
    const response = await user.login();
    return res.json(response);
    // return res.json(response);
    // //console.log(req.body); req.body로 해주어야 fetch의 body부분의 req볼수 있음
    // const id = req.body.id;
    // const psword = req.body.psword;
    // //프론트에서 넘긴 id,pw가 담긴 객체 req에서 . .를 사용하여 알맹이만 쏙 빼내고 검증과정을 하려고 if구문 사용
    // //const userStorage = new UserStorage(); 클래스여서 인스턴스 생성방법을 이런식으로 해야함.(그렇지만 UserStorage클래스에서 static으로 선언한 놈은 바로 부를수 있음)
    // const users = UserStorage.getUsers("id", "psword");
    // const response = {};
    // if (users.id.includes(id)) {
    //   //위에서 만들어준 users라는 배열에 id가 위에서 프론트에서 넘긴 id를 가지고 있다면 (아이디가 있는지 검증하는 부분)
    //   const idx = users.id.indexOf(id);
    //   // 그 아이디의 인덱스를 idx로 잡아주어
    //   if (users.psword[idx] === psword) {
    //     // 해당 id가 pw랑 일치하는지 psword 배열의 index로 검증과정을 만들어줌
    //     response.success = true;
    //     return res.json(response);
    //   }
    // }
    // response.success = false;
    // response.msg = "로그인에 실패하셨습니다";
    // return res.json(response);
    // // 두개의 조건중 하나라도 틀린다면 return 으로 실패했다고 알려주어야 함;
  },
  register: async (req, res) => {
    const user = new User(req.body);
    const response = await user.register();
    return res.json(response);
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
