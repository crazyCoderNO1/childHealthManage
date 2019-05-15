//创建一个模型
const mongoose = require("mongoose");
//实例化
const Schema = mongoose.Schema;
//创建
const  DietRecordsSchema = {
    childNum:{
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
    recordsTime:{
        type: String,
        required: true
    },
    recordsWeek:{
        type: String,
    },
    recordsDay:{
        type: String,
        required: true
    },
    breakfast:{
        type: String,
        required: true
    },
    lunch:{
        type: String,
        required: true
    },
    dinner:{
        type: String,
        required: true
    }
};

module.exports = DietRecords = mongoose.model("dietrecords",DietRecordsSchema);