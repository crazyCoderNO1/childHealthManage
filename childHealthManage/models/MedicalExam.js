//创建一个模型
const mongoose = require("mongoose");
//实例化
const Schema = mongoose.Schema;
//创建
const  MedicalExamSchema = {
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
    class:{
        type: String,
        required: true
    },
    medicalExamTime:{
        type: String,
        required: true
    },
    height:{
        type: String,
        required: true
    },
    weight:{
        type: String,
        required: true
    },
    leftVision:{
        type: String,
        required: true
    },
    rightVision:{
        type: String
    },
    colorBlindness:{
        type: String,
        required: true
    },
    leftHear:{
        type:String,
        required: true
    },
    rightHear:{
        type: String,
        required: true
    },
    decayedTooth:{
        type: String,
        required: true
    }
};

module.exports = MedicalExam = mongoose.model("medicalexam",MedicalExamSchema);