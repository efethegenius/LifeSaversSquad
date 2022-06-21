const config = require("./dbConfig");
const sql = require("mssql");
let mysql = require("mysql2");
const { sign } = require("jsonwebtoken");

// let con = mysql.createConnection({
//   host: "195.179.237.162",
//   user: "u526753639_root",
//   password: "Samjeffi.015",
//   database: "u526753639_lssquad",
// });

let con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "samjeffi015",
  database: "lifesaverssquaddb",
});

// con.connect((err) => {
//   if (err) return console.log(err.stack);

//   console.log("remote connection successfull");
// });

const createVolunteer = async (volunteer) => {
  try {
    await con.connect(function (err) {
      if (err) throw err;
      console.log("Connected!");
      let sql = `call sp_NewVolunteer ('${volunteer.firstName}', '${volunteer.lastName}', '${volunteer.email}', '${volunteer.number}','${volunteer.bestTime}','${volunteer.street}','${volunteer.city}','${volunteer.state}','${volunteer.zip}','${volunteer.questionOne}','${volunteer.questionTwo}','${volunteer.questionThree}','${volunteer.comments}')`;
      con.query(sql, function (err, result) {
        if (err) console.log(err);
      });
    });
    // con.end();
  } catch (error) {
    console.log(error);
  }
};

const createMessage = async (message) => {
  try {
    await con.connect(function (err) {
      if (err) throw err;
      console.log("Connected!");
      let sql = `call sp_NewMessage ('${message.name}', '${message.email}', '${message.messages}')`;
      con.query(sql, function (err, result) {
        if (err) console.log(err);
        // console.log("Table created");
      });
    });
    // con.end();
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  createMessage,
  createVolunteer,
  con,
};
