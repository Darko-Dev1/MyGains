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

router.post("/register", async (req, res) => {
    try {
        const data = req.body
        console.log(data)
        const NewUser = new UserSaved({
            UserName: data["UserName"],
            email: data["email"]
        })
        await NewUser.save(); // ✅ Save to MongoDB
    
        res.status(201).send("User saved");
    } catch {
        res.status(500).send("Server error");
    }
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

