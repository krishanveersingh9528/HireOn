import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setAllAppliedJobs } from '../redux/jobSlice';

const useGetAppliedJobs = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const getAppliedJobs = async () => {
            try {
                const res = await axios.get("http://localhost:8000/api/v1/application/get", {
                    withCredentials: true
                });
                if (res.data.success) {
                    dispatch(setAllAppliedJobs(res.data.application))
                }
            } catch (err) {
                console.log(err);
            }
        }
        getAppliedJobs();
    }
        , [])
}
export default useGetAppliedJobs;
