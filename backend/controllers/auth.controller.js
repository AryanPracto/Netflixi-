import emailValidator from 'email-validator'; 
import User from '../models/user.model.js'; 
import bcryptjs from "bcryptjs"
import { generateToken } from '../utils/generateToken.js';

export async function signup(req,res){
    try {
        const {name,email,password}=req.body;
    
        // check if this line is required ??
        if(!email || !name || !password){
            return res.status(400).json({success:false,message:"all fields are required"})
        }
    
        if (!emailValidator.validate(email)) {
            return res.status(400).json({success:false, message: 'Invalid email format.' });
        }
    
        if(password.length<6){
            return res.status(400).json({success:false,message:"password must be atleast 6 characters long"})
        }

        const salt=await bcryptjs.genSalt(10);
        const hashedPassword=await bcryptjs.hash(password,salt);

        const existingUser = await User.findOne({
            where: { email },  // Find user by email
        });
      
        if (existingUser) {
        return res.status(400).json({success:false,message: 'Email is already in use.' });
        }

        const newUser=await User.create({
            name:name,
            email:email,
            password:hashedPassword,
            image:"./profile.jpeg"
        })

        const token=generateToken(newUser.id);
        return res.status(201).json({success:true,message:"user created successfully",token,name})
    } catch (error) {
        console.log(error);
        res.status(500).json({success:false,message:"internal server error"})
    }


}

export async function login(req,res){
try {
        const {email,password}=req.body;
        if(!email || !password){
            return res.status(400).json({success:false,message:"all fields are required"})
        }
    
        const user=await User.findOne({where:{email}});
    
        if(!user)
        {
            return res.status(404).json({success:false,message:"user not found"});
        }
    
        const isPasswordCorrect= await bcryptjs.compare(password,user.password)
    
        if(!isPasswordCorrect){
            return res.status(404).json({success:false,message:"invalid password"})
        }
    
        const token=generateToken(user.id,res);

        let subId=-1;
        if(user.subscriptionId!=null){
            subId=user.subscriptionId
        }

        const existingUser = await User.findOne({
            where: { email },  // Find user by email
        });
        const name=existingUser.name;
    
        return res.status(200).json({success:true,message:"login successful",token,subId,name})
} catch (error) {
    console.log(error);
    return res.status(500).json({success:false,message:"internal server error"})
}
}