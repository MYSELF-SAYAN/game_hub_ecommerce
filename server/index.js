require('dotenv').config();

const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
const authRoute = require("./Routes/Auth")
const wishlistRoute = require("./Routes/Wishlist")
const orderRoute = require("./Routes/Order")
const cartRoute=require("./Routes/Cart")
const paymentRoute=require("./Routes/Payment")
const mailRoute = require("./Routes/Mail")
app.use(express.json());
mongoose
    .connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((err) => console.log(err));
app.use("/api/auth", authRoute);
app.use("/api/wishlist", wishlistRoute);
app.use("/api/order", orderRoute);
app.use("/api/cart",cartRoute);
app.use("/api/payment",paymentRoute);
app.use("/api/mail", mailRoute);
app.listen(5000, () => {
    console.log("Backend is running on port 5000.");
});
