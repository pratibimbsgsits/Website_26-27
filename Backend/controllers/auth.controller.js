import User from './../models/user.model.js';
import jwt from 'jsonwebtoken';


export const google = async(req,res,next)=>{
    try{
        const user = await User.findOne({email : req.body.email})
        if(user){
              const token = jwt.sign({id : user._id},process.env.JWT_SECRET);
              const {enrollment:enro,...rest}=user._doc;
              res.cookie('access_token',token,{httpOnly :true})
              res.status(200).json(rest);
              
        }else{

            if(req.body.enrollment==false){
                return next(errorHandler(404,'User not found'));
            }
            console.log(req.body);
            
            let enroll = req.body.enrollment;
            let branch =enroll.slice(4, 6).toUpperCase();
            let batch = enroll.slice(6,8);

             const newUser = new User({name : req.body.name,email : req.body.email,avatar : req.body.photo,batch,branch,enrollment : enroll});
             await newUser.save();


             const token=jwt.sign({id:newUser._id},process.env.JWT_SECRET);
             const {enrollment:enro,...rest}=newUser._doc;
             res.cookie('access_token',token,{httpOnly:true})
             .status(200)
             .json(rest);
        }
    }catch(error){
        next(error);
    }
}


export const signOut = async(req,res,next)=>{
    try{
       res.clearCookie('access_token')
       res.status(200).json('Sign out successfully');
    }catch(error){
       next(error);
    }
}