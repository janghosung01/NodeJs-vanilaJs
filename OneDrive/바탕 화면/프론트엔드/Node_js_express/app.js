const express =require('express'); //npm install express
const helmet=require("helmet"); //npm install helmet 사용해서 보안 추가
const app =express();
const ejs=require("ejs"); //npm install ejs
const db=require("./model/db"); // require 되는이유 db.js에서 모듈익스포츠해서
//app.use(helmet());//최소한의 보안

app.set("view engine","ejs");//ejs 그림파일 도구
app.set("views","./views");//위의주소 다여기있어 views 폴더
app.use("/public",express.static(__dirname+"/public"))//css 정적이미지 화면그리는 도구 public 도구  경로 여기다

app.use(express.json());
app.use(express.urlencoded());

const mainRouter=require("./router/mainRouter");

app.use("/jang",mainRouter);

app.get("/", function(req,res) {
    res.send("HELO default SERVER");
})

app.listen(3000,function(req,res){
    db.sequelize.sync({force:false});  // (프로토 타입) 개발중일떄 flase ,true 하면 계속 데이터베이스 연동되서 날라감
    console.log("서버 3000포트 실행중");
})