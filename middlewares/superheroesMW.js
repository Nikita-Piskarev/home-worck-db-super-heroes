const createHttpErrors = require("http-errors");
const { Superheroes } = require("../models");

module.exports.getHeroe = async (req, res, next) => {
  const {
    params: { superheroesId },
  } = req;

  const heroe = await Superheroes.findByPk(superheroesId);

  if (!heroe) {
    return next(createHttpErrors(404, "No found"));
  }

  req.superheroes = heroe;
  next();
};
