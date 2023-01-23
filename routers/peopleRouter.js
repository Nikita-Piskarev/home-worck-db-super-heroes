const peopleRouter = require("express").Router();
const multer = require("multer");
const path = require("path");

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
  .get(PeopleContoller.getPeople);

module.exports = peopleRouter;
