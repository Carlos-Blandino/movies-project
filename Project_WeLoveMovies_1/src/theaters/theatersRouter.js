const theaterRouter = require("express").Router();
const controller = require("./theatersController");
const methodNotAllowed = require("../errors/methodNotAllowed");
const cors = require("cors");

//theaterRouter.use(cors());
theaterRouter
.route("/").get(controller.list).all(methodNotAllowed);

module.exports = theaterRouter;