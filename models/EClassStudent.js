const mongoose = require('mongoose');

const eClassStudentSchema = new mongoose.Schema({
    eclassStudent_id : {
        type: String,
        required :[true, 'eclassStudent_id is required filed'],
        unique:true
    },
    eClass_id : {
        type : String,
        required : [true ,'eClass_id is required filed']
    },
    student_id : {
        type : String,
        required : [true ,'student_id is required filed']
    },
    is_active : {
        type : Boolean,
        default : true
    }
},{collection : 'eclassStudent'});

const EClassStudent = mongoose.model("EClassStudent",eClassStudentSchema);
module.exports = EClassStudent;
