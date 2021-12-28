const mysql = require("mysql");

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PSWORD,
  database: process.env.DB_DATABASE,
});
/*외부에 노출 되면 안되는 녀석들을 환경변수화 해준것임!!!
이때 .env 파일이 깃허브에 올라가지 않도록 해주어야 하고 .gitignore에 
# dotenv environment variables file 에 .env를 적어주어야 함
(여기서 이미 .env가 있는 이유는 우리가 .gitignore템플릿으로 노드 프로젝트 템플릿을 불러왔기 때문임)
*/
db.connect();
module.exports = db;
