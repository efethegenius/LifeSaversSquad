const express = require("express");
const cors = require("cors");
const dbOperation = require("./dbFiles/dbOperation");
const app = express();
let mysql = require("mysql2");
const { sign } = require("jsonwebtoken");
const router = express.Router();
require("dotenv").config();
const { createPool } = require("mysql2");

const pool = createPool({
  host: "195.179.237.162",
  user: "u526753639_root",
  password: "Samjeffi.015",
  database: "u526753639_lssquad",
  connectionLimit: 10,
});

let port = process.env.PORT || 5000;

const api = require("./Routes/api");
const create = require("./Routes/create");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204,
  })
);

app.use("/api", api);
app.use("/create", create);

//Login-------------------------------------------------------------------------------------------------------------------------------
router.post("/user_login", async (req, res) => {
  try {
    // await dbOperation.con.connect(function (err) {
    let sql = `SELECT * FROM tbl_admins where SignOnName = '${req.body.SignOnName}' and UserPassword = sha1('${req.body.UserPassword}')`;
    pool.query(sql, function (err, result, fields) {
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
    console.log("Connected!");
  } catch (error) {
    console.log(error);
  }
});

// getting volunteers--------------------------------------------------------------
app.get("/full-volunteer", async (req, res) => {
  try {
    // await dbOperation.con.connect(function (err) {
    let sql = `select * from vw_volunteers Order by id desc`;
    pool.query(sql, function (err, result, fields) {
      if (err) console.log(err);
      // console.log(result);
      // return result;
      res.json({ name: result });
    });
    // if (err) throw err;
    console.log("Connected!");
    // });
  } catch (error) {
    console.log(error);
  }
});

app.get("/full-messages", async (req, res) => {
  try {
    // await dbOperation.con.connect(function (err) {
    let sql = `select * from vw_messages Order by id desc`;
    pool.query(sql, function (err, result, fields) {
      if (err) console.log(err);
      res.json({ name: result });
    });
    // if (err) throw err;
    console.log("Connected!");
    // });
    // dbOperation.con.end();
  } catch (error) {
    console.log(error);
  }
});

//-------------------------------------------------------------------------------

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

module.exports = { pool };
