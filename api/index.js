const express = require('express');
const app = express();
const path = require('path');

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Tell Express where to find the views (EJS templates)
app.set('views', path.join(__dirname, '../views'));

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, '../public')));

// Render the EJS template
app.get('/', (req, res) => {
  res.render('index');  // Make sure 'index.ejs' exists in the 'views' folder
});

// Export the app for Vercel to handle requests
module.exports = app;
