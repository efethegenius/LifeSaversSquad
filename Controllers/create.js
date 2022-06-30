const dbOperation = require("../dbFiles/dbOperation");
const createVolunteer = async (req, res) => {
  await dbOperation.createVolunteer(req.body);
  res.json({ code: 1, msg: "success" });
};
const createMessage = async (req, res) => {
  await dbOperation.createMessage(req.body);
  res.json({ code: 1, msg: "success" });
};
const updateTrainee = async (req, res) => {
  await dbOperation.updateTrainee(req.body);
  res.json({ code: 1, msg: "success" });
};
const updateTraining = async (req, res) => {
  await dbOperation.updateTraining(req.body);
  res.json({ code: 1, msg: "success" });
};

module.exports = {
  createVolunteer,
  createMessage,
  updateTrainee,
  updateTraining,
};
