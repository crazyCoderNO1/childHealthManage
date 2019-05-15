//登录和注册
const express =  require("express");
const router = express.Router();
const User = require("../../models/User");
//引入bcrypt(加密)
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const keys = require("../../config/keys");

//$route GET  api/user/test
//@desc   返回的请求的json数据
//@access  （公有接口还是私有接口）public

router.get("/test",(req,res)=>{
    res.json({msg:"Login works"});
});

//搭建注册接口
//$route POST  api/user/register
//@desc   返回的请求的json数据
//@access  （公有接口还是私有接口）public
//post请求需安装第三方模块body-parser
router.post("/register",(req,res)=>{
    //console.log(req.body);

    //查询数据库中是否拥有邮箱
   User.findOne({email:req.body.email})
        .then((user)=>{
            if(user){
                return res.status(400).json("邮箱已被注册！");
                
            }else{
                const newUser = new User({
                    name: req.body.name,
                    email: req.body.email,
                    //avatar,
                    identity: req.body.identity,
                    password: req.body.password
                });   
           bcrypt.genSalt(10, function(err, salt) {
                bcrypt.hash(newUser.password, salt, (err, hash)=>{
                    if(err) throw err;
                    newUser.password = hash;
                    newUser.save()
                           .then(user => res.json(user))
                           .catch(err => console.log(err));
                    });
                });
            }
        })
});
//$route GET  api/user/login
//@desc   返回token jwt passport
//@access  （公有接口还是私有接口）public
router.post('/login',(req,res)=>{
    const email = req.body.email;
    const password = req.body.password;
    //查询数据库
    User.findOne({email})
        .then(user =>{
            if(!user){
                return res.status(404).json("用户不存在");
            }

            //密码匹配
            bcrypt.compare(password,user.password)
                .then(isMatch =>{
                        if(isMatch){
                            //定义规则
                            const rule = {
                                id:user.id,
                                name:user.name,
                                identity:user.identity
                            };
                            //jwt.sign("规则","加密名字","过期时间","箭头函数")
                            jwt.sign(rule,keys.secretOrKey,{expiresIn:3600},(err,token)=>{
                                if(err) throw err;
                                res.json({
                                    success:true,
                                    token: "Bearer "+token
                                });
                            })
                        }else{
                            return res.status(400).json("密码错误");
                        }
                    });
        });
});
//$route GET  api/user/current
//@desc   返回token current user
//@access  （公有接口还是私有接口）private
//"验证token"
router.get("/current",passport.authenticate("jwt",{session:false}),(req,res)=>{
    res.json({
        id:req.user.id,
        name:req.user.name,
        email: req.user.email,
        identity: req.user.identity
    });
});

//$route POST  api/users
//@desc   获取所有信息接口
//@access  （公有接口还是私有接口）private
router.get("/",(req,res) => {
    User.find().then(users => {
        if(!users){
            return res.status(404).json("没有任何内容");
        }else{
            res.json(users);
        }
    }).catch(err => res.status(404).json(err));
});


module.exports = router;