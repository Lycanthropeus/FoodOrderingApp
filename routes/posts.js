const express = require('express');
const router = express.Router();
const Order = require('../models/Order');


router.get('/posts',async(req,res)=>{
    //const post = await Order.find({PaymentStatus : req.params.paymentstatus});
    //var post = await Order.find({OrderedBy : req.query.q});
    var post = await Order.find();
    res.json(post);

    // if(req.query == null)
    // {
    //     res.send({message:yes});
    // }
    // else
    // {
    //     res.send({message: someshit});
    // }
    /*
    if(req.query == null)
    {
        try
        {
            var allPosts = await Order.find();
            res.json(allPosts);
        }
        catch(err){
            res.json({message: err});
        }
    
    }
    
    else
    {
        res.send({message : "some error"});
    }*/
    /*
    else
    {
        if(req.query.paymentstatus != null)
        {
            try
            {
                var allPosts = await Order.find({PaymentStatus : req.query.paymentstatus});
            }
            catch(err)
            {
                res.json({message: err});
            }
        }
        else (req.query.orderedby != null)
        {
            try
            {
                var allPosts = await Order.find({OrderedBy : req.query.orderedby});
            }
            catch(err)
            {
                res.json({message: err});
            }
        }        
    }*/
});


router.get('/posts/:orderId',async(req,res)=>{
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


router.get('/posts',async(req,res)=>{
    try
    {
        //console.logreq.query.q);
        //var post = await Order.find({PaymentStatus : req.query.paymentstatus});
        var post = await Order.find();
        //var post = await Order.find({ $and: [{PaymentStatus:req.query.paymentstatus},{OrderedBy:req.query.orderedby}]
       // });
        //res.json(post);
        res.send({message: req.query}); 
    }
    catch(err)
    {
        res.json({message : err});
    }
});


router.post('/posts',async(req,res)=>{

    const firstOrder = new Order({
        OrderedBy : req.body.OrderedBy,
        FoodOrder : req.body.FoodOrder,
        PaymentStatus : req.body.PaymentStatus,
    });
    try {
        var savedOrder = await firstOrder.save();
        res.json(savedOrder);
    }
    catch(err) {
        res.json({"Unable to create post" : err});
    }
});

router.delete('/posts/:orderId',async(req,res)=>{
    try {
      var status  = await Order.remove({_id: req.params.orderId});
      res.json({"Successful deletion" : status});
    } 
    catch(err){
      res.json({"Post does not exist/May have already been deleted": err});
    }
});

router.patch('/posts/:orderId',async(req,res)=>{
    try{
        const updatedPost = await Order.updateOne(
                {_id : req.params.orderId},
            {
                $set : 
                {
                    FoodOrder : req.body.FoodOrder,
                    PaymentStatus: req.body.PaymentStatus 
                }
            }
        );
        res.json(updatedPost);
    }
    catch(err){
        res.json({"Could not update post" : err});
    }
});

module.exports = router; 