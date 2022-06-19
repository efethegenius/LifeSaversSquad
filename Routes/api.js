const express = require("express");
const router = express.Router();
const { validateToken } = require("../Middlewares/AuthMiddleware");
const cors = require("cors");
const { getAllVolunteers, getAllMessages } = require("../Controllers/api");
const dbOperation = require("../dbFiles/dbOperation");

router.get("/all-volunteers", validateToken, getAllVolunteers);
router.get("/all-messages", validateToken, getAllMessages);

module.exports = router;
