const superheroesRouter = require("express").Router();

const SuperheroesController = require("../controllers/superheroesController");
superheroesRouter
  .route("/")
  .post(SuperheroesController.createHeroe)
  .get(SuperheroesController.getHeroes);

superheroesRouter
  .route("/:superheroesId")
  .get(SuperheroesController.getHeroe)
  .put(SuperheroesController.updateHeroe)
  .delete(SuperheroesController.deleteHeroe);

module.exports = superheroesRouter;
