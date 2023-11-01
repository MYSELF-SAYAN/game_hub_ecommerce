const router=require('express').Router();
const User=require('../Modals/user');
//Add to order
router.post("/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            res.status(404).json("User not found");
        } else {
            const order = req.body;
            if (!user.orders) {
                user.orders = []; // Initialize the orders array if it doesn't exist
            }
            user.orders.push(order);
            await user.save();
            res.status(200).json("The product has been added to order");
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

//Get all orders
router.get("/:id", async (req, res) => {
    try{
        const user = await User.findById(req.params.id);
        res.status(200).json(user.orders);
    }catch(err){
        res.status(500).json(err);
    }
});
module.exports = router;