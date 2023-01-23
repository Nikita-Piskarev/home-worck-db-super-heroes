const peopleRouter = require("./peopleRouter");
const superheroesRouter = require("./superheroesRouter");
const routers = require("express").Router();

routers.use("/peoples", peopleRouter);
routers.use("/superheroes", superheroesRouter);

module.exports = routers;
