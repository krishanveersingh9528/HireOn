import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setAllAdminJobs } from '../redux/jobSlice'

const useGetAllAdminJobs = () => {
    const dispatch=useDispatch() 

     useEffect(  ()=>{
         const getAllAdminJobs=async()=>{
            try {
                const res=await axios.get("http://localhost:8000/api/v1/job/getadminJobs",{withCredentials:true})
               if(res.data.success){
                dispatch(setAllAdminJobs(res.data.jobs))
               }
            } catch (error) {
                console.log(error)
            }
         }
         getAllAdminJobs()
     },[])
     
}

export default useGetAllAdminJobs