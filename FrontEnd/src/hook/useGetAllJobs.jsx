import { useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setAllJobs } from '../redux/jobSlice';

const backendURL = import.meta.env.VITE_BACKEND_URL;

const useGetAllJobs = (enabled = true) => {
    const dispatch = useDispatch();

    useEffect(() => {
        if (!enabled) return;

        const getAllJobs = async () => {
            try {
                const res = await axios.get(`${backendURL}/api/v1/job/get`, { withCredentials: true });
                if (res.data.success) {
                    dispatch(setAllJobs(res.data.jobs));
                }
            } catch (error) {
                console.log(error);
            }
        };
        getAllJobs();
    }, [enabled, dispatch]);
};

export default useGetAllJobs;