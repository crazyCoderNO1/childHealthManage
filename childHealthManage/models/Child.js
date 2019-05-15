//创建一个模型
const mongoose = require("mongoose");
//实例化
const Schema = mongoose.Schema;
//创建
const  ChildSchema = {
    child_num:{
        type: String,
        required: true
    },
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
        type: String
    },
    id_number:{
        type:String,
        required: true
    },
    admission_time:{
        type: String,
        required: true
    },
    class:{
        type: String,
        required: true
    },
    address:{
        type: String,
        required: true
    },
    father_name:{
            type: String,
            required: true
    },
    father_workplace:{
            type: String,
            required: true
    },
    father_phone:{
            type: String,
            required: true
    },
    mother_name:{
        type: String,
        required: true
    },
    mother_workplace:{
            type: String,
            required: true
    },
    mother_phone:{
        type: String,
        required: true
    }
};

module.exports = Child = mongoose.model("child",ChildSchema);