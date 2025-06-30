import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setAllJobs } from '../redux/jobSlice'
import { setSingleCompany } from '../redux/companySlice'
const backendURL = import.meta.env.VITE_BACKEND_URL;


const useGetCompanyByid = (companyID) => {
    const dispatch=useDispatch() 

     useEffect(  ()=>{
         const fetchSingleCompany=async()=>{
            try {
                const res=await axios.get(`${backendURL}/api/v1/company/get/${companyID}`,{withCredentials:true})
              
                if(res.data.success){
                    // console.log(res.data.company)
                dispatch(setSingleCompany(res.data.company))
              
               }
            } catch (error) {
                console.log(error)
            }
         }
         fetchSingleCompany()
     },[companyID,dispatch])
     
}

export default useGetCompanyByid