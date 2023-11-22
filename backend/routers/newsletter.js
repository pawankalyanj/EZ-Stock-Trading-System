import express from "express";
import  newsletterController from "../controllers/newsLetterController";
import router from "./auth";

 const router = express.Router();

 router.post('/subscribe',newsletterController);

 export default router;