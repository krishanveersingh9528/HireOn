import { useEffect, useState } from 'react';
import axios from 'axios';
import LatestJobCards from './LatestJobCards';

const backendURL = import.meta.env.VITE_BACKEND_URL;

const LatestJobs = () => {
  const [latestJobs, setLatestJobs] = useState([]);

  useEffect(() => {
    const fetchLatestJobs = async () => {
      try {
        const res = await axios.get(`${backendURL}/api/v1/job/get`, { withCredentials: true });
        if (res.data.success) {
          setLatestJobs(res.data.jobs.slice(0, 6)); // ✅ Always take only latest 6
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchLatestJobs();
  }, []);

  return (
    <div className="bg-gradient-to-br from-white via-slate-50 to-blue-100 border border-slate-200 rounded-3xl mx-4 md:mx-16 shadow-lg p-6 mt-10">
      <h1 className="text-4xl font-bold text-center mb-6 text-slate-800">
        <span className="text-blue-600">Latest & Top</span> Job Openings
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {latestJobs.length <= 0 ? (
          <span className="text-center col-span-full text-gray-500">
            No Job Available
          </span>
        ) : (
          latestJobs.map((job) => <LatestJobCards key={job._id} job={job} />)
        )}
      </div>
    </div>
  );
};

export default LatestJobs;
