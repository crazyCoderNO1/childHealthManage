//幼儿信息管理
const express =  require("express");
const router = express.Router();
const MedicalExam = require("../../models/MedicalExam");
const passport = require("passport");


//$route GET  api/medicalexam/test
//@desc   返回的请求的json数据
//@access  （公有接口还是私有接口）public

router.get("/test",(req,res)=>{
    res.json({msg:"medicalexam works"});
});

//$route POST  api/medicalexam/add
//@desc   创建（添加）信息接口
//@access  （公有接口还是私有接口）private
router.post("/add",passport.authenticate("jwt",{session:false}),(req,res)=>{
    const medicalexamFields = {};
    if(req.body.child_num) medicalexamFields.child_num = req.body.child_num;
    if(req.body.name) medicalexamFields.name = req.body.name;
    if(req.body.sex) medicalexamFields.sex = req.body.sex;
    if(req.body.class) medicalexamFields.class = req.body.class;
    if(req.body.medicalExamTime) medicalexamFields.medicalExamTime = req.body.medicalExamTime;
    if(req.body.height) medicalexamFields.height = req.body.height;
    if(req.body.weight) medicalexamFields.weight = req.body.weight;
    if(req.body.leftVision) medicalexamFields.leftVision = req.body.leftVision;
    if(req.body.rightVision) medicalexamFields.rightVision = req.body.rightVision;
    if(req.body.colorBlindness) medicalexamFields.colorBlindness = req.body.colorBlindness;
    if(req.body.leftHear) medicalexamFields.leftHear = req.body.leftHear;
    if(req.body.rightHear) medicalexamFields.rightHear = req.body.rightHear;
    if(req.body.decayedTooth) medicalexamFields.decayedTooth = req.body.decayedTooth;

    new MedicalExam(medicalexamFields).save().then(medicalexam => {
        res.json(medicalexam);
    });
});


//$route POST  api/medicalexam
//@desc   获取所有信息接口
//@access  （公有接口还是私有接口）private
router.get("/",passport.authenticate("jwt",{session:false}),(req,res) => {
    MedicalExam.find().then(medicalexam => {
        if(!medicalexam){
            return res.status(404).json("没有任何内容");
        }else{
            res.json(medicalexam);
        }
    }).catch(err => res.status(404).json(err));
});

//$route POST  api/medicalexam/:id
//@desc   获取单个信息接口
//@access  （公有接口还是私有接口）private
router.get("/:id",passport.authenticate("jwt",{session:false}),(req,res) => {
    MedicalExam.findOne({_id:req.params.id}).then(medicalexam => {
        if(!medicalexam){
            return res.status(404).json("没有任何内容");
        }else{
            res.json(medicalexam);
        }
    }).catch(err => res.status(404).json(err));
});

//$route POST  api/medicalexam/edit
//@desc   编辑信息接口
//@access  （公有接口还是私有接口）private
router.post("/edit/:id",passport.authenticate("jwt",{session:false}),(req,res)=>{
    const medicalexamFields = {};
    if(req.body.child_num) medicalexamFields.child_num = req.body.child_num;
    if(req.body.name) medicalexamFields.name = req.body.name;
    if(req.body.sex) medicalexamFields.sex = req.body.sex;
    if(req.body.class) medicalexamFields.class = req.body.class;
    if(req.body.medicalExamTime) medicalexamFields.medicalExamTime = req.body.medicalExamTime;
    if(req.body.height) medicalexamFields.height = req.body.height;
    if(req.body.weight) medicalexamFields.weight = req.body.weight;
    if(req.body.leftVision) medicalexamFields.leftVision = req.body.leftVision;
    if(req.body.rightVision) medicalexamFields.rightVision = req.body.rightVision;
    if(req.body.colorBlindness) medicalexamFields.colorBlindness = req.body.colorBlindness;
    if(req.body.leftHear) medicalexamFields.leftHear = req.body.leftHear;
    if(req.body.rightHear) medicalexamFields.rightHear = req.body.rightHear;
    if(req.body.decayedTooth) medicalexamFields.decayedTooth = req.body.decayedTooth;

    MedicalExam.findOneAndUpdate({_id:req.params.id},{$set:medicalexamFields},{new:true})
        .then(medicalexam => res.json(medicalexam));
});

//$route POST  api/medicalexam/delete/:id
//@desc   删除信息接口
//@access  （公有接口还是私有接口）private
router.delete("/delete/:id",passport.authenticate("jwt",{session:false}),(req,res) => {
    MedicalExam.findOneAndRemove({_id:req.params.id}).then(medicalexam => {
        medicalexam.save().then(medicalexam => {
            res.json(medicalexam);
        }).catch(err => {
            res.status(404).json("删除失败");
        });
    });
});


module.exports = router;