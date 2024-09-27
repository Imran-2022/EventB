const express=require('express');
const {Event}=require('../models/event');
const authorize=require('../middlewares/authorize');
const router=express.Router();


const newEvent=async(req,res)=>{
    const event=new Event(req.body);
    try{
        await event.save();
        return res.status(201).send("Event crated");
    }catch(err){
        return res.status(400).send("Sorry! want wrong");
    }
}


const eventList = async(req,res)=>{
    const events=await Event.find({userId:req.user.id}).sort({date:-1});
    res.send(events);

}

const allEvents=async(req,res)=>{
    const events=await Event.find();
    res.send(events);
}

router.route('/')
    .get(authorize,eventList)
    .post(authorize,newEvent)

router.route('/all')
    .get(allEvents)

module.exports=router;