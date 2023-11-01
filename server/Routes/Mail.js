const router = require('express').Router();

const nodemailer = require('nodemailer');
const mailgen = require('mailgen');
//send mail
router.post('/', async (req, res) => {

    try {
        let testAccount = await nodemailer.createTestAccount();

        const { email, name } = req.body;
        let transporter =  nodemailer.createTransport({
            host: "smtp.ethereal.email",
            port: 587,
            secure: false,
            auth: {
                user: testAccount.user,
                pass: testAccount.pass,
            },
        });
        let MailGenerator = new mailgen({
            theme: "default",
            product: {
                name: "Mailgen",
                link: 'https://mailgen.js/'
            }
        })
        let response = {
            body: {
                name: name,
                intro: "Your bill has arrived!",
                /*table: {
                    data: [
                        cart.map((item) => {
                            return {
                                item: item.name,
                                quantity: item.quantity,
                                price: item.price
                            }
                        })

                    ]
                },*/
                outro: "Looking forward to do more business"
            }
        }
        let mail = MailGenerator.generate(response)

        let message = {
            from: testAccount.user,
            to: email,
            subject: "Orders",
            html: mail
        }

         await transporter.sendMail(message);

        res.status(201).json({
            msg: "You should receive an email"
        });

    } catch (err) {
        res.status(500).json(err);
    }
});
module.exports = router;