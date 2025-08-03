const express = require("express")
const router = express.Router()
const UserSaved = require("../model/model")

router.get('/', (req, res) => {
    res.render('index');
});

router.post('/account', (req, res) => {

});

router.get("/register", (req, res) => {
    res.render("register")
})

router.post("/register", (req, res) => {
    const data = req.body
    console.log(data)
    const NewUser = new UserSaved({
        UserName: data,
        email: data
    })
})

router.get("/login", (req, res) => {
    res.render("login")
})

router.get('/aboutme', (req, res) => {
    res.render('aboutme');
});

router.get('/account', (req, res) => {
    res.render('account');
});

module.exports = router

