//幼儿信息管理
const express =  require("express");
const router = express.Router();
const Teacher = require("../../models/Teacher");
const passport = require("passport");


//$route GET  api/children/test
//@desc   返回的请求的json数据
//@access  （公有接口还是私有接口）public

router.get("/test",(req,res)=>{
    res.json({msg:"teacher works"});
});

//$route POST  api/teachers/add
//@desc   创建（添加）信息接口
//@access  （公有接口还是私有接口）private
router.post("/add",passport.authenticate("jwt",{session:false}),(req,res)=>{
    const teachersFields = {};
    if(req.body.name) teachersFields.name = req.body.name;
    if(req.body.sex) teachersFields.sex = req.body.sex;
    if(req.body.birthday) teachersFields.birthday = req.body.birthday;
    if(req.body.birthplace) teachersFields.birthplace = req.body.birthplace;
    if(req.body.id_number) teachersFields.id_number = req.body.id_number;
    if(req.body.nation) teachersFields.nation = req.body.nation;
    if(req.body.marital_status) teachersFields.marital_status = req.body.marital_status;
    if(req.body.education) teachersFields.education = req.body.education;
    if(req.body.politics_status) teachersFields.politics_status = req.body.politics_status;
    if(req.body.registered_address) teachersFields.registered_address = req.body.registered_address;
    if(req.body.contact_address) teachersFields.contact_address = req.body.contact_address;
    if(req.body.contact_phone) teachersFields.contact_phone = req.body.contact_phone;

    new Teacher(teachersFields).save().then(teachers => {
        res.json(teachers);
    });
});


//$route POST  api/teachers
//@desc   获取所有信息接口
//@access  （公有接口还是私有接口）private
router.get("/",passport.authenticate("jwt",{session:false}),(req,res) => {
    Teacher.find().then(teachers => {
        if(!teachers){
            return res.status(404).json("没有任何内容");
        }else{
            res.json(teachers);
        }
    }).catch(err => res.status(404).json(err));
});

//$route POST  api/teachers/:id
//@desc   获取单个信息接口
//@access  （公有接口还是私有接口）private
router.get("/:id",passport.authenticate("jwt",{session:false}),(req,res) => {
    Teacher.findOne({_id:req.params.id}).then(teachers => {
        if(!teachers){
            return res.status(404).json("没有任何内容");
        }else{
            res.json(teachers);
        }
    }).catch(err => res.status(404).json(err));
});

//$route POST  api/teachers/edit
//@desc   编辑信息接口
//@access  （公有接口还是私有接口）private
router.post("/edit/:id",passport.authenticate("jwt",{session:false}),(req,res)=>{
    const teachersFields = {};
    if(req.body.name) teachersFields.name = req.body.name;
    if(req.body.sex) teachersFields.sex = req.body.sex;
    if(req.body.birthday) teachersFields.birthday = req.body.birthday;
    if(req.body.birthplace) teachersFields.birthplace = req.body.birthplace;
    if(req.body.id_number) teachersFields.id_number = req.body.id_number;
    if(req.body.nation) teachersFields.nation = req.body.nation;
    if(req.body.marital_status) teachersFields.marital_status = req.body.marital_status;
    if(req.body.education) teachersFields.education = req.body.education;
    if(req.body.politics_status) teachersFields.politics_status = req.body.politics_status;
    if(req.body.registered_address) teachersFields.registered_address = req.body.registered_address;
    if(req.body.contact_address) teachersFields.contact_address = req.body.contact_address;
    if(req.body.contact_phone) teachersFields.contact_phone = req.body.contact_phone;
    
    Teacher.findOneAndUpdate({_id:req.params.id},{$set:teachersFields},{new:true})
        .then(teachers => res.json(teachers));
});

//$route POST  api/teachers/delete/:id
//@desc   删除信息接口
//@access  （公有接口还是私有接口）private
router.delete("/delete/:id",passport.authenticate("jwt",{session:false}),(req,res) => {
    Teacher.findOneAndRemove({_id:req.params.id}).then(teachers => {
        teachers.save().then(teachers => {
            res.json(teachers);
        }).catch(err => {
            res.status(404).json("删除失败");
        });
    });
});


module.exports = router;