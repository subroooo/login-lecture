"use strict";

const app = require("../app");
const PORT = process.env.PORT || 3000;
//..으로 현 위치인 www.js에서 상위 폴더로 들어가 그 안에 있는 app이라는 파일을 찾아냄

app.listen(PORT, () => {
  console.log("서버 가동");
});
/*이거 실행 시키려면 터미널에서 node app.js를 실행 시키는 것이 아닌
node ./bin/www.js를 실행 시켜야 함. >> 이것도 간편화 시킬 수 있음
*/

/*
간편화 하는 방법 
터미널에서 npm init -y명령을 통해 방금까지 다뤘던 SW의 설정들을 초기화 시켜줌
-y옵션은 모든 설정값을 기본값으로 설정해 줌

*/

//PORT까지 같이 가지고 오자
