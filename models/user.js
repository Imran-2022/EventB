const jwt=require('jsonwebtoken');
const Joi =require('joi');

const {Schema,model} =require('mongoose');

const userSchema = Schema({
    email:{
        type:String,
        required:true,
        unique:true,
        minlenght:5,
        maxlength:255,
    },
    password:{
        type:String,
        required:true,
        minlenght:5,
        maxlength:1024,
    }
});


userSchema.methods.generateJWT=function(){
    const token=jwt.sign({id:this._id,email:this.email},process.env.JWT_SECRET_KEY,{
        expiresIn:"3h"
    });

    return token;
}


const validateUser=user=>{
    const schema=Joi.object({
        email : Joi.string().min(5).max(255).required().email(),
        password:Joi.string().min(5).max(255).required()
    
    });
   return schema.vaidate(user);
}


module.exports.User=model('User',userSchema);
module.exports.vaidate=validateUser;