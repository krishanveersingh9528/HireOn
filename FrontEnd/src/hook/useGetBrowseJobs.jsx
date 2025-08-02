import { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setBrowseJobs } from '../redux/jobSlice';

const backendURL = import.meta.env.VITE_BACKEND_URL;

const useGetBrowseJobs = (keyword = "", enabled = true) => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!enabled) {
            setLoading(false);
            return;
        }

        const getFilteredJobs = async () => {
            if (!keyword) {
                dispatch(setBrowseJobs([]));
                return;
            }
            setLoading(true);
            try {
                const res = await axios.get(
                    `${backendURL}/api/v1/job/get?keyword=${keyword}`,
                    { withCredentials: true }
                );
                if (res.data.success) {
                    dispatch(setBrowseJobs(res.data.jobs));
                }
            } catch (error) {
                console.log(error);
                dispatch(setBrowseJobs([]));
            } finally {
                setLoading(false);
            }
        };
        getFilteredJobs();
    }, [keyword, enabled, dispatch]);

    return { loading };
};

export default useGetBrowseJobs;