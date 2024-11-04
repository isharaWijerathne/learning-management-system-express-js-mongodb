const { nextIDGenarator } = require('../utils/generator')
const asyncErroHandaler = require('../utils/errorHandalers/asyncErrorHandler')
const Student = require('../models/Student');
const CustomError = require('../utils/errorHandalers/customeErrHander');
const bcrypt = require('bcrypt');



//student create
exports.createStundet = asyncErroHandaler( async (req,res,next) =>{

    //get last created student id
    const lastCreatedStudent = await Student.findOne().sort({student_id : -1});

    //default id -> STD-00000
    let lastCreatedId = lastCreatedStudent === null ? 'STD-00000' : lastCreatedStudent.student_id;

        
    let newId = nextIDGenarator(lastCreatedId,'STD');

    let serverInsert =  {
        "student_id" : newId,
    }

    let studentData = { ...req.body[0], ...serverInsert }
    
    
    const newStudent = await Student.create(studentData);
    res.status(200).json({
        stauts : 'success',
        message : {
            student : {
                first_name: newStudent.first_name,
                last_name: newStudent.last_name,
                email: newStudent.email
            }
        }
    });

});



//student edit
exports.editStudent = asyncErroHandaler ( async (req,res,next)=>{

    //feach requestbody
    const reqbody =  req.body[0]

    
    //find student
    const createdStudent = await Student.findOne({student_id : reqbody.student_id});

    //student id invalid error
    if(createdStudent === null){ 
        const studentFoundError = new CustomError("Invalid Student Id",404)
        return next(studentFoundError) 
    }

    //update student
    const updatedTeacher = await Student.updateOne(
        {student_id : reqbody.student_id},
        { $set : {
            first_name : reqbody.first_name,
            last_name : reqbody.last_name,
            email : reqbody.email,
            date_of_birth : reqbody.date_of_birth
        }}
    )

    res.status(200).json({
        status : "success",
        message : "Student Updated Successfully"
    })
});



//student activate
exports.activeStudent = asyncErroHandaler( async (req,res,next)=>{
    
    //get user id form URL
    const student_id = req.params.studentId;

    //feach student from db
    const student = await Student.findOne({student_id : student_id});

    
    //student id invalid error
    if(student === null){ 
        const studentFoundError = new CustomError("Invalid Student Id",404)
        return next(studentFoundError) 
    }

    //if student active
    if(student.is_active === true){
        const studentAlreadyActiveError = new CustomError("Student Already Activated",404)
        return next(studentAlreadyActiveError);
    }

    //activate inactivate student
    const setStudentActive = await Student.updateOne(
        {
            student_id : student_id,
        },
        {
            is_active : true
        });

    return res.status(200).json({
        stauts : "success",
        message : "Student Activated"
    });
});


//student deactivate
exports.deactivateStudent = asyncErroHandaler( async (req,res,next)=>{
    
    //get user id form URL
    const student_id = req.params.studentId;

    //feach user from db
    const student = await Student.findOne({student_id : student_id});

    //student id invalid error
    if(student === null){ 
        const studentFoundError = new CustomError("Invalid Student Id",404)
        return next(studentFoundError) 
    }

    //if studnet deactive
    if(student.is_active === false){
        const studentAlreadyDeactiveError = new CustomError("Student Already Deactivated",404)
        return next(studentAlreadyDeactiveError);
    }

    //teacher deactivate
    const setTeacherActive = await Student.updateOne(
        {
            student_id : student_id,
        },
        {
            is_active : false
        });

    return res.status(200).json({
        stauts : "success",
        message : "Student Deactivated"
    });
});