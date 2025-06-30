import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setCompanies } from '../redux/companySlice'
const backendURL = import.meta.env.VITE_BACKEND_URL;


const useGetallCompany = () => {
    const dispatch=useDispatch() 

     useEffect(  ()=>{
         const fetchCompany=async()=>{
            try {
                const res=await axios.get(`${backendURL}/api/v1/company/get`,{withCredentials:true})
                 
                if(res.data.success){
                    console.log(res.data.companies)
                dispatch(setCompanies(res.data.companies))
              
               }
            } catch (error) {
                console.log(error)
            }
         }
         fetchCompany()
     },[])
     
}

export default useGetallCompany