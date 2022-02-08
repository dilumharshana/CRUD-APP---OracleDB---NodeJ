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

app.get("/", (req, res) => res.end("Lets creata a table , try '/createTable'"));

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

app.get("/insertValues", async (req, res) => {
  try {
    // const rs = await con.execute(insert_values);
    const rs = await con.execute(
      "insert into users values(001 , 'john' , 'john@123ABCD')"
    );

    console.log(rs);
    res.end("Values added , now try ' /select_values'");
  } catch (error) {
    res.end(error.toString);
  }
});

app.get("/select_values", async (req, res) => {
  try {
    // const rs = await con.execute(select_values);
    const rs = await con.execute("select * from users");
    console.log(rs);
    res.end(() => rs.toString());
  } catch (error) {
    console.log(error);
  }
});

app.get("/update_values", async (req, res) => {
  try {
    await con.execute(update_values);
    const rs = await con.execute("select * from users");
    res.end("value deleted succesfully!");
  } catch (error) {
    console.log(error);
  }
});

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
