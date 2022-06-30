const express = require("express");
const router = express.Router();
const cors = require("cors");

const dbOperation = require("../dbFiles/dbOperation");
const {
  createVolunteer,
  createMessage,
  updateTrainee,
  updateTraining,
} = require("../Controllers/create");

router.post("/brand_volunteer", createVolunteer);
router.post("/brand_message", createMessage);
router.post("/update_trainee", updateTrainee);
router.post("/update_training", updateTraining);

module.exports = router;
