
const { nextIDGenarator } = require('../utils/generator')
const asyncErroHandaler = require('../utils/errorHandalers/asyncErrorHandler')
const Teacher = require('../models/Teacher');
const CustomError = require('../utils/errorHandalers/customeErrHander');
const bcrypt = require('bcrypt');


//teacher create
exports.createTeacher = asyncErroHandaler( async (req,res,next) =>{

    //get last created teacher id
    const lastCreatedTeacher = await Teacher.findOne().sort({teacher_id : -1});

    //default id -> TEC-00000
    let lastCreatedId = lastCreatedTeacher === null ? 'TEC-00000' : lastCreatedTeacher.teacher_id;

        
    let newId = nextIDGenarator(lastCreatedId,'TEC');

    let serverInsert =  {
        "teacher_id" : newId,
    }

    let teacherData = { ...req.body[0], ...serverInsert }
    
    console.log(teacherData);
    
    const newTeacher = await Teacher.create(teacherData);
    res.status(200).json({
        stauts : 'success',
        message : {
            teacher : {
                first_name: newTeacher.first_name,
                last_name: newTeacher.last_name,
                email: newTeacher.email,
                teacher_subject : newTeacher.teacher_subject
            }
        }
    });

});


//teacher edit
exports.editTeacher = asyncErroHandaler ( async (req,res,next)=>{

    //feach requestbody
    const reqbody =  req.body[0]

    
    //find teacher
    const createdTeacher = await Teacher.findOne({teacher_id : reqbody.teacher_id});

    //teacher id invalid error
    if(createdTeacher === null){ 
        const teacerFoundError = new CustomError("Invalid Teacher Id",404)
        return next(teacerFoundError) 
    }

    //update teacher
    const updatedTeacher = await Teacher.updateOne(
        {teacher_id : reqbody.teacher_id},
        { $set : {
            first_name : reqbody.first_name,
            last_name : reqbody.last_name,
            email : reqbody.email,
            teacher_subject : reqbody.teacher_subject
        }}
    )

    res.status(200).json({
        status : "success",
        message : "Teacher Updated Successfully"
    })
});


//teacher activate
exports.activeTeacher = asyncErroHandaler( async (req,res,next)=>{
    
    //get user id form URL
    const teacher_id = req.params.teacherId;

    //feach user from db
    const teacher = await Teacher.findOne({teacher_id : teacher_id});

    

    //teacher id invalid error
    if(teacher === null){ 
        const teacerFoundError = new CustomError("Invalid Teacher Id",404)
        return next(teacerFoundError) 
    }

    //if teacher active
    if(teacher.is_active === true){
        const teacherAlreadyActiveError = new CustomError("Teacher Already Activated",404)
        return next(teacherAlreadyActiveError);
    }

    //activate inactivate teacher
    const setTeacherActive = await Teacher.updateOne(
        {
            teacher_id : teacher_id,
        },
        {
            is_active : true
        });

    return res.status(200).json({
        stauts : "success",
        message : "Teacher Activated"
    });
});


//teacher deactivate
exports.deactiveTeacher = asyncErroHandaler( async (req,res,next)=>{
    
    //get user id form URL
    const teacher_id = req.params.teacherId;

    //feach user from db
    const teacher = await Teacher.findOne({teacher_id : teacher_id});

    //teacher id invalid error
    if(teacher === null){ 
        const teacerFoundError = new CustomError("Invalid Teacher Id",404)
        return next(teacerFoundError) 
    }

    //if teacher active
    if(teacher.is_active === false){
        const teacherAlreadyDeactiveError = new CustomError("Teacher Already Deactivated",404)
        return next(teacherAlreadyDeactiveError);
    }

    //teacher deactivate
    const setTeacherActive = await Teacher.updateOne(
        {
            teacher_id : teacher_id,
        },
        {
            is_active : false
        });

    return res.status(200).json({
        stauts : "success",
        message : "Teacher Deactivated"
    });
});


exports.passwordChange = asyncErroHandaler( async (req,res,next) =>{
    
    const reqBody = req.body[0];

    // fetch user
    const teacher = await Teacher.findOne({ teacher_id: reqBody.teacher_id });

    //teacher null error
    if(teacher === null){ 
        const teacerFoundError = new CustomError("Invalid Teacher Id",404)
        return next(teacerFoundError) 
    }

    //check password
    teacher.comparePassword(reqBody.password, function(err, isMatch) {
    if (err) return next(err);

    if(!isMatch){
        const passwordWrongErro =  new CustomError("Please Check Your Password");
        next(passwordWrongErro)
    }
    })


    //////This Password need to fix

    // const saltRounds = 10;  // The cost factor
    // const hashedPassword = await bcrypt.hash(plainPassword, saltRounds);

    const passwordUpdate = await Teacher.findOneAndUpdate(
        {teacher_id : reqBody.teacher_id},
        {$set : { password : reqBody.password_new}}
    );

    
    return res.status(200).json({
        stauts : "success",
        message : "Password Change Successfuly"
    });
});


