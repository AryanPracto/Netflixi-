import Movie from "../models/movie.model.js";
import Subscription from "../models/subscription.model.js";

export async function addMoviesToDB(req,res) {
    try {
        const {title,description,streamURL,thumbnail,category}=req.body;
    
        if(!title || !description || !streamURL || !thumbnail || !category){
            return res.status(400).json({success:false,message:"all fields are required"})
        }
    
        const existingMovie = await Movie.findOne({
            where: { title },  // Find user by email
        });
    
        if (existingMovie) {
            return res.status(400).json({success:false,message: 'movie title is already in use.' });
        }
    
        const newMovie=await Movie.create({
            title:title,
            description:description,
            streamURL:streamURL,
            thumbnail:thumbnail,
            category:category
        })
    
        return res.status(201).json({success:true,message:"movie added successfully"})
    } catch (error) {
        console.log(error);
        return res.status(500).json({success:false,message:"internal server error"})
    }
}

export async function addSubscription(req,res) {
    try {
        const {planName,fee,no_of_devices,duration}=req.body
        if(!planName || !fee || !no_of_devices || !duration){
            return res.status(400).json({success:false,message:"all fields are required"})
        }
    
        const existingPlan = await Subscription.findOne({
            where: { planName },  // Find user by email
        });
    
        if(existingPlan){
            return res.status(400).json({success:false,message: 'subscription already added' });
        }
    
        const newPlan=await Subscription.create({
            planName:planName,
            fee:fee,
            no_of_devices:no_of_devices,
            duration:duration
        })
    
        return res.status(201).json({success:true,message:"plan added successfully"})
    } catch (error) {
        return res.status(500).json("internal server error")
    }
}