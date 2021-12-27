"use strict";

class UserStorage {
  static #users = {
    id: ["woorimIT", "나개발", "김팀장"],
    psword: ["1234", "1234", "123456"],
    name: ["우리밋", "나개발", "김팀장"],
  };
  //static 으로 정적으로 선언을 해 준다면 외부에서 new로 인스턴스를 만들어서 할 필요없이 클래스 자체에서 . 찍어서 접근가능
  //그렇지만 외부에서 불러올수 있다는 것은 위험한 행위이기에 이름앞에 #를 붙여서 private한 변수로 은닉화 주어야함
  //class 안에 변수 선언해 줄 때는 const처럼 생성할 때 쓰이는 키워드 필요없음
  static getUsers(...fields) {
    //...fields 이런식으로 매개변수를 선언하여 준다면 ctrl에서 파라미터로 넘긴 변수들이 배열의 형태로 저장됨
    //위에서 은닉화해 주었던 #users를 다른 곳에서 사용할 수 있도록 메서드를 만들어주어야함
    //대신 메서드 앞에도 static으로 선언해주어야함.
    const users = this.#users;
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
}
module.exports = UserStorage;
