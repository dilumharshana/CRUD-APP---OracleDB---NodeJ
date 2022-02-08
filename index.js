const express = require("express");
const app = express();

const creareConnection = require("./connection");
const {
  create_table,
  insert_values,
  select_values,
  delete_values,
  update_values,
} = require("./queries");

let con;

app.listen(8070);

//instructions
app.get("/", (req, res) => res.end("Lets creata a table , try '/createTable'"));

//create a table
app.get("/createTable", async (req, res) => {
  try {
    con = await creareConnection();
    await con.execute("drop table users");
    const rs = await con.execute(create_table);
    res.end("Tabel created , now try ' /insertValues'");
  } catch (error) {
    console.log(error);
  }
});

//instert values
app.get("/insertValues", async (req, res) => {
  try {
    const rs = await con.execute(
      "insert into users values(001 , 'john' , 'john@123ABCD')"
    );

    console.log(rs);
    res.end("Values added , now try ' /select_values'");
  } catch (error) {
    console.log(error);
  }
});

//retrieve values

app.get("/select_values", async (req, res) => {
  try {
    // const rs = await con.execute(select_values);
    const { rows } = await con.execute("select * from users");
    res.status(200).end(`
      STATUS: "VALUES ADDED SUCCESSFULLY !",
      user_ID: ${rows[0][0]},
      userName: ${rows[0][1]},
      password: ${rows[0][2]},
      ---------------------------
    
      now update a value ( user name ) , try  'update_values'`);
  } catch (error) {
    console.log(error);
  }
});

//update values

app.get("/update_values", async (req, res) => {
  try {
    await con.execute(update_values);
    const { rows } = await con.execute("select * from users");

    res.status(200).end(`
    STATUS: "VALUES UPDATED ( user_name ) SUCCESSFULLY !",
    user_ID: ${rows[0][0]},
    userName: ${rows[0][1]},
    password: ${rows[0][2]},
    ---------------------------
    
    now delete a value , try  'delete_values' `);
  } catch (error) {
    console.log(error);
  }
});

//delete values

app.get("/delete_values", async (req, res) => {
  try {
    await con.execute(delete_values);
    const rs = await con.execute("select * from users");
    res.end("value deleted succesfully!");
  } catch (error) {
    console.log(error);
  }
});

console.log("server running...");
