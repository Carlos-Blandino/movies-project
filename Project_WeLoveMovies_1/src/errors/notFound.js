function notFound(req, res,next){
    next({status: 404, message: `Path can not found: ${req.originalUrl}`});
}
module.exports = notFound;