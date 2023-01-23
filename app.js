const express = require("express");
const { errorHandlers } = require("./errors/errorHandlers");
const { sequelizeErrors } = require("./errors/sequelizeErrors");
const routers = require("./routers");

const app = express();

app.use(express.json());

app.use(routers)
app.use(sequelizeErrors);
app.use(errorHandlers);

module.exports = app;
