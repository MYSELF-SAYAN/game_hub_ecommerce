const router = require('express').Router();
const User = require('../Modals/user');

// Add to wishlist
router.post("/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            res.status(404).json("User not found");
        } else {
            const wishlist = req.body;
            user.wishlist.push(wishlist);
            await user.save();
            res.status(200).json("The product has been added to wishlist");
        }

    } catch (err) {
        res.status(500).json(err);
    }
});
// Remove from wishlist
router.delete("/:userId/:wishlistItemId", async (req, res) => {
    try {
        const userId = req.params.userId;
        const wishlistItemId = req.params.wishlistItemId;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json("User not found");
        }
        const itemIndex = user.wishlist.findIndex(item => item._id == wishlistItemId);
        if (itemIndex === -1) {
            return res.status(404).json("Wishlist item not found");
        }
        user.wishlist.splice(itemIndex, 1);
        await user.save();
        return res.status(200).json("The product has been removed from wishlist");
    } catch (err) {
        return res.status(500).json(err);
    }
});

// Get wishlist
router.get("/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        res.status(200).json(user.wishlist);
    } catch (err) {
        res.status(500).json(err);
    }
});



module.exports = router;