if (process.env.USER) require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
// require your routers


// require your error handlers


// app.use
app.use(express.json());
app.use(cors);


module.exports = app;
