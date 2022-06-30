const config = require("./dbConfig");
const sql = require("mssql");
let mysql = require("mysql2");
const { sign } = require("jsonwebtoken");
const { createPool } = require("mysql2");

const pool = createPool({
  host: "195.179.237.162",
  user: "u526753639_root",
  password: "Samjeffi.015",
  database: "u526753639_lssquad",
  connectionLimit: 10,
});

// const pool = createPool({
//   host: "localhost",
//   user: "root",
//   password: "samjeffi015",
//   database: "lifesaverssquaddb",
//   connectionLimit: 10,
// });

// const pool = createPool({
//   host: "us-cdbr-east-05.cleardb.net",
//   user: "bd1edf92834177",
//   password: "09db9dbd",
//   database: "heroku_33f8664d1651bdc",
//   connectionLimit: 10,
// });

const createVolunteer = async (volunteer) => {
  try {
    let sql = `call sp_NewVolunteer ('${volunteer.firstName}', '${volunteer.lastName}', '${volunteer.email}', '${volunteer.number}','${volunteer.bestTime}','${volunteer.street}','${volunteer.city}','${volunteer.state}','${volunteer.zip}','${volunteer.questionOne}','${volunteer.questionTwo}','${volunteer.questionThree}','${volunteer.comments}')`;
    pool.query(sql, function (err, result, fields) {
      if (err) console.log(err);
    });
    console.log("Connected!");
  } catch (error) {
    console.log(error);
  }
};

const createMessage = async (message) => {
  try {
    let sql = `call sp_NewMessage ('${message.name}', '${message.email}', '${message.messages}')`;
    pool.query(sql, function (err, result, fields) {
      if (err) console.log(err);
    });
    console.log("Connected!");
  } catch (error) {
    console.log(error);
  }
};
const updateTrainee = async (trainee) => {
  try {
    for (let i = 0; i <= trainee.selectedFlatRows.length - 1; i++) {
      let sql = `update tbl_volunteers set isTrained = 1 where id =  '${trainee.selectedFlatRows[i].id}'`;
      pool.query(sql, function (err, result, fields) {
        if (err) console.log(err);
      });
    }

    console.log("Connected!");
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  createMessage,
  createVolunteer,
  updateTrainee,
  // getLogin,
  pool,
};
