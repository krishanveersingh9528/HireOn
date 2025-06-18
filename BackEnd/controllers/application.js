import Application from "../models/application.js";
import Job from "../models/job.js";

export const applyjob=async (req,res)=>{
    try{
      const userid=req.id;
     
       const jobId=req.params.id;
      //  console.log("kv")
       if(!jobId){
        return res.status(400).json({
            message:"job id is required",
            success:false
          })   
       }
       //check if the user has already applied for job
         const existingApplication=await Application.findOne({job:jobId,applicant:userid});
         if(existingApplication){
            return res.status(400).json({
                message:"You have already applied for job",
                success:false
              })
         }

         const job=await Job.findById(jobId);
         
         if(!job){
            return res.status(400).json({
                message:"job not found",
                success:false
              })
         }
        //create a new application
        const newApplication= await Application.create({
            job:jobId,
            applicant:userid
        })
      job.applications.push(newApplication._id);
      await job.save();
      return res.status(201).json({
        message:"job applied succesfully",
        success:true
      })
    }catch(err){
        console.log(err);
    }
}


export const getAppliedjobs=async (req,res) => {
  
       try{
          const userid=req.id;
          // console.log("kv");
          const application=await Application.find({applicant:userid}).sort({createdAt:-1}).populate({
            path:'job',
            options:{sort:{createdAt:-1}},
            populate:{
                path:'company',
                options:{sort:{createdAt:-1}}
            }
          })
          if(!application){
            return res.status(404).json({
                message:"No Application",
                success:false
              }) 
          }
          return res.status(200).json({
            application,
            success:true
          }) 

       }catch(err){
        console.log(err);
       }
}

//recruiter dekhega kitne user ne apply kiya
export const getApplicants=async (req,res)=>{
       try{
          const jobid=req.params.id;
           const job=await Job.findById(jobid).populate({
            path:'applications',
            options:{sort:{createdAt:-1}},
            populate:{
                path:'applicant',
                
            }
           });
          //  console.log(job);
           if(!job){
            return res.status(404).json({
              message:"job not found",
              success:false
            })
           }
           return res.status(200).json({
            job,
            success:true
          })

       }catch(err){
        console.log(err);
       }
}

export const updateStatus=async(req,res)=>{
    try{ 
      const {status}=req.body;
      const applicationid=req.params.id;
      if(!status){
        return res.status(404).json({
          message:"status is required",
          success:false
        })
      }
      //find the application
      const application=await Application.findById(applicationid);
      if(!application){
        return res.status(404).json({
          message:"Application not found",
          success:false
        })
      }
      application.status=status.toLowerCase();
      await application.save();

     
     
        return res.status(200).json({
          message:"status updated successfully",
          success:true
        })

    }catch(err){
      console.log(err);
    }
}
    //jab user ne job m apply kiya to ek application bni usme jobid userid fir uss application ko job m dal diya ki iss job ke liye ye application aayi h
