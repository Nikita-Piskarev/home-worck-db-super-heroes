const routers = require("express").Router();

routers.use("/peoples", peoplesRouter);

module.exports = routers;
