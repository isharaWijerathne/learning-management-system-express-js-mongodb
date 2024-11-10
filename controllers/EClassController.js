const EClass = require("../models/EClass");
const asyncErrorHandler = require("../utils/errorHandalers/asyncErrorHandler");
const CustomError = require("../utils/errorHandalers/customeErrHander");
const { nextIDGenarator } = require("../utils/generator");


//create Eclass
exports.createEClass = asyncErrorHandler( async (req,res)=>{

    //get last Eclass id
    const lastCreatedEclass = await EClass.findOne().sort({ eclass_id : -1 });

    //default id -> CLS-00000
    let lastCreatedId = lastCreatedEclass === null ? 'CLS-00000' : lastCreatedEclass.eclass_id;

    let newID = nextIDGenarator(lastCreatedId,"CLS")

    //incomming fild -> subject/title/teacher_id

    let serverData = {
        eclass_id : newID,
        is_active : true,
        is_publish : true,
    }

    let classData = { ...req.body, ...serverData }

    const newEclass = await EClass.create(classData);

    res.status(200).json({
        status : "success",
        data : {
            eclass : newEclass
        }
    })

});


//edit Eclass
exports.editEClass = asyncErrorHandler( async (req,res,next)=> {

    //feach requestbody
    const reqbody = req.body;

    //find class
    const createEClass = await EClass.findOne({ eclass_id : reqbody.eclass_id });

    //Eclass in invalid error
    if(createEClass === null){
        const eclassFoundError = new CustomError("invalid Eclass id");
        return next(eclassFoundError);
    }

    //update Eclass

    const updateEclass = await EClass.findOneAndUpdate({ eclass_id : reqbody.eclass_id },req.body,{new : true});

    res.status(200).json({
        status : "success",
        data : {
            eclass : updateEclass
        }
    })


} );


//active Eclass
exports.activeStatusEclass = asyncErrorHandler( async(req,res,next) =>{ 

    // req -> is_active , eclass_id
    const findEclass = await EClass.findOne({eclass_id : req.eclass_id});

    //error -> Eclass null error
    if(findEclass == null){
        const EclassNullError = new CustomError("invalid eclass id")
        return next(EclassNullError);
    }

    //update
    findEclass.is_active = req.is_active;
    await findEclass.save();

    //res
    res.status(200).json({
        status : "success",
        data : {
            eclass : findEclass
        }
    })

} );


//publishClass
exports.publishStatusEclass = asyncErrorHandler( async (req,res,next) =>{
    
    // req -> is_active , eclass_id
    const findEclass = await EClass.findOne({eclass_id : req.eclass_id});

    //error -> Eclass null error
    if(findEclass == null){
        const EclassNullError = new CustomError("invalid eclass id")
        return next(EclassNullError);
    }

    //update
    findEclass.is_publish = req.is_publish;
    await findEclass.save();

    //res
    res.status(200).json({
        status : "success",
        data : {
            eclass : findEclass
        }
    })
} );


//deleteClass
exports.deleteEclass = asyncErrorHandler( async (req,res,next) =>{

    //delete
    const delete_class = await EClass.findByIdAndDelete({eclass_id : req.body.eclass_id},{new : true});

    //erro throw
    if(delete_class === null){
        const deleteInvalidError = new CustomError("invalid eclass_id");
        return next(deleteInvalidError);
    }

    res.status(200).json({
        status : "success",
        data : {
            eclass : delete_class
        }
    })
} );