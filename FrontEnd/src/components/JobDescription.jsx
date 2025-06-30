import React from 'react'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { useParams } from 'react-router-dom';
import axios from 'axios'
import { setSingleJob } from '../redux/jobSlice';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import { useState } from 'react';
import { motion } from 'framer-motion';
const backendURL = import.meta.env.VITE_BACKEND_URL;

const JobDescription = () => {

    const { user } = useSelector(store => store.auth)
    const params = useParams()
    const jobid = params.id;
    const dispatch = useDispatch();
    const { singleJob } = useSelector(store => store.job)
    const isInitaillyApplied = singleJob?.applications?.some((item) => item.applicant === user?._id) || false;  //some koi item exist krta h array m to true return
    const [isApplied, setIsApplied] = useState(isInitaillyApplied)
    const applyJobHandler = async () => {
        try {
            const res = await axios.get(`${backendURL}/api/v1/application/apply/${jobid}`, { withCredentials: true })
            if (res.data.success) {
                setIsApplied(true)
                const updatesingleJob = { ...singleJob, applications: [...singleJob.applications, { applicant: user?._id }] }
                dispatch(setSingleJob(updatesingleJob))   //help us real time user interface update krne m
                toast.success(res.data.message)

            }
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message)
        }
    }
    useEffect(() => {
        const getsingleJob = async () => {
            try {
                const res = await axios.get(`http://localhost:8000/api/v1/job/get/${jobid}`, { withCredentials: true })
                if (res.data.success) {
                    dispatch(setSingleJob(res.data.job))
                    setIsApplied(res.data.job.applications.some((item) => item.applicant === user?._id))
                }
            } catch (error) {
                console.log(error)
            }
        }
        getsingleJob()
    }, [jobid, dispatch, user?._id])
    return (
        <motion.div initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }} className='max-w-7xl mx-auto my-10  p-5 rounded-md shadow-xl bg-white-border border-gray-100'>
            <div className='flex items-center justify-between'>
                <div>
                    <h1 className='font-bold text-xl'>{singleJob?.title}</h1>
                    <div className='flex items-center gap-2 mt-4'>
                        <Badge className="text-blue-700 font-bold" variant="ghost">{singleJob?.position} Positions</Badge>
                        <Badge className="text-[#F83002] font-bold" variant="ghost">{singleJob?.jobType}</Badge>
                        <Badge className="text-[#7209b7] font-bold" variant="ghost">{singleJob?.salary} LPA</Badge>
                    </div>
                </div>


                <Button onClick={isApplied ? null : applyJobHandler} disabled={isApplied} className={`rounded-lg ${isApplied ? `bg-gray-600 cursor-not-allowed` : `bg-[#7209b7] hover:bg-[#5f32ad] cursor-pointer`}`} >{isApplied ? "Already Applied" : "Apply Now"}</Button>
            </div>
            <h1 className='border-b-2 border-b-gray-300 font-medium py-4'>Job Description</h1>
            <div className='my-4'>
                <h1 className='font-bold my-1'>Role: <span className='pl-4 font-normal text-gray-800'>{singleJob?.title}</span></h1>
                <h1 className='font-bold my-1'>Location: <span className='pl-4 font-normal text-gray-800'>{singleJob?.location}</span></h1>
                <h1 className='font-bold my-1'>Description: <span className='pl-4 font-normal text-gray-800'>{singleJob?.description}</span></h1>
                <h1 className='font-bold my-1'>Experience: <span className='pl-4 font-normal text-gray-800'>{singleJob?.experienceLevel} yrs</span></h1>
                <h1 className='font-bold my-1'>Salary: <span className='pl-4 font-normal text-gray-800'>{singleJob?.salary} LPA</span></h1>
                <h1 className='font-bold my-1'>Total Applicant: <span className='pl-4 font-normal text-gray-800'>{singleJob?.applications?.length}</span></h1>
                <h1 className='font-bold my-1'>Posted Date: <span className='pl-4 font-normal text-gray-800'>{singleJob?.createdAt.split("T")[0]}</span></h1>



            </div>
        </motion.div>
    )
}

export default JobDescription


//is page par aate hi hook chla aur single job ki details aayi aur wo save globally
//using disptach then acces using useSelector
// jab bhi page reload hoga tab ye useEffect chalega aur single job ki details aayegi
//jab bhi user change hoga ya jobid ya dispatch change hoga tab ye useEffect chalega

// const updatesingleJob={...singleJob,applications:[...singleJob.applications,{applicant:user?._id}]}
// means ki jo single job ki details hai usme jo applications hai unme ek aur application add ho jayegi aur ... means aur detail as it