const express = require('express');
const app = express();
const path = require('path');

// Set EJS as the view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Serve static files (CSS, JS, images)
app.use(express.static(path.join(__dirname, "public")));


// Render the EJS template
app.get('/', (req, res) => {
  res.render('index');  // Make sure 'index.ejs' exists in the 'views' folder
});

// Export the app for Vercel to handle requests
app.listen(3000, ()=> {
  console.log("hello")

})

module.exports = app;
