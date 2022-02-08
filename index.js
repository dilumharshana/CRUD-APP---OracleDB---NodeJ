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

app.listen(8070);

app.get("/", (req, res) => res.end("Lets creata a table , try '/createTable'"));

app.get("/createTable", async (req, res) => {
  try {
    const con = await creareConnection();
    await con.execute("drop table users");
    const rs = await con.execute(create_table);
    res.end("Tabel created , now try ' /insertValues'");
  } catch (error) {
    console.log(error);
  }
});

app.get("/insertValues", async (req, res) => {
  try {
    const con = await creareConnection();
    const rs = await con.execute(insert_values);
    console.log(rs);
    res.end("Values added , now try ' /select_values'");
  } catch (error) {
    res.end(error);
  }
});

app.get("/select_values", async (req, res) => {
  try {
    const con = await creareConnection();
    const rs = await con.execute(select_values);
    console.log(rs);
    console.log("hey");
    res.end(() => rs.toString());
  } catch (error) {
    res.end(error);
  }
});

app.get("/delete_values", async (req, res) => {
  try {
    const con = await creareConnection();
    const rs = await con.execute(insert_values);
    res.end(() => rs.toString());
  } catch (error) {
    res.end(error);
  }
});

console.log("server running...");
