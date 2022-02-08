const oracleDB = require("oracledb");
require("dotenv").config();

const connectingData = {
  name: process.env.NAME,
  password: process.env.PASSWORD,
  connectString: process.env.connectString,
};

//creating connection

let con = null;

const creareConnection = async () => {
  try {
    con = await oracleDB.getConnection(connectingData);
    console.log("connected to DB");
  } catch (err) {
    console.log(err);
  }
};

creareConnection();

module.exports = con;
