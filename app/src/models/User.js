"use strict";

const UserStorage = require("./UserStorage");
class User {
  constructor(body) {
    this.body = body;
    //constructor로 받은 body를 this.body로 User의 body로 만들어줌
  }
  async login() {
    const client = this.body;
    const { id, psword } = await UserStorage.getUserInfo(client.id);
    if (id) {
      if (id === client.id && psword === client.psword) {
        return { success: true };
      }
      return { success: false, msg: "비밀번호가 틀렸습니다" };
    }
    return { success: false, msg: "존재하지 않는 아이디입니다." };
  }
  async register() {
    const client = this.body;
    try {
      const response = await UserStorage.save(client);
      //client 데이터를 UserStorage에 저장하는데 시간이 오래 걸리니 모두 저장 할 때까지 기다리라고 await 걸어줌
      return response;
    } catch (err) {
      return { success: false, msg: err };
    }
    /*UserStorage에 save라는 메소드를 호출하여 데이터가 저장되도록하는것임
    저장 될 데이터를 UserStorage에 던져 주어야 하므로 User클래스가 constructor에서 전달 받은 
    body를 그대로 던져 주자
    */
  }
}

module.exports = User;
