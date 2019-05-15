//幼儿信息管理
const express =  require("express");
const router = express.Router();
const Child = require("../../models/Child");
const passport = require("passport");


//$route GET  api/children/test
//@desc   返回的请求的json数据
//@access  （公有接口还是私有接口）public

router.get("/test",(req,res)=>{
    res.json({msg:"Children works"});
});

//$route POST  api/children/add
//@desc   创建（添加）信息接口
//@access  （公有接口还是私有接口）private
router.post("/add",passport.authenticate("jwt",{session:false}),(req,res)=>{
    const childrenFields = {};
    if(req.body.child_num) childrenFields.child_num = req.body.child_num;
    if(req.body.name) childrenFields.name = req.body.name;
    if(req.body.sex) childrenFields.sex = req.body.sex;
    if(req.body.birthday) childrenFields.birthday = req.body.birthday;
    if(req.body.birthplace) childrenFields.birthplace = req.body.birthplace;
    if(req.body.id_number) childrenFields.id_number = req.body.id_number;
    if(req.body.admission_time) childrenFields.admission_time = req.body.admission_time;
    if(req.body.class) childrenFields.class = req.body.class;
    if(req.body.address) childrenFields.address = req.body.address;
    if(req.body.father_name) childrenFields.father_name = req.body.father_name;
    if(req.body.father_workplace) childrenFields.father_workplace = req.body.father_workplace;
    if(req.body.father_phone) childrenFields.father_phone = req.body.father_phone;
    if(req.body.mother_name) childrenFields.mother_name = req.body.mother_name;
    if(req.body.mother_workplace) childrenFields.mother_workplace = req.body.mother_workplace;
    if(req.body.mother_phone) childrenFields.mother_phone = req.body.mother_phone;

    new Child(childrenFields).save().then(children => {
        res.json(children);
    });
});


//$route POST  api/children
//@desc   获取所有信息接口
//@access  （公有接口还是私有接口）private
router.get("/",(req,res) => {
    Child.find().then(children => {
        if(!children){
            return res.status(404).json("没有任何内容");
        }else{
            res.json(children);
        }
    }).catch(err => res.status(404).json(err));
});

//$route POST  api/children/:id
//@desc   获取单个信息接口
//@access  （公有接口还是私有接口）private
router.get("/:id",passport.authenticate("jwt",{session:false}),(req,res) => {
    Child.findOne({_id:req.params.id}).then(children => {
        if(!children){
            return res.status(404).json("没有任何内容");
        }else{
            res.json(children);
        }
    }).catch(err => res.status(404).json(err));
});

//$route POST  api/children/edit
//@desc   编辑信息接口
//@access  （公有接口还是私有接口）private
router.post("/edit/:id",passport.authenticate("jwt",{session:false}),(req,res)=>{
    const childrenFields = {};
    if(req.body.child_num) childrenFields.child_num = req.body.child_num;
    if(req.body.name) childrenFields.name = req.body.name;
    if(req.body.sex) childrenFields.sex = req.body.sex;
    if(req.body.birthday) childrenFields.birthday = req.body.birthday;
    if(req.body.birthplace) childrenFields.birthplace = req.body.birthplace;
    if(req.body.id_number) childrenFields.id_number = req.body.id_number;
    if(req.body.admission_time) childrenFields.admission_time = req.body.admission_time;
    if(req.body.class) childrenFields.class = req.body.class;
    if(req.body.address) childrenFields.address = req.body.address;
    if(req.body.father_name) childrenFields.father_name = req.body.father_name;
    if(req.body.father_workplace) childrenFields.father_workplace = req.body.father_workplace;
    if(req.body.father_phone) childrenFields.father_phone = req.body.father_phone;
    if(req.body.mother_name) childrenFields.mother_name = req.body.mother_name;
    if(req.body.mother_workplace) childrenFields.mother_workplace = req.body.mother_workplace;
    if(req.body.mother_phone) childrenFields.mother_phone = req.body.mother_phone;

    Child.findOneAndUpdate({_id:req.params.id},{$set:childrenFields},{new:true})
        .then(children => res.json(children));
});

//$route POST  api/children/delete/:id
//@desc   删除信息接口
//@access  （公有接口还是私有接口）private
router.delete("/delete/:id",passport.authenticate("jwt",{session:false}),(req,res) => {
    Child.findOneAndRemove({_id:req.params.id}).then(children => {
        children.save().then(children => {
            res.json(children);
        }).catch(err => {
            res.status(404).json("删除失败");
        });
    });
});


module.exports = router;