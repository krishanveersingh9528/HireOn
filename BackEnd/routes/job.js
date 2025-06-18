import express from "express";
import isAuthenticated from "../middlewares/isauthenticate.js";
import { getadminJobs, getAlljobs, getJobbyid, PostJob } from "../controllers/job.js";

const router = express.Router();

router.post("/post",isAuthenticated,PostJob);
router.get("/get",getAlljobs);
router.get("/getadminjobs",isAuthenticated,getadminJobs);
router.get("/get/:id",isAuthenticated,getJobbyid);


export default router;