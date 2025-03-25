//데이터 베이스에 설정 부
//데이터 베이스 컴퓨터에 설치하고 데이터베이스서버와 연결하는 설정
//어떠한 데이터 구조가있는지 데이터 관련 모든것 


var Sequelize=require("sequelize");
var sequelize =new Sequelize("class","root","1127",{// table명, "root", 비밀번호
    host:"localhost",
    port:3306,
    dialect:"mysql",
    timezone:"+09:00",
    define:{
        charset:"utf8",
        coolate:"uf8_general_ci",
        timestamps:true, // ✅ 이 설정 때문에 createdAt, updatedAt 자동 생성됨
        freezeTableName:true  //false 하면 테이블이름 자동 복수형댐 테이블 이름을 정확하게 지정하고 싶을 때
    }
});

var db={};
db.users=sequelize.import(__dirname+"/users.js");
db.reviews=sequelize.import(__dirname+"/reviews.js");

db.sequelize=sequelize;
db.Sequelize=Sequelize;

module.exports=db;
