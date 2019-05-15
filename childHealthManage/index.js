//express搭建服务器
//1.引入express
const express = require("express");
//引入body-parser
const bodyParser = require("body-parser");
//引入mongoose
const mongoose = require("mongoose");

//引入passport
const passport = require("passport");

//2.实例化一个app
const app = express();

//引入user.js
const users = require("./routes/api/users");
const children = require("./routes/api/children");
const teachers = require("./routes/api/teachers");
const medicalexam = require("./routes/api/medicalexam");
const dietrecords = require("./routes/api/dietrecords");

//设置路由（能在浏览器中访问到）
app.get("/",(req,res)=>{
    res.send("Hello World");
});

//使用body-parser中间件
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//使用router
app.use("/api/users",users);
app.use("/api/children",children);
app.use("/api/teachers",teachers);
app.use("/api/medicalexam",medicalexam);
app.use("/api/dietrecords",dietrecords);

//3.设置端口
const port = process.env.PORT || 5000;
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
});

//passport初始化
app.use(passport.initialize());
require("./config/passport")(passport);


//连接mongdb
mongoose.connect('mongodb://localhost/childhealthmanage',{ useNewUrlParser: true }); //连接到mongoDB的todo数据库
//该地址格式：mongodb://[username:password@]host:port/database[?options]
//默认port为27017 
const db = mongoose.connection;
db.on('error', function callback() { //监听是否有异常
    console.log("Connection error");
});
db.once('open', function callback() { //监听一次打开
    //在这里创建你的模式和模型
    console.log('connected!');
});
 
module.exports = mongoose;