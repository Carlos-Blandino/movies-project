const moviesRouter = require("express").Router();
const controller = require("./moviesController");
const methodNotAllowed = require("../errors/methodNotAllowed");
const cors = require("cors");

//theaterRouter.use(cors());
moviesRouter
    .route("/").get(controller.list).all(methodNotAllowed);

module.exports = moviesRouter;