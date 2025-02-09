import express from "express"
import {addMoviesToDB,addSubscription} from '../controllers/add.controller.js'

const router=express.Router();

router.post("/movie",addMoviesToDB)
router.post("/subscription",addSubscription)

export default router;