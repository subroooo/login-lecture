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
  });
}
/*
  해당경로의 API를 백쪽에서 만들어 주어야 하는데 해당 API는 
  index.js에서 router.get("/login",ctrl.login)이런 것들이 API의 일부임.
  */
