const mongoose = require('mongoose');

const assessmentUploadSchema = new mongoose.Schema({
    assessmentUpload_id : {
        type: String,
        required :[true, 'assessmentUpload_id is required filed'],
        unique:true
    },
    assessment_id : {
        type : String,
        required : [true ,'assessment_id is required filed']
    },
    student_id : {
        type : String,
        required : [true ,'student_id is required filed']
    },
    file_location :
    {
        type : String,
    },
    mark : {
        type : String,
    }
},{collection : 'assesment'});

const AssessmentUpload = mongoose.model("AssessmentUploads",assessmentUploadSchema);
module.exports = AssessmentUpload;
