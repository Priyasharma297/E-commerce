const express=require("express");
const Order =require("../models/Order");
const {protect} =require("../middleware/authMiddleware");
const router=express.Router();

//get logged in users orders
router.get("/my-orders",protect,async(req,res)=>{
    try {
        const orders=await Order.find({user: req.user._id}).sort({
           createdAt:-1, 
        });
        res.json(orders);
    } catch (error) {
        console.error(error);
    res.status(500).json({ message: "Server Error" });
    }
});

//user can see full orders details
router.get("/:id",protect,async(req,res)=>{
    try {
        const order=await Order.findById(req.params.id).populate(
          "user",
          "name email"
        );
        if(!order){
            return res.status(400).json({message: "order not found"})
        }
        res.json(order);
    } catch (error) {
        console.error(error);
    res.status(500).json({ message: "Server Error" });
    }
});

module.exports=router;