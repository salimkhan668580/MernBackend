const express = require('express')
const app = express()
const port = 3000
var cors = require('cors')


 
require('dotenv').config()
const bodyParser = require('body-parser');
 
app.use(cors())
// Middleware to parse JSON bodies
app.use(bodyParser.json());
const Razorpay = require('razorpay');
// Middleware to parse URL-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  
 
  res.send('Hello World!')
})




const instance = new Razorpay({
    key_id: process.env.RAZORPAY_ID_KEY,
    key_secret: process.env.RAZORPAY_SECRET_KEY,
});

app.post("/createOrder",async(req,res)=>{

  
  try {

    const options = {
        amount: 50000, // amount in smallest currency unit
        currency: "INR",
        receipt: "receipt_order_74394",
    };

    const order = await instance.orders.create(options);

    if (!order) return res.status(500).send("Some error occured");

    res.json(order);
} catch (error) {
    res.status(500).send(error);
}
});
 

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})