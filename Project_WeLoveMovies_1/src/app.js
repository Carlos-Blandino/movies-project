if (process.env.USER) require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();

const theatersRouter = require("./theaters/theatersRouter");
const moviesRouter = require("./movies/moviesRouter");
const reviewsRouter = require("./reviews/reviewsRouter");

const notFound = require("./errors/notFound");
const errorHandler = require("./errors/errorHandler");

app.use(cors());

app.use(express.json());


app.use("/theaters", theatersRouter);
app.use("/movies", moviesRouter);
app.use("/reviews", reviewsRouter);

app.use(notFound);
app.use(errorHandler);


module.exports = app;
