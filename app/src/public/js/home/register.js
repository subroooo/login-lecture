"use strict";

// const { name } = require("ejs"); //이부분 빼주어야 함 대표님 설명 빠짐

const id = document.querySelector("#id");
const name = document.querySelector("#name");
const psword = document.querySelector("#psword");
const confirmPsword = document.querySelector("#confirm-psword");
const registerBtn = document.querySelector("#button");

/*defer,async 옵션을 <script src="/js/home/register.js" defer></script>(defer를 사용하자!!)
이런식으로 넣어주어야함 그래야만 register.js에서 document.querySelector("#id");으로 #id를 가져오기 전에
 console.log(id)가 먼저 실행 됨을 막아 줄수 있음.*/

registerBtn.addEventListener("click", register);

function register() {
  if (!id.value) {
    //회원가입시 id를 입력하지 않았을때 경고문구
    return alert("아이디를 입력해주십시오.");
  }
  if (psword.value !== confirmPsword.value) {
    //회원가입시 비밀번호와 비밀번호 확인 하는 값이 같지 않으면 alert를 띄워줌
    return alert("비밀번호가 일치하지 않습니다");
  }
  const req = {
    id: id.value,
    name: name.value,
    psword: psword.value,
  };
  console.log(req);

  fetch("/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(req),
  })
    .then((res) => res.json())
    // then한번만 쓰면 promise타입을 확인할 수 가 없어서 then한번더 써주어야함
    .then((res) => {
      if (res.success) {
        //서버에서 받아온 res.success정보가 true면
        location.href = "/login";
      } else {
        alert(res.msg);
        //false면 서버에서 보내준 메시지인 "로그인에 실패 하였습니다" 알림 alert로 띄우기
      }
    })
    .catch((err) => {
      console.error("회원가입 중 에러 발생");
    });
  /*이렇게 then에 catch 구문을 넣어주어 로그인중에 에러(라우팅 도중 경로가 사라지는 경우 등등)가 발생 했을시에 잡아서 출력해주는 기능을 만들어 줄 수도 있다.

      */
}
/*
  해당경로의 API를 백쪽에서 만들어 주어야 하는데 해당 API는 
  index.js에서 router.get("/register",ctrl.register)이런 것들이 API의 일부임.
  */
