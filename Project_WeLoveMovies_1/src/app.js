if (process.env.USER) require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const theatersRouter = require("./theaters/theatersRouter");

app.use(express.json());
app.use(cors());

app.use("/theaters", theatersRouter);

app.use((req, res, next) => {
    return next({ status: 404, message: `Not found: ${req.originalUrl}` });
});

app.use((error, req, res, next) => {
    console.error(error);
    const { status = 500, message = "Something went wrong!" } = error;
    res.status(status).json({ error: message });
});

module.exports = app;
