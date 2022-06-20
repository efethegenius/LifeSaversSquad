const express = require("express");
const cors = require("cors");
const dbOperation = require("./dbFiles/dbOperation");
const app = express();
let mysql = require("mysql2");
const { sign } = require("jsonwebtoken");
require("dotenv").config();

let port = process.env.PORT || 5000;

const api = require("./Routes/api");
const create = require("./Routes/create");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use("/api", api);
app.use("/create", create);

// let con = mysql.createConnection({
//   host: "195.179.237.162",
//   user: "u526753639_root",
//   password: "Samjeffi.015",
//   database: "u526753639_lssquad",
// });
let con = mysql.createConnection({
  host: "Localhost",
  user: "root",
  password: "samjeffi015",
  database: "lifesaverssquaddb",
});

con.connect((err) => {
  if (err) return console.log(err.stack);

  console.log("remote connection successfull");
});

//Login-------------------------------------------------------------------------------
app.post("/user_login", async (req, res) => {
  try {
    // await con.connect(function (err) {
    //   if (err) throw err;
    //   console.log("Connected!");
    let sql = `SELECT * FROM tbl_admins where SignOnName = '${req.body.SignOnName}' and UserPassword = sha1('${req.body.UserPassword}')`;
    con.query(sql, function (err, result) {
      if (err) console.log(err);
      if (result[0] === undefined) {
        return { error: "Username or Password is incorrect" };
      }
      console.log(result);
      const accessToken = sign(
        {
          username: result[0].SignOnName,
          id: result[0].id,
        },
        "7JUU39959Eohyue"
      );
      res.json(accessToken);
    });
    // });
  } catch (error) {
    console.log(error);
  }
});

// getting volunteers--------------------------------------------------------------
app.get("/full-volunteer", async (req, res) => {
  try {
    // await con.connect(function (err) {
    //   if (err) throw err;
    //   console.log("Connected!");
    let sql = `select * from vw_volunteers Order by id desc`;
    con.query(sql, function (err, result) {
      if (err) console.log(err);
      // console.log(result);
      // return result;
      res.json({ name: result });
    });
    // });
  } catch (error) {
    console.log(error);
  }
});

app.get("/full-messages", async (req, res) => {
  try {
    // await con.connect(function (err) {
    //   if (err) throw err;
    //   console.log("Connected!");
    let sql = `select * from vw_messages Order by id desc`;
    con.query(sql, function (err, result) {
      if (err) console.log(err);
      res.json({ name: result });
    });
    // });
  } catch (error) {
    console.log(error);
  }
});

//-------------------------------------------------------------------------------

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
