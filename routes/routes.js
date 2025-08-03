const express = require("express")
const router = express.Router()
const UserSaved = require("../model/model")

router.get('/', (req, res) => {
    res.render('index');
});

router.put('/account', (req, res) => {

});
router.delete('/account', (req, res) => {

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
        await NewUser.save(); //Save to MongoDB

        res.status(201).send("User saved");
    } catch {
        res.status(500).send("Server error");
    }
})

router.get("/login", (req, res) => {
    res.render("login")
})

router.post("/login", async (req, res) => {
    console.log("helo")
    try {
        const data = req.body
        const user = await UserSaved.findOne({ email: data["email"] });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        console.log(user)
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
})

router.get('/aboutme', (req, res) => {
    res.render('aboutme');
});

router.get('/account', (req, res) => {
    res.render('account');
});

module.exports = router

