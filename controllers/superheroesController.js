const createHttpErrors = require("http-errors");

const { Superheroes } = require("../models");

module.exports.createHeroe = async (req, res, next) => {
  try {
    const newHeroe = await Superheroes.create(req.body);

    res.status(201).send({ data: newHeroe });
  } catch (error) {
    next(error);
  }
};

module.exports.getHeroes = async (req, res, next) => {
  try {
    const heroes = await Superheroes.findAll();

    if (heroes.lenght < 0) {
      next(createHttpErrors(404, "Not found"));
    }
    
    res.status(201).send({ data: heroes });
  } catch (error) {
    next(error);
  }
};

module.exports.getHeroe = async (req, res, next) => {
  try {
    const {
      params: { superheroesId },
    } = req;

    const heroe = await Superheroes.findByPk(superheroesId);

    if (heroe) {
      res.status(201).send({ data: heroe });
    } else {
      next(createHttpErrors(404, `Not found`));
    }
  } catch (error) {
    next(error);
  }
};

module.exports.updateHeroe = async (req, res, next) => {
  try {
    const {
      params: { superheroesId },
      body,
    } = req;
    const [updeteRows, [heroe]] = await Superheroes.update(body, {
      where: { id: superheroesId },
      returning: true,
    });
    if (updeteRows === 1) {
      res.status(201).send({ data: heroe });
    } else {
      next(createHttpErrors(404, `Not found`));
    }
  } catch (error) {
    next(error);
  }
};

module.exports.deleteHeroe = async (req, res, next) => {
  try {
    const heroe = await Superheroes.findByPk(req.params.superheroesId);
    if (!heroe) {
      next(createHttpErrors(404, `Not  found`));
    }
    await heroe.destroy();
    res.status(201).send({ data: heroe });
  } catch (error) {
    next(error);
  }
};
