"use strict";

const id = document.querySelector("#id");
const psword = document.querySelector("#psword");
const loginBtn = document.querySelector("button");

console.log(id);
/*defer,async 옵션을 <script src="/js/home/login.js" defer></script>(defer를 사용하자!!)
이런식으로 넣어주어야함 그래야만 login.js에서 document.querySelector("#id");으로 #id를 가져오기 전에
 console.log(id)가 먼저 실행 됨을 막아 줄수 있음.*/

loginBtn.addEventListener("click", login);

function login() {
  const req = {
    id: id.value,
    psword: psword.value,
  };

  fetch("/login", {
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
        location.href = "/";
      } else {
        alert(res.msg);
        //false면 서버에서 보내준 메시지인 "로그인에 실패 하였습니다" 알림 alert로 띄우기
      }
    })
    .catch((err) => {
      console.error("로그인 중 에러 발생"));
    });
  /*이렇게 then에 catch 구문을 넣어주어 로그인중에 에러(라우팅 도중 경로가 사라지는 경우 등등)가 발생 했을시에 잡아서 출력해주는 기능을 만들어 줄 수도 있다.
    
    */
}
/*
  해당경로의 API를 백쪽에서 만들어 주어야 하는데 해당 API는 
  index.js에서 router.get("/login",ctrl.login)이런 것들이 API의 일부임.
  */
