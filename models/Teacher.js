const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const { emaliValidator, passwordValidator } = require('../utils/validations/mongooseCustomValidator');

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
        type : String,
        default : 'xxxxxxx'
    }
},{collection : 'teacher'});


teacherSchema.pre('save', function(next) {
    var teaher = this;

    // only hash the password if it has been modified (or is new)
    if (!teaher.isModified('password')) return next();

    // generate a salt
    const saltRounds = parseInt(process.env.SALT_WORK_FACTOR, 10) || 10;
    bcrypt.genSalt(saltRounds, function(err, salt) {
        if (err) return next(err);

        // hash the password using our new salt
        bcrypt.hash(teaher.password, salt, function(err, hash) {
            if (err) return next(err);
            // override the cleartext password with the hashed one
            teaher.password = hash;
            next();
        });
    });
});
     
teacherSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};
     

const Teacher = mongoose.model("Teacher",teacherSchema);
module.exports = Teacher;
