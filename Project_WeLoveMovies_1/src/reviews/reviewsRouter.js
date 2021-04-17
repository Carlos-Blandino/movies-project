const reviewsRouter = require("express").Router({mergeParams: true});
const controller = require("./reviewsController");
const methodNotAllowed = require("../errors/methodNotAllowed");


reviewsRouter
    .route("/:reviewId")
    .put(controller.update)
    .delete(controller.destroy)
    .all(methodNotAllowed);
reviewsRouter
    .route("/")
    .get(controller.list).all(methodNotAllowed);



module.exports = reviewsRouter;