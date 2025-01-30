const express = require('express');
const app = express();
const path = require('path');

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Tell Express where to find the views (EJS templates)

app.use(express.static('public'))

// Serve static files from the 'public' directory


// Render the EJS template
app.get('/', (req, res) => {
  res.render('index');  // Make sure 'index.ejs' exists in the 'views' folder
});

// Export the app for Vercel to handle requests
app.listen(3000, ()=> {
  console.log("hello")

})
module.exports = app;
