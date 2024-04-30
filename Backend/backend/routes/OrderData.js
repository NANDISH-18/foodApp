const express = require('express');
const router = express.Router();
const Order = require('../models/Orders');

router.post('/orderData', async (req,res) => {
    let data = req.body.order_data
    await data.splice(0,0,{order_date: req.body.order_date});

    // If email already ordered then append else create with first order
    let eId = await Order.find({'email': req.body.email});
    console.log(eId);
    if(eId.length === 0){
        //  Create
        try {
            
            await Order.create({
                email: req.body.email,
                order_data: [data]
            }).then(()=> {
                res.json({success: true});
            })

        } catch (error) {
            console.log(error.message);
            res.send("Server Error", error.message)
        }
    }else{
        try {
            await Order.findOneAndUpdate({email: req.body.email},{
                $push: {order_data: data}
            }).then(()=> {
                res.json({success: true});
            })

        } catch (error) {
            res.send("Server Error", error.message)
        }
    }


})

router.post('/myOrderData', async (req,res) => {
    try {
        console.log(req.body.email)
        let eId = await Order.findOne({ 'email': req.body.email })
        console.log(eId)
        res.json({orderData:eId})
    } catch (error) {
        res.send("Error",error.message)
    }
    
})



module.exports = router;
