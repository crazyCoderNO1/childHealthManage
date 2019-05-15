//幼儿信息管理
const express =  require("express");
const router = express.Router();
const DietRecords = require("../../models/DietRecords");
const passport = require("passport");


//$route GET  api/dietrecords/test
//@desc   返回的请求的json数据
//@access  （公有接口还是私有接口）public

router.get("/test",(req,res)=>{
    res.json({msg:"DietRecords works"});
});

//$route POST  api/dietrecords/add
//@desc   创建（添加）信息接口
//@access  （公有接口还是私有接口）private
router.post("/add",passport.authenticate("jwt",{session:false}),(req,res)=>{
    const dietrecordsFields = {};
    if(req.body.childNum) dietrecordsFields.childNum = req.body.childNum;
    if(req.body.name) dietrecordsFields.name = req.body.name;
    if(req.body.sex) dietrecordsFields.sex = req.body.sex;
    if(req.body.class) dietrecordsFields.class = req.body.class;
    if(req.body.recordsTime) dietrecordsFields.recordsTime = req.body.recordsTime;
    if(req.body.recordsWeek) dietrecordsFields.recordsWeek = req.body.recordsWeek;
    if(req.body.recordsDay) dietrecordsFields.recordsDay = req.body.recordsDay;
    if(req.body.breakfast) dietrecordsFields.breakfast = req.body.breakfast;
    if(req.body.lunch) dietrecordsFields.lunch = req.body.lunch;
    if(req.body.dinner) dietrecordsFields.dinner = req.body.dinner;
    new DietRecords(dietrecordsFields).save().then(dietrecords => {
        res.json(dietrecords);
    });
});


//$route POST  api/dietrecords
//@desc   获取所有信息接口
//@access  （公有接口还是私有接口）private
router.get("/",passport.authenticate("jwt",{session:false}),(req,res) => {
    DietRecords.find().then(dietrecords => {
        if(!dietrecords){
            return res.status(404).json("没有任何内容");
        }else{
            res.json(dietrecords);
        }
    }).catch(err => res.status(404).json(err));
});

//$route POST  api/dietrecords/:id
//@desc   获取单个信息接口
//@access  （公有接口还是私有接口）private
router.get("/:id",passport.authenticate("jwt",{session:false}),(req,res) => {
    DietRecords.findOne({_id:req.params.id}).then(dietrecords => {
        if(!dietrecords){
            return res.status(404).json("没有任何内容");
        }else{
            res.json(dietrecords);
        }
    }).catch(err => res.status(404).json(err));
});

//$route POST  api/dietrecords/edit
//@desc   编辑信息接口
//@access  （公有接口还是私有接口）private
router.post("/edit/:id",passport.authenticate("jwt",{session:false}),(req,res)=>{
    const dietrecordsFields = {};
    if(req.body.childNum) dietrecordsFields.childNum = req.body.childNum;
    if(req.body.name) dietrecordsFields.name = req.body.name;
    if(req.body.sex) dietrecordsFields.sex = req.body.sex;
    if(req.body.class) dietrecordsFields.class = req.body.class;
    if(req.body.recordsTime) dietrecordsFields.recordsTime = req.body.recordsTime;
    if(req.body.recordsWeek) dietrecordsFields.recordsWeek = req.body.recordsWeek;
    if(req.body.recordsDay) dietrecordsFields.recordsDay = req.body.recordsDay;
    if(req.body.breakfast) dietrecordsFields.breakfast = req.body.breakfast;
    if(req.body.lunch) dietrecordsFields.lunch = req.body.lunch;
    if(req.body.dinner) dietrecordsFields.dinner = req.body.dinner;

    DietRecords.findOneAndUpdate({_id:req.params.id},{$set:dietrecordsFields},{new:true})
        .then(dietrecords => res.json(dietrecords));
});

//$route POST  api/dietrecords/delete/:id
//@desc   删除信息接口
//@access  （公有接口还是私有接口）private
router.delete("/delete/:id",passport.authenticate("jwt",{session:false}),(req,res) => {
    DietRecords.findOneAndRemove({_id:req.params.id}).then(dietrecords => {
        dietrecords.save().then(dietrecords => {
            res.json(dietrecords);
        }).catch(err => {
            res.status(404).json("删除失败");
        });
    });
});


module.exports = router;