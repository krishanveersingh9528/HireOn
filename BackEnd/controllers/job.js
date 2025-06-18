import Job from "../models/job.js";

//recruiter job create krega
export const PostJob = async (req, res) => {
    try {
        const { title, description, salary, requirements, location, jobType, experience, position, companyid } = req.body;
        // console.log(req.body);
        const userid = req.id;
        if (!title || !description || !salary || !requirements || !location || !jobType || !experience || !position || !companyid) {
            return res.status(400).json({
                message: "something is missing",
                success: false
            });
        }
        if (salary < 0 || experience < 0 || position <= 0) {
            return res.status(400).json({
                message: "Salary, experience, and position must be positive values.",
                success: false
            });
        }


        const job = await Job.create({
            title,
            description,
            requirements: requirements.split(","),
            salary: Number(salary),
            location,
            jobType,
            position,
            experienceLevel: experience,
            company: companyid,
            created_by: userid

        })
        return res.status(201).json({
            message: "New job created successfully",
            job,
            success: true
        });
    } catch (err) {
        console.log(err);
    }
}

//student
export const getAlljobs = async (req, res) => {
    try {
        const keyword = req.query.keyword || "";
        const query = {
            $or: [
                { title: { $regex: keyword, $options: "i" } },
                { description: { $regex: keyword, $options: "i" } }
            ]
        }
        const jobs = await Job.find(query).populate("company").sort({ createdAt: -1 });
        if (!jobs) {
            return res.status(404).json({
                message: "jobs not found",
                success: false
            })
        }
        return res.status(200).json({
            jobs,
            success: true
        })

    } catch (err) {
        console.log(err);
    }
}

//student
export const getJobbyid = async (req, res) => {
    try {
        const jobid = req.params.id;
        const job = await Job.findById(jobid).populate("applications")
        if (!job) {
            return res.status(404).json({
                message: "jobs not found",
                success: false
            })
        }
        return res.status(200).json({
            job,
            success: true
        })

    } catch (err) {
        console.log(err);
    }



}

//recuitet kitne job create kra hai abhi tak
export const getadminJobs = async (req, res) => {
    try {
        const userid = req.id;
        const jobs = await Job.find({ created_by: userid }).populate("company").sort({ createdAt: -1 });
        if (!jobs) {
            return res.status(404).json({
                message: "jobs not found",
                success: false
            })
        }
        return res.status(200).json({
            jobs,
            success: true
        })

    } catch (err) {
        console.log(err);
    }
}
