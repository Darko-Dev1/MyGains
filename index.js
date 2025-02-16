const express = require('express');
const app = express();
const path = require('path');
const mongoose = require("mongoose")

// Set EJS as the view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Serve static files (CSS, JS, images)
app.use(express.static(path.join(__dirname, "public")));


//konektirame so mongodB
const mongoURL = "mongodb://localhost:27017/mygains";

mongoose.connect(mongoURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,


})
.then(() => console.log("connected to mongodb"))
.catch(err => console.error("error: " + err))

app.use(express.json())

// Render the EJS template
app.get('/', (req, res) => {
  console.log('MongoDB Compass е поврзана со Express.js!');
  res.render('index');  // Make sure 'index.ejs' exists in the 'views' folder
});

// Export the app for Vercel to handle requests
app.listen(3000, ()=> {
  console.log("hello")

})

module.exports = app;
