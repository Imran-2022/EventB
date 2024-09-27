const express =require('express');
const bcrypt = require('bcrypt');
const _=require('lodash');
const {User,validate} = require('../models/user');

const router = express.Router();
const newUser = async(req,res)=>{
    const {error}=validate(req.body);
    if(error)return res.status(400).send(error.details[0].message);
    
    let user =await User.findOne({email:req.body.email});
    if(user)return res.status(400).send('user already registered !');

    // user = new User({email:req.body.email,password:req.body.password});
    user = new User(_.pick(req.body,['email','password']));

    const solt=await bcrypt.genSolt(10);
    user.password=await bcrypt.hash(user.password,salt);

    const token=user.generateJWT();

    const result=await user.save();
    return res.status(201).send({
        token:token,
        user:_.pick(result,['_id','email'])
    });

}

router.route('/')
    .post(newUser)

router.route('/auth')
    .post()

module.exports=router;