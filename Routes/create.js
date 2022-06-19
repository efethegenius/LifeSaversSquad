const express = require("express");
const router = express.Router();
// const { validateToken } = require("../Middlewares/AuthMiddleware");
const cors = require("cors");

const dbOperation = require("../dbFiles/dbOperation");
const { createVolunteer, createMessage } = require("../Controllers/create");

// router.post("/new_volunteer", createNewVolunteer);
router.post("/brand_volunteer", createVolunteer);
// router.post("/new_message", createNewMessage);
router.post("/brand_message", createMessage);

module.exports = router;
