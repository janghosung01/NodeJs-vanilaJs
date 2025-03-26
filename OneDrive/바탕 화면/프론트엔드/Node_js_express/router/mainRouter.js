 //도메인에 따라 로직에 따라 유저 라우터 등등 만들어관리
 //메인의 주소들 

 const express =require('express');
const db = require('../model/db');
 const router=express.Router();


router.get("/", function(req,res) { //ejs render
    res.render("main1",{title:"메인페이지"})// render 응답으로 그림줄떄 랜더 

})

router.get("/naver.com", function(req,res) {
    res.send("NAVER");
})

router.get("/goole.com", function(req,res) {
    res.send("GOOLE");
})


router.get("/getapi", function(req,res) {
    //res.send("get api")
    let query=req.query;
    console.log(query);
    res.send({"key":"value"});    
})

router.post("/postapi",function(req,res){
    res.send("post api");

    let body=req.body;
    console.log(body);
})

/*
    C:create
    R:read
    U:update
    D:delete
*/
// router.get("/data/create", function(req,res) {
//     let user_id=parseInt(Math.random()*10000);
//     db.users.create({user_id:user_id}).then(function(result){
//         res.send({success:200});
//     })
// })
// router.get("/data/read", function(req,res) {
//     db.users.findAll().then(function(result){
//         res.send({seccess:200,data:result})
//     })
// })
// router.post("/data/update",function(req,res){
//     let target_id=req.body.target_id;
//     db.users.update({user_id:9999},{where:{user_id:target_id}}).then(function(result){
//         res.send({success:200}); 
//     })
// })
// router.post("/data/delete",function(req,res){
//     let target_id=req.body.target_id;
//     db.users.destroy({where:{user_id:target_id}}).then(function(result){
//         res.send({success:200});
//     })
// })


router.post("/data/update",function(req,res){
    let target_id=req.body.movie_id;
    let target_review=req.body.review;
    db.reviews.update({review:target_review},{where:{movie_id:target_id}}).then(function(result){
        res.send({success:200,target_id,target_review}); 
        console.log(target_id);
    })
})

router.post("/review/create",function(req,res){
    let movie_id=req.body.movie_id;
    let review=req.body.review;
    console.log("id는 :",movie_id);
    console.log("리뷰는 :",review);
    db.reviews.create({movie_id:movie_id,review:review}).then(function(result){
        res.send({success:200, message:"아이디 생성",data:result});
        console.log(req.body);
    })
})


router.post("/data/read/all", function(req,res) { //모든데이터베이스
    db.reviews.findAll().then(function(result){
        if (result) {
            res.send({ success: 200, data: result });
        } 
    })
})

router.post("/data/read/reviews_id", function(req,res) {
    let review_id=req.body.movie_id;
    db.reviews.findOne({where:{movie_id:review_id}}).then(function(result){
        if (result) {
            res.send({ success: 200, message: "아이디 존재",review:result.review });
        } else {
            res.send({ success: 404, message: "아이디 없음" });
        }
    })
})
router.post("/data/delete/reviews",function(req,res){
    let target_id=req.body.movie_id;
    let review=req.body.review;
    console.log("Received movie_id:", target_id);
    db.reviews.destroy({where:{movie_id:target_id}}).then(function(result){
        res.send({success:200});
    })
})

router.post("/delete/all",function(req,res){
    let target_id=req.body.movie_id;
    let review=null;
    console.log("Received movie_id:", target_id);
    db.reviews.destroy({where:{review:review}}).then(function(result){
        res.send({success:300});
    })
})
module.exports=router;