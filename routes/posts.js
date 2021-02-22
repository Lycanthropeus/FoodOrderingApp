const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

router.get('/',async(req,res)=>{
    try
    {
        var allPosts = await Order.find();
        res.json(allPosts);
    }
    catch(err){
        res.json({message: err});
    }
});

router.get('/:orderId',async(req,res)=>{
    try
    {
        var current_order = await Order.findById(req.params.orderId);
        res.json(current_order);
    }
    catch(err)
    {
        res.json({"Unable to get post": err});
    }  
});


router.post('/',async(req,res)=>{

    const firstOrder = new Order({
        OrderedBy : req.body.OrderedBy,
        FoodOrder : req.body.FoodOrder,
    });
    try {
        var savedOrder = await firstOrder.save();
        res.json(savedOrder);
    }
    catch(err) {
        res.json({"Unable to create post" : err});
    }
});

router.delete('/:postId',async(req,res)=>{
    try {
      var status  = await Order.remove({_id: req.params.postId});
      res.json({"Successful deletion" : status});
    } 
    catch(err){
      res.json({"Post does not exist/May have already been deleted": err});
    }
});



module.exports = router; 