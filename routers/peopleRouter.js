const peopleRouter = require("express").Router();
const multer = require("multer");
const path = require("path");

const HeroeMW = require("../middlewares/superheroesMW");
const PeopleContoller = require("../controllers/peopleController");

const storage = multer.diskStorage({
  destination: function (req, file, cd) {
    cd(null, path.resolve(__dirname, "../public/images"));
  },
  filename: function (req, file, cd) {
    cd(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

peopleRouter
  .route("/")
  .put(upload.single("img"), PeopleContoller.createPeople)
  .get(PeopleContoller.getPeoples);

peopleRouter
  .route("/:peopleId")
  .post(upload.single("img"), PeopleContoller.updatePeople)
  .get(PeopleContoller.getPeople)
  .delete(PeopleContoller.deletePeopel);
peopleRouter
  .route("/:peopleId/superheroes/:superheroesId")
  .put(HeroeMW.getHeroe, PeopleContoller.addPeopleToSuperheroes)
  .delete(PeopleContoller.deletePeoleToSuperheroes);

module.exports = peopleRouter;
