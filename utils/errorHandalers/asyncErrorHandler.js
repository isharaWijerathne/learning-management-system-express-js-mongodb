//async function retunn promise and this module captuer that

module.exports = (func) => {
    return (req,res,next) =>{
        func(req,res,next).catch(err => next(err));
    }
}