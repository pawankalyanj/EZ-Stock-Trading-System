import express from "express";
import  {subscribe} from "../controllers/newsLetterController.js"
import { verifyUser} from '../utils/verifytoken.js';

const router = express.Router();
console.log("inside router");

router.post('/subscribe',subscribe);

export default router;