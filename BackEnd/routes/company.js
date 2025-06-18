import express from "express";
import { singleUpload } from "../middlewares/multer.js";
import isAuthenticated from "../middlewares/isauthenticate.js";
import { getCompany, getCompanybyid, registerCompany, updateCompany } from "../controllers/company.js";


const router = express.Router();

router.post("/register",  isAuthenticated,registerCompany);
router.get("/get", isAuthenticated, getCompany);
router.get("/get/:id", isAuthenticated,getCompanybyid);
router.put("/update/:id", isAuthenticated,singleUpload,updateCompany)

export default router;
