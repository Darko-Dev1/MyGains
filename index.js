const express = require('express');
const app = express();
const path = require('path');
const UserSaved = require("./model/model")

app.use(express.json())
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use("/", require("./routes/routes"))
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




app.listen(3000, ()=> {
  console.log("hello")

})

