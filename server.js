const express = require("express");
const cors = require("cors");
const dbOperation = require("./dbFiles/dbOperation");
const app = express();
let mysql = require("mysql2");
const { sign } = require("jsonwebtoken");
const router = express.Router();
require("dotenv").config();

let port = process.env.PORT || 5000;

const api = require("./Routes/api");
const create = require("./Routes/create");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use("/api", api);
app.use("/create", create);

//Login-------------------------------------------------------------------------------------------------------------------------------
app.post("/user_login", async (req, res) => {
  try {
    // await dbOperation.con.connect(function (err) {
    let sql = `SELECT * FROM tbl_admins where SignOnName = '${req.body.SignOnName}' and UserPassword = sha1('${req.body.UserPassword}')`;
    dbOperation.pool.query(sql, function (err, result, fields) {
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

// app.post("/user_login", async (req, res) => {
//   const result = await dbOperation.getLogin(req.body);
//   res.json(result);
// });

// getting volunteers--------------------------------------------------------------
app.get("/full-volunteer", async (req, res) => {
  try {
    // await dbOperation.con.connect(function (err) {
    let sql = `select * from vw_volunteers where isTrained = 1 Order by id desc`;
    dbOperation.pool.query(sql, function (err, result, fields) {
      if (err) console.log(err);
      // console.log(result);
      // return result;
      res.json(result);
    });
    // if (err) throw err;
    console.log("Connected!");
    // });
  } catch (error) {
    console.log(error);
  }
});
app.get("/untrained-volunteer", async (req, res) => {
  try {
    // await dbOperation.con.connect(function (err) {
    let sql = `select * from vw_volunteers where isTrained = 0 Order by id desc`;
    dbOperation.pool.query(sql, function (err, result, fields) {
      if (err) console.log(err);
      // console.log(result);
      // return result;
      res.json(result);
    });
    // if (err) throw err;
    console.log("Connected!");
    // });
  } catch (error) {
    console.log(error);
  }
});
app.get("/training-volunteer", async (req, res) => {
  try {
    let sql = `select * from vw_volunteers where isTrained = 2 Order by id desc`;
    dbOperation.pool.query(sql, function (err, result, fields) {
      if (err) console.log(err);
      res.json(result);
    });
    console.log("Connected!");
  } catch (error) {
    console.log(error);
  }
});

app.get("/full-messages", async (req, res) => {
  try {
    // await dbOperation.con.connect(function (err) {
    let sql = `select * from vw_messages Order by id desc`;
    dbOperation.pool.query(sql, function (err, result, fields) {
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
