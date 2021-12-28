"use strict";

const db = require("../config/db");

class UserStorage {
  //...fields 이런식으로 매개변수를 선언하여 준다면 ctrl에서 파라미터로 넘긴 변수들이 배열의 형태로 저장됨
  //위에서 은닉화해 주었던 #users를 다른 곳에서 사용할 수 있도록 메서드를 만들어주어야함
  //대신 메서드 앞에도 static으로 선언해주어야함.

  static getUserInfo(id) {
    /*User 코드에서 login 함수에서 getUserInfo 호출할때 특정 id값을 던지면 id에 해당하는 데이터들을 객체로 전달하는
    메서드를 만드는 과정*/
    //위의 #users를 users로 받아서
    return new Promise((resolve, reject) => {
      /*promise 설명 > 아래의 쿼리문이 성공을 하게 되면 resolve를 실행하고
        실패하게 될 경우 reject를 실행 (대표님 강의 33강 8분 반복해서 보기)
      */
      const query = "SELECT * FROM users WHERE id = ?;";
      db.query(query, [id], (err, data) => {
        if (err) reject(`${err}`);
        //34강 3분
        resolve(data[0]);
      });
    });
    /*promise를 만든 이유? 파일시스템에서는 promise가 내장되어있어서 
      getUserInfo 안의 db.query가 리턴 하는것은 (err, data) => {} 콜백함수가 리턴하는 것이므로
      getUserInfo가 반환하도록 만들어 주어야 하는데 이걸 promise를 통해서 했었는데 mysql은 promise를 지원을
      안해주어서 자체적으로 만들어 주는 것임 그런 이후 만들어진 promise객체를 return 해주면 끝
    */
  }

  static async save(userInfo) {
    return new Promise((resolve, reject) => {
      const query = "INSERT INTO users(id,name,psword) VALUES(?,?,?);";
      db.query(query, [userInfo.id, userInfo.name, userInfo.psword], (err) => {
        if (err) reject(`${err}`);
        resolve({ success: true });
      });
    });
  }
}
module.exports = UserStorage;

/*
웹 서버와 WAS의 차이
>>
날것 그대로의 정보 = 웹서버
데이터를 가공 = WAS
*/
