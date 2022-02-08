const oracleDB = require("oracledb");
require("dotenv").config();

const connectingData = {
  user: process.env.USER,
  password: process.env.PASSWORD,
  connectString: process.env.connectString,
};

//creating connection

const creareConnection = async () => {
  try {
    con = await oracleDB.getConnection(connectingData);
    return con;
  } catch (err) {
    console.log(err);
  }
};

module.exports = creareConnection;
