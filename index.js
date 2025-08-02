const express = require('express');
const app = express();
const path = require('path');
const UserSaved = require("./model/model")

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

const mongoose = require("mongoose")



const DB = async () => {
    try {
        const res = await mongoose.connect(mongoURL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,

        })
        return res
    } catch {
        console.log("database is not connecting")
    }
  }

app.use(express.json())

app.get('/', (req, res) => {
  res.render('index'); 
});

app.post('/account', (req, res) => {
  const data = req.body
  console.log(data)
  const NewUser = new UserSaved({
    UserName: req.body
  })

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

