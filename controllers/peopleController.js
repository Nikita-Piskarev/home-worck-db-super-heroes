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
    const [updatedCars, [people]] = await People.update(
      Object.assign({ images: file.filename }, body),
      {
        where: { id: peopleId },
        returning: true,
      }
    );

    if (updatedCars !== 1) {
      throw createHttpErrors(404, "Car not found");
    }

    res.send({ data: people });
  } catch (error) {
    next(error);
  }
};

// module.exports.addPicToCar = async (req, res, next) => {
//     const {
//       body,
//       file,
//       params: { peopleId },
//     } = req;
//     try {
//       const [updatedCars, [people]] = await People.update(
//         { images: file.filename },
//         { where: { id: peopleId }, returning: true }
//       );

//       if (updatedCars !== 1) {
//         throw createHttpErrors(404, 'Car not found');
//       }

//       res.send({ data: people });
//     } catch (error) {
//       next(error);
//     }
//   };
