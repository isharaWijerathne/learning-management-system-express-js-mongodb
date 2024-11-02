const mongoose = require('mongoose');

const moduleDownloadSchema = new mongoose.Schema({
    moduleDownloads_id : {
        type: String,
        required :[true, 'moduleDownloads_id is required filed'],
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
    }
},{collection : 'moduleDownloads'});

const EModuleDownloads = mongoose.model("ModuleDownloads",moduleDownloadSchema);
module.exports = EModuleDownloads;
