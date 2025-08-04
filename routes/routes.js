const express = require("express")
const router = express.Router()
const UserSaved = require("../model/model")
const savedExecise = require("../model/modelExercise")

router.get('/', (req, res) => {
    res.render('index');
});

router.get('/api/user/:id', async (req, res) => {
    console.log(parseInt(req.params.id))
    const docs = await savedExecise.find();
    const docAtIndex = docs[parseInt(req.params.id)];
    res.json(docAtIndex)
});

router.get('/api/user', async (req, res) => {
    const docs = await savedExecise.find();
    res.json(docs)
});


router.put('/api/user/:id', async (req, res) => {
    console.log(req.body)
    const savedExercisesAcc = req.body
    console.log(parseInt(req.params.id))
    const docs = await savedExecise.find();
    const docAtIndex = docs[parseInt(req.params.id)];
    const doc = await savedExecise.findOne({ userName: docAtIndex.userName });
    console.log(doc)
    doc.exercisesNotes.push({
        name: "Push-up",
        note: "Did 20 reps"
    });

    await doc.save();

});

router.post('/', async (req, res) => {
    console.log(req.body)
    const savedExercisesAcc = req.body
    try {

        const count = await savedExecise.countDocuments();
        console.log("Number of documents:", count);
        const newSave = new savedExecise({
            userName: savedExercisesAcc.userName,
            exercisesNotes: savedExercisesAcc.Exercises,
            id: count
        })
        // const exerciseSaved = newSave.findOne({ userName: savedExercisesAcc.userName })


        await newSave.save()

        res.status(201).send("User saved");
    } catch {
        res.status(500).send("Server error");
    }


});


router.put('/account', (req, res) => {

});

router.delete('/account', (req, res) => {

});
let loginFailMSG = ""
router.get("/register", (req, res) => {
    res.render("register", { msg: loginFailMSG })
})

router.post("/register", async (req, res) => {
    try {
        const data = req.body
        const NewUser = new UserSaved({
            UserName: data["UserName"],
            email: data["email"]
        })
        await NewUser.save(); //Save to MongoDB

        res.status(201).send("User saved");
    } catch {
        loginFailMSG = "Account already created with these credentials"
        res.status(500).send("Server error");
    }
})

router.get("/login", (req, res) => {
    res.render("login", { msg: loginFailMSG })
})


router.post("/login", async (req, res) => {
    try {
        const data = req.body
        const user = await UserSaved.findOne({ email: data["email"] });
        if (!user) {
            loginFailMSG = "There is no account with these credentials"
            return res.status(404).json({ message: "User not found" });
        }
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

