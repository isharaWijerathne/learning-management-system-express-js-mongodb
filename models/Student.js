const mongoose = require('mongoose');
const { emaliValidator, passwordValidator } = require('../validations/mongooseCustomValidator');

const studentSchema = new mongoose.Schema({
    student_id : {
        type: String,
        required :[true, 'student_id is required filed'],
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
    date_of_birth : {
        type : Date,
        required : [true, 'date_of_birth is requierd filed']
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
},{collection : 'student'});

const Student = mongoose.model("Student",studentSchema);
module.exports = Student;
