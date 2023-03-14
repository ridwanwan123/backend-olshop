const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose")
const register = require("./routes/register")
const products = require("./products");

const app = express();

//db mongo
require("dotenv").config()


app.use(express.json());
app.use(cors());

app.use("/api/register", register)

app.get("/", (req, res) => {
  res.send("Welcome our to online shop API...");
});

app.get("/products", (req, res) => {
  res.send(products);
});

const port = process.env.PORT || 5000;
const uri = process.env.DB_URI;

app.listen(port, console.log(`Server running on port ${port}`));

mongoose.connect(uri, {
    maxPoolSize:50,
    wtimeoutMS:2500,
    useNewUrlParser:true
})
  .then(() => console.log("MongDB connection succesfully..."))
  .catch((error) => console.log("MongDB connection failed", error.message));