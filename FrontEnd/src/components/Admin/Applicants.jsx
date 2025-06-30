import { useEffect } from 'react';
import Navbar from '../shared/Navbar';
import ApplicantsTable from './ApplicantsTable';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setAllApplicants } from '../../redux/application';
import { motion } from 'framer-motion'; // ✅ added
const backendURL = import.meta.env.VITE_BACKEND_URL;

const Applicants = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { applicants } = useSelector((store) => store.application);

  useEffect(() => {
    const fetchAllApplicants = async () => {
      try {
        const res = await axios.get(
          `${backendURL}/api/v1/application/${id}/applicants`,
          {
            withCredentials: true,
          }
        );
        dispatch(setAllApplicants(res.data.job));
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllApplicants();
  }, [dispatch, id]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Navbar />
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-xl font-bold my-5 text-blue-600">
          Applicants{' '}
          <span className="text-sm font-medium text-gray-600">
            ({applicants?.applications?.length || 0})
          </span>
        </h1>
        <ApplicantsTable />
      </div>
    </motion.div>
  );
};

export default Applicants;
