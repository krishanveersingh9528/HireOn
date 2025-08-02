import { useEffect, useState } from 'react';
import Navbar from '../shared/Navbar';
import ApplicantsTable from './ApplicantsTable';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setAllApplicants } from '../../redux/application';
import { motion } from 'framer-motion';
import { Button } from '../ui/button';
import { Loader } from 'lucide-react';

const backendURL = import.meta.env.VITE_BACKEND_URL;

const Applicants = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { applicants } = useSelector((store) => store.application);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchAllApplicants = async () => {
      try {
        setLoading(true); // ✅ starts loading before request
        const res = await axios.get(
          `${backendURL}/api/v1/application/${id}/applicants`,
          { withCredentials: true }
        );
        dispatch(setAllApplicants(res.data.job));
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false); // ✅ stops loading after request
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

        {/* {loading ? (
          <p className="text-gray-500">Loading applicants...</p>
        ) : (
          <ApplicantsTable />
        )} */}
        {loading ? (
          <div className="flex items-center justify-center h-40 bg-gray-100 rounded-md">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white" >
              <Loader className="mr-2 h-4 w-4 animate-spin" />
              Please wait...
            </Button>
          </div>
        ) : (
          <ApplicantsTable />
        )}

      </div>
    </motion.div>
  );
};

export default Applicants;
