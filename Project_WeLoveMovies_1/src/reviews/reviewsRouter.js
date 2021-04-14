const reviewsRouter = require("express").Router();
const controller = require("./reviewsController");
const methodNotAllowed = require("../errors/methodNotAllowed");
const cors = require("cors");

//theaterRouter.use(cors());



reviewsRouter
    .route("/")
    .get(controller.list).all(methodNotAllowed);

module.exports = reviewsRouter;
