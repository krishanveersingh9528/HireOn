import express from "express";

import isAuthenticated from "../middlewares/isauthenticate.js";
import { applyjob, getApplicants, getAppliedjobs, updateStatus } from "../controllers/application.js";


const router = express.Router();

router.get("/apply/:id",  isAuthenticated,applyjob);
router.get("/get", isAuthenticated, getAppliedjobs); //user dekhega kitne jobs apply kiye
router.get("/:id/applicants", isAuthenticated,getApplicants);  //recruiter dekhega kitne user ne apply kiya
router.post("/status/:id/update", isAuthenticated,updateStatus)

export default router;