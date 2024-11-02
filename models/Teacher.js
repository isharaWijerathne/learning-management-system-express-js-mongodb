const mongoose = require('mongoose');
const { emaliValidator, passwordValidator } = require('../validations/mongooseCustomValidator');

const teacherSchema = new mongoose.Schema({
    teacher_id : {
        type: String,
        required :[true, 'teacher_id is required filed'],
        unique:true
    },
    first_name : {
        type : String,
        required : [true ,'first_name is required filed']
    },
    last_name : {
        type : String,
        required : [true ,'last_name is required filed']
    },
    email : {
        type : String,
        required : [true ,'first_name is required filed'],
        validate: {
            validator : emaliValidator,
            message :"try again with another email"
        },
        unique : true
    },
    password : {
        type : String,
        required :[true, 'password is required filed'],
        validate :{
            validator : passwordValidator,
            message : "try another password"
        }
    },
    teacher_subject : {
        type : String,
        required : [true, 'teacher_subject is required filed']
    }
    ,
    is_active : {
        type : Boolean,
        default : true
    }
    ,
    token : {
        type : String
    }
},{collection : 'teacher'});

const Teacher = mongoose.model("Teacher",teacherSchema);
module.exports = Teacher;
