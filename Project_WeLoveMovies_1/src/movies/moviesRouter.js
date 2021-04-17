const moviesRouter = require("express").Router();
const controller = require("./moviesController");
const reviewsRouter = require("../reviews/reviewsRouter")
const theatersRouter = require("../theaters/theatersRouter");
const methodNotAllowed = require("../errors/methodNotAllowed");

moviesRouter.use("/:movieId/reviews", reviewsRouter);
moviesRouter.use("/:movieId/theaters", theatersRouter);
moviesRouter.route("/:movieId").get(controller.read).all(methodNotAllowed);
moviesRouter.route("/").get(controller.list).all(methodNotAllowed);



module.exports = moviesRouter;