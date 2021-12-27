"use strict";

const fs = require("fs").promises;

class UserStorage {
  static #getUserInfo(data, id) {
    const users = JSON.parse(data);
    const idx = users.id.indexOf(id);
    //User.js에서 getUserInfo에 입력한 id의 인덱스를 구해서 idx에 넣어준 것임
    const usersKeys = Object.keys(users); // => [id,psword,name]
    //users의 key값들만 리스트로 만든다
    const userInfo = usersKeys.reduce((newUser, info) => {
      newUser[info] = users[info][idx];
      //위의 idx에 해당하는 값들을 newUser[info]에 넣어준것임
      return newUser;
    }, {});
    /*reduce의 초깃값을 {}로 넣어주고, newUser라는 객체의 키값인
      info(위에서 나온[id,psword,name])가 순차적으로 들어가게 됨
      */
    return userInfo;
  }
  // static #users = {
  //   id: ["woorimIT", "나개발", "김팀장"],
  //   psword: ["1234", "1234", "123456"],
  //   name: ["우리밋", "나개발", "김팀장"],
  // };
  //static 으로 정적으로 선언을 해 준다면 외부에서 new로 인스턴스를 만들어서 할 필요없이 클래스 자체에서 . 찍어서 접근가능
  //그렇지만 외부에서 불러올수 있다는 것은 위험한 행위이기에 이름앞에 #를 붙여서 private한 변수로 은닉화 주어야함
  //class 안에 변수 선언해 줄 때는 const처럼 생성할 때 쓰이는 키워드 필요없음
  static #getUsers(data, isAll, fields) {
    const users = JSON.parse(data);
    if (isAll) return users;
    const newUsers = fields.reduce((newUsers, field) => {
      //newUsers에는 초기값인 id가 들어가고 그 다음변수 부터는 field에 차례대로 들어감
      if (users.hasOwnProperty(field)) {
        //users에 field에 해당하는 key값이 있나고 물어보는 것임
        newUsers[field] = users[field];
      }
      return newUsers;
      //return 되는 newUsers가 reduce의 다음 파라미터인 newUsers로 들어가게 됨
    }, {});
    return newUsers;
  }

  static getUsers(isAll, ...fields) {
    //...fields 이런식으로 매개변수를 선언하여 준다면 ctrl에서 파라미터로 넘긴 변수들이 배열의 형태로 저장됨
    //위에서 은닉화해 주었던 #users를 다른 곳에서 사용할 수 있도록 메서드를 만들어주어야함
    //대신 메서드 앞에도 static으로 선언해주어야함.
    return (
      fs
        .readFile("./src/databases/users.json")
        .then((data) => {
          return this.#getUsers(data, isAll, fields);
        })
        //fs.readFile이 성공했을때 then실행
        .catch(console.error)
    );
    //fs.readFile이 실패했을때 catch 실행
  }

  static getUserInfo(id) {
    /*User 코드에서 login 함수에서 getUserInfo 호출할때 특정 id값을 던지면 id에 해당하는 데이터들을 객체로 전달하는
    메서드를 만드는 과정*/
    //위의 #users를 users로 받아서
    return (
      fs
        .readFile("./src/databases/users.json")
        .then((data) => {
          return this.#getUserInfo(data, id);
        })
        //fs.readFile이 성공했을때 then실행
        .catch(console.error)
    );
  }

  static async save(userInfo) {
    const users = await this.getUsers(true);
    if (users.id.includes(userInfo.id)) {
      //고객이 입력한 유져 정보의 id가 db의 유저 정보의 id에 포함되어 있으면
      throw "이미 존재하는 아이디입니다.";
    }
    users.id.push(userInfo.id);
    users.name.push(userInfo.name);
    users.psword.push(userInfo.psword);
    fs.writeFile("./src/databases/users.json", JSON.stringify(users));
    return { success: true };
  }
}
module.exports = UserStorage;
