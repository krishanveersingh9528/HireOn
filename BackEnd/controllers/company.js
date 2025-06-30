import Company from "../models/company.js";
import cloudinary from "../utils/cloudinary.js";
import getDataUri from "../utils/datauri.js";

export const registerCompany=async (req,res)=>{
       try{
         const {companyName} =req.body;
         if(!companyName){
            return res.status(400).json({
                message:"Company name is required",
                success:false
              })
         }
     
         let company=await Company.findOne({name:companyName});
        if(company){
            return res.status(400).json({
                message:"You can't register same company",
                success:false
              })
        }
          
   company=  await Company.create({
        name:companyName,
        userId:req.id
     })
     return res.status(201).json({
        message:"company registered successfully",
        company,
        success:true
      })


       }catch(err){
         console.log(err);
       }
}

export const getCompany=async (req,res)=>{
      try{
        const userId=req.id;   //logged in user
        const companies=await Company.find({userId});
        // console.log(companies);
        if(!companies){
            return res.status(404).json({
                message:"companies not found",
                success:false
              })
        }
        return res.status(200).json({
          companies,
          success:true
        })
      }catch(err){
        console.log(err);
      }
}
export const getCompanybyid=async (req,res)=>{
    try{
      const comapnyid=req.params.id;
      const company=await Company.findById(comapnyid)
      if(!company){
        return res.status(404).json({
            message:"company not found",
            success:false
          })
    }
    return res.status(200).json({
        company,
        success:true
      })
    }catch(err){
      console.log(err);
    }
}

export const updateCompany=async (req,res)=>{
    try{
       const {name ,description,website,location}=req.body
      //  console.log(req.body);
      if(!name || !description || !website || !location){
        return res.status(400).json({
            message:"All fields are required",
            success:false
          })
       }
      
       const file=req.file;
       //cloudinary
         const fileuri=getDataUri(file);
          const cloudresponse = await cloudinary.uploader.upload(fileuri.content,{ resource_type: "raw" });

            const logo=cloudresponse.secure_url;
       const updatedata={name,description,website,location,logo};
      
       const company=await Company.findByIdAndUpdate(req.params.id,updatedata,{new:true});
       if(!company){
        return res.status(404).json({
            message:"company not found",
            success:false
          })
       }

       return res.status(200).json({
         message:"company information updated",
        success:true
      })

    }catch(err){
      console.log(err);
    }
}