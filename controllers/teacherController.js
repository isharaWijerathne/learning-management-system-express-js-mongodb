
const Teacher = require('../models/Teacher')

exports.testfunc = async function(req,res){

    try {
        
    const teaceher = await Teacher.create(req.body)
    res.status(200).json({
        msg : "test"
    })
    } catch (error) {
        res.status(404).json({
            msg : error.message
        })
    }
}

exports.test = function(res,res){
    res.status(200).json({
        msg : "test"
    })
}