//创建一个模型
const mongoose = require("mongoose");
//实例化
const Schema = mongoose.Schema;
//创建
const  Users = {
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    /*avatar:{
        type: String
    },*/
    identity:{
        type:String,
        required: true
    },
    date:{
        type: Date,
        default: Date.now
    }
};

module.exports = User = mongoose.model("users",Users);