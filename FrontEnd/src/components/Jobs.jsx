import Navbar from './shared/Navbar';
import FilterPage from './FilterPage';
import Job from './Job';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import useGetAllJobs from '../hook/useGetAllJobs';

const Jobs = () => {
  useGetAllJobs("");  

  const { allJobs, searchedQuery } = useSelector(store => store.job);
  const [filterJobs, setFilterJobs] = useState(allJobs);

  useEffect(() => {
    if (searchedQuery) {
      const filteredJobs = allJobs.filter((job) => {
        return job.title.toLowerCase().includes(searchedQuery.toLowerCase()) ||
          job.description.toLowerCase().includes(searchedQuery.toLowerCase()) ||
          job.location.toLowerCase().includes(searchedQuery.toLowerCase()) ||
          job.salary.toString().includes(searchedQuery);
      });
      setFilterJobs(filteredJobs);
    } else {
      setFilterJobs(allJobs);
    }
  }, [allJobs, searchedQuery]);

  return (
    <div>
      <Navbar />
      <div className='max-w-7xl mx-auto mt-5'>
        <div className='flex gap-5'>
          <div className='w-20%'>
            <FilterPage />
          </div>

          {filterJobs.length <= 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center h-[88vh]">
              <img
                src="https://cdn-icons-png.flaticon.com/512/4076/4076508.png"
                alt="No jobs found"
                className="w-28 h-28 mb-4 opacity-80"
              />
              <h2 className="text-2xl font-bold text-gray-700">
                No Jobs Found
              </h2>
              <p className="text-gray-500 mt-1 text-center">
                Try adjusting your filters or check back later.
              </p>
            </div>
          ) : (
            <div className='flex-1 h-[88vh] overflow-y-auto pb-5'>
              <div className='grid grid-cols-3 gap-4'>
                {filterJobs.map((job) => (
                  <motion.div
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.3 }}
                    key={job?._id}
                  >
                    <Job job={job} />
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Jobs;
