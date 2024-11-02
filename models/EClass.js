const mongoose = require('mongoose');

const eClassSchema = new mongoose.Schema({
    eclass_id : {
        type: String,
        required :[true, 'eclass_id is required filed'],
        unique:true
    },
    subject : {
        type : String,
        required : [true ,'subject is required filed']
    },
    title : {
        type : String,
        required : [true ,'title is required filed']
    },
    teacher_id : {
        type : String,
        required : [true ,'teacher_id is required filed']
    },
    is_active : {
        type : Boolean,
        default : true
    },
    is_publish : {
        type : Boolean,
        default : true
    }
    ,
    token : {
        type : String
    }
},{collection : 'student'});

const EClass = mongoose.model("EClass",eClassSchema);
module.exports = EClass;
