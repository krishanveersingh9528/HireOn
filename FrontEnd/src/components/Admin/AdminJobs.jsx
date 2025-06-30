import React, { useState, useEffect } from 'react';
import Navbar from '../shared/Navbar';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import AdminJobsTable from './AdminJobsTable';
import useGetAllAdminJobs from '../../hook/useGetAllAdminJobs';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setSearchJobByText } from '../../redux/jobSlice';
import { motion } from 'framer-motion'; // ✅ Add this

const AdminJobs = () => {
  const [input, setInput] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useGetAllAdminJobs();

  useEffect(() => {
    dispatch(setSearchJobByText(input));
  }, [input, dispatch]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gray-50"
    >
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
          <Input
            className="sm:w-1/2"
            placeholder="Search by job title or role"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <Button
            onClick={() => navigate('/admin/jobs/create')}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            + New Job
          </Button>
        </div>

        <AdminJobsTable />
      </div>
    </motion.div>
  );
};

export default AdminJobs;
