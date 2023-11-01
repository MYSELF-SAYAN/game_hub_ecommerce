const router=require('express').Router();
require('dotenv').config();
const User=require('../Modals/user');
const stripe = require("stripe")(process.env.STRIPE_SECRET);
//GEt data from frontend and redirect to stripe payment gateway
router.post("/create-checkout-session", async (req, res) => {
    try{
        const {products} = req.body;


        const lineItems = products.map((product)=>({
            price_data:{
                currency:"inr",
                product_data:{
                    name:product.name,
                    
                },
                unit_amount:/*((product.price * 100)+((product.price * 100)*0.05))*/product.price*100,
            },
            quantity:product.quantity
        }));
    
        const session = await stripe.checkout.sessions.create({
            payment_method_types:["card"],
            line_items:lineItems,
            mode:"payment",
            success_url:"http://localhost:3000/cart",
            cancel_url:"http://localhost:3000/cart",
        });
        res.status(200).json({id:session.id});
        
    }catch(err){
        res.status(500).json(err);
    }
   
});
module.exports = router;