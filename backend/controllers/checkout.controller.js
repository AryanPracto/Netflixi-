import Stripe from "stripe";
import User from "../models/user.model.js";
const stripe=new Stripe('sk_test_51QpnOgGdXFymKfnwWe70BRDuKquttNfRVMTQLEXJVXDQnkthxszeuhWV7Fq8Dn1d4Gkqn37etPDQ0hAmDUVZ8C3g00NayZ0WZy')

export async function handleCheckout(req,res) {
    try {
        let amt=0
        let sub_id;
        const {email,plan}=req.body;
        if(plan==='Basic'){
            amt=149
            sub_id=1
        }
        else if(plan==="Advanced"){
            amt=349
            sub_id=2
        }
        else{
            amt=549
            sub_id=3
        }

        const user=await User.findOne({where:{email}});
        if(!user){
            res.status(404).json({message:"please enter a valid email"})
        }
        const session=await stripe.checkout.sessions.create({
            line_items:[
                {
                    price_data:{
                        currency:"inr",
                        product_data:{
                            name:plan,
                        },
                        unit_amount:amt*100
                    },
                    quantity:1
                }
            ],
            mode:'payment',
            success_url:'http://localhost:5173/success',
            cancel_url:'http://localhost:5173/cancel'
        })

        user.isASubscriber=true
        user.subscriptionId=sub_id
        await user.update({ 
            isASubscriber: true, 
            subscriptionId: sub_id 
        });


        return res.json({ url: session.url });
    } catch (error) {
        res.status(500).json("internal server error")
    }
}