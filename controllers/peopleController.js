const createHttpErrors = require("http-errors");

const { People } = require("../models");

module.exports.createPeople = async (req, res, next) => {
  try {
    const { body, file } = req;

    const newPeople = await People.create(
      Object.assign({ images: file.filename }, body)
    );
    res.status(201).send({ data: newPeople });
  } catch (error) {
    next(error);
  }
};

module.exports.getPeople = async (req, res, next) => {
  try {
    const {
      params: { peopleId },
    } = req;

    const people = await People.findByPk(peopleId);
    if (people) {
      res.status(201).send({ data: people });
    } else {
      next(createHttpErrors(404, "Not found"));
    }
  } catch (error) {
    next(error);
  }
};

module.exports.getPeoples = async (req, res, next) => {
  try {
    const peopes = await People.findAll();
    if (peopes < 0) {
      next(createHttpErrors(404, "Not found"));
    }
    res.status(201).send({ data: peopes });
  } catch (error) {
    next(error);
  }
};

module.exports.updatePeople = async (req, res, next) => {
  const {
    body,
    file,
    params: { peopleId },
  } = req;
  try {
    const [updatedPeopele, [people]] = await People.update(
      Object.assign({ images: file.filename }, body),
      {
        where: { id: peopleId },
        returning: true,
      }
    );

    if (updatedPeopele !== 1) {
      throw createHttpErrors(404, "Not found");
    }

    res.send({ data: people });
  } catch (error) {
    next(error);
  }
};

module.exports.deletePeopel = async (req, res, next) => {
  try {
    const people = await People.findByPk(req.params.peopleId);

    if (!people) {
      next(createHttpErrors(404, `Not  found`));
    }
    await people.destroy();
    res.status(201).send({ data: people });
  } catch (error) {
    next(error);
  }
};

module.exports.addPeopleToSuperheroes = async (req, res, next) => {
  const {
    superheroes,
    params: { peopleId },
  } = req;

  const people = await People.findByPk(peopleId);

  if (!people) {
    next(createHttpErrors(404, "Not found"));
  }
  await people.addSuperheroes(superheroes);
  res.status(201).send({ data: "Superhero created" });
};

module.exports.deletePeoleToSuperheroes = async (req, res, next) => {
  const {
    params: { peopleId, superheroesId },
  } = req;
  const people = await PeopleToSuperheroes.findAll({
    where: { peopleId: peopleId, superheroesId: superheroesId },
  });

  if (!people) {
    next(createHttpErrors(404, "Not found"));
  }
  await people.destroy();
  res.status(201).send({ data: people });
};
