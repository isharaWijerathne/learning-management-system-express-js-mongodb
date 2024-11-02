const mongoose = require('mongoose');

const assessmentSchema = new mongoose.Schema({
    assessment_id : {
        type: String,
        required :[true, 'assessment_id is required filed'],
        unique:true
    },
    module_id : {
        type : String,
        required : [true ,'module_id is required filed']
    },
    title : {
        type : String,
        required : [true ,'title is required filed']
    },
    file_location :
    {
        type : String,
    },
    is_active : {
        type : Boolean,
        default : true
    },
    end_date : {
        type : Date,
    },
    start_date : {
        type : Date,
    }
},{collection : 'assesment'});

const Assessment = mongoose.model("Assessment",assessmentSchema);
module.exports = Assessment;
