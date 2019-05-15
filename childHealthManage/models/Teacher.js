//创建一个模型
const mongoose = require("mongoose");
//实例化
const Schema = mongoose.Schema;
//创建
const  TeacherSchema = {
    name:{
        type: String,
        required: true
    },
    sex:{
        type: String,
        required: true
    },
    birthday:{
        type: String,
        required: true
    },
    birthplace:{
        type: String,
        required: true
    },
    nation:{
        type:String,
        required: true
    },
    marital_status:{
        type: String,
        required: true
    },
    education:{
        type: String,
        required: true
    },
    id_number:{
        type: String,
        required: true
    },
    politics_status:{
            type: String,
            required: true
    },
    registered_address:{
            type: String,
            required: true
    },
    contact_address:{
            type: String,
            required: true
    },
    contact_phone:{
        type: String,
        required: true
    }
};

module.exports = Teacher = mongoose.model("teacher",TeacherSchema);