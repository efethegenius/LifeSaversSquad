const dbOperation = require("../dbFiles/dbOperation");

// const createNewVolunteer = async (req, res) => {
//   await dbOperation.createNewVolunteer(req.body);
//   res.json({ code: 1, msg: "success" });
// };
const createVolunteer = async (req, res) => {
  await dbOperation.createVolunteer(req.body);
  res.json({ code: 1, msg: "success" });
};
const createMessage = async (req, res) => {
  await dbOperation.createMessage(req.body);
  res.json({ code: 1, msg: "success" });
};
// const createNewMessage = async (req, res) => {
//   await dbOperation.createNewMessage(req.body);
//   res.json({ code: 1, msg: "success" });
// };

module.exports = {
  // createNewVolunteer,
  createVolunteer,
  // createNewMessage,
  createMessage,
};
