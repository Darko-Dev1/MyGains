const express = require('express');
const app = express();
const path = require('path');
const mongoose = require("mongoose")


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

const mongoURL = "mongodb://localhost:27017/mygains";

mongoose.connect(mongoURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,

})
.then(() => console.log("connected to mongodb"))
.catch(err => console.error("error: " + err))

app.use(express.json())

app.get('/', (req, res) => {
  res.render('index'); 
});

app.get('/aboutme', (req, res) => {
  res.render('aboutme'); 
});

app.get('/account', (req, res) => {
  res.render('account'); 
});

app.listen(3000, ()=> {
  console.log("hello")

})

