const mongoose = require('mongoose');

const moduleSchema = new mongoose.Schema({
    module_id : {
        type: String,
        required :[true, 'module_id is required filed'],
        unique:true
    },
    class_id : {
        type : String,
        required : [true ,'class_id is required filed']
    },
    title : {
        type : String,
        required : [true ,'title is required filed']
    },
    body :
    {
        type : String
    },
    is_active : {
        type : Boolean,
        default : true
    }
},{collection : 'module'});

const EModule = mongoose.model("EModule",moduleSchema);
module.exports = EModule;
