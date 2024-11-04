const mongoose = require('mongoose');
const { emaliValidator, passwordValidator } = require('../utils/validations/mongooseCustomValidator');
const bcrypt = require('bcrypt');


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


studentSchema.pre('save', function(next) {
    var student = this;

    // only hash the password if it has been modified (or is new)
    if (!student.isModified('password')) return next();

    // generate a salt
    const saltRounds = parseInt(process.env.SALT_WORK_FACTOR, 10) || 10;
    bcrypt.genSalt(saltRounds, function(err, salt) {
        if (err) return next(err);

        // hash the password using our new salt
        bcrypt.hash(student.password, salt, function(err, hash) {
            if (err) return next(err);
            // override the cleartext password with the hashed one
            student.password = hash;
            next();
        });
    });
});
     
studentSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};
  

const Student = mongoose.model("Student",studentSchema);
module.exports = Student;
