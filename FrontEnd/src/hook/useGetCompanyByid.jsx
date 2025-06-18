import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setAllJobs } from '../redux/jobSlice'
import { setSingleCompany } from '../redux/companySlice'

const useGetCompanyByid = (companyID) => {
    const dispatch=useDispatch() 

     useEffect(  ()=>{
         const fetchSingleCompany=async()=>{
            try {
                const res=await axios.get(`http://localhost:8000/api/v1/company/get/${companyID}`,{withCredentials:true})
              
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