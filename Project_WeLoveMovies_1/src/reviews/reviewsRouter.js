const reviewsRouter = require("express").Router();
const controller = require("./reviewsController");
const methodNotAllowed = require("../errors/methodNotAllowed");
const cors = require("cors");

reviewsRouter.use(cors());

reviewsRouter
    .route("/")
    .get(controller.list).all(methodNotAllowed);

reviewsRouter
    .route("/:reviewId")
    .put(controller.update)
    .delete(controller.destroy)
    .all(methodNotAllowed);

module.exports = reviewsRouter;