import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setAllJobs } from '../redux/jobSlice'
const backendURL = import.meta.env.VITE_BACKEND_URL;



const useGetAllJobs = () => {
    const dispatch = useDispatch()
    const { searchedQuery } = useSelector(store => store.job);
    useEffect(() => {
        const getAllJobs = async () => {
            try {
                const res = await axios.get(`${backendURL}/api/v1/job/get?keyword=${searchedQuery}`, { withCredentials: true })
                if (res.data.success) {
                    console.log("kv")
                    dispatch(setAllJobs(res.data.jobs))
                }
            } catch (error) {
                //  console.log("kv")
                console.log(error)
            }
        }
       
            getAllJobs();
        

    }, [])

}

export default useGetAllJobs