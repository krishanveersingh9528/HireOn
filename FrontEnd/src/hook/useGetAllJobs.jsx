import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setAllJobs } from '../redux/jobSlice';
const backendURL = import.meta.env.VITE_BACKEND_URL;

const useGetAllJobs = (keyword = "") => {
    const dispatch = useDispatch();

    useEffect(() => {
        const getAllJobs = async () => {
            try {
                const res = await axios.get(
                    `${backendURL}/api/v1/job/get${keyword ? `?keyword=${keyword}` : ""}`,
                    { withCredentials: true }
                );
                if (res.data.success) {
                    dispatch(setAllJobs(res.data.jobs));
                }
            } catch (error) {
                console.log(error);
            }
        };
        getAllJobs();
    }, [keyword]); // ✅ refetch if keyword changes
};

export default useGetAllJobs;
