const router = require('express').Router();
const User = require('../Modals/user');

// Add to cart
router.post("/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            res.status(404).json("User not found");
        } else {
            const cart = req.body;
            user.cart.push(cart);
            await user.save();

            res.status(200).json("The product has been added to cart");
        }
    } catch (err) {
        res.status(500).json(err);
    }
});
// Remove from cart
router.delete("/:userId/:cartItemId", async (req, res) => {
    try {
        const userId = req.params.userId;
        const cartItemId = req.params.cartItemId;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json("User not found");
        }
        const itemIndex = user.cart.findIndex(item => item._id == cartItemId);
        if (itemIndex === -1) {
            return res.status(404).json("cart item not found");
        }
        user.cart.splice(itemIndex, 1);
        await user.save();
        return res.status(200).json(user.cart);
    } catch (err) {
        return res.status(500).json(err);
    }
});
// Get cart
router.get("/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        res.status(200).json(user.cart);
    } catch (err) {
        res.status(500).json(err);
    }
});
//Increase quantity

router.post("/:userId/increase/:itemId", async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);

        if (!user) {
            return res.status(404).json("User not found");
        }

        const itemId = req.params.itemId;


        const item = user.cart.find(item => item.id === itemId);

        if (!item) {
            return res.status(404).json("Item not found in the user's cart");
        }

        item.quantity += 1;
        await user.save();

        res.status(200).json(user.cart);
    } catch (err) {
        res.status(500).json(err);
    }
});

//Decrese quantity

router.post("/:userId/decrease/:itemId", async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);

        if (!user) {
            return res.status(404).json("User not found");
        }

        const itemId = req.params.itemId;


        const item = user.cart.find(item => item.id === itemId);

        if (!item) {
            return res.status(404).json("Item not found in the user's cart");
        }


        item.quantity -= 1;
        await user.save();

        res.status(200).json(user.cart);
    } catch (err) {
        res.status(500).json(err);
    }
});
// Empty cart

router.post("/:userId/empty", async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);

        if (!user) {
            return res.status(404).json("User not found");
        }

        user.cart = [];
        await user.save();

        res.status(200).json(user.cart);
    } catch (err) {
        res.status(500).json(err);
    }
});
module.exports = router;