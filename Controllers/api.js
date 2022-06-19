const dbOperation = require("../dbFiles/dbOperation");

const getAllVolunteers = async (req, res) => {
  const result = await dbOperation.getAllVolunteers();
  res.json({ name: result.recordset });
};

const getAllMessages = async (req, res) => {
  const result = await dbOperation.getAllMessages();
  res.json({ name: result.recordset });
};

module.exports = {
  getAllVolunteers,
  getAllMessages,
};
