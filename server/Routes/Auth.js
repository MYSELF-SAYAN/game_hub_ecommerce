const router = require("express").Router();
const User = require("../Modals/user");

// Register
router.post("/register", async (req, res) => {
    try {
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
        });
        const user = await newUser.save();
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Login
router.post("/login", async (req, res) => {
    try {
        const foundUser = await User.findOne({ email: req.body.email });

        if (!foundUser) {
            res.status(404).json("User not found");
        } else {
            if (foundUser.password !== req.body.password) {
                res.status(400).json("Wrong password");
            } else {
                res.status(200).json(foundUser);
            }
        }
    } catch (err) {
        res.status(500).json(err);
    }
});
//update user
router.put("/:id", async (req, res) => {
   
        try {
            const updatedUser = await User.findByIdAndUpdate(
                req.params.id,
                {
                    $set: req.body,
                },
                { new: true }
            );
            res.status(200).json(updatedUser);
        } catch (err) {
            res.status(500).json(err);
        }
});
module.exports = router;
