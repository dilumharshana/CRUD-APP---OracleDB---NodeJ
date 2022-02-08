const express = require("express");
const app = express();

app.listen(8070);

app.get("/", (req, res) => res.end("hello from backend !"));

console.log("server running...");
