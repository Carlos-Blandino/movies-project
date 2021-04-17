const theaterRouter = require("express").Router({mergeParams:true});
const controller = require("./theatersController");
const methodNotAllowed = require("../errors/methodNotAllowed");

theaterRouter
    .route("/").get(controller.list).all(methodNotAllowed);

module.exports = theaterRouter;