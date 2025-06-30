import { useState, useEffect } from 'react';
import Navbar from '../shared/Navbar';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import CompaniesTable from './CompaniesTable';
import { useNavigate } from 'react-router-dom';
import useGetallCompany from '../../hook/useGetallCompany';
import { useDispatch } from 'react-redux';
import { setSearchCompanyByText } from '../../redux/companySlice';
import { motion } from 'framer-motion'; // ✅ Import Framer Motion

const Companies = () => {
  const [input, setInput] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Fetch all companies on mount
  useGetallCompany();

  // Update search filter when input changes
  useEffect(() => {
    dispatch(setSearchCompanyByText(input));
  }, [input, dispatch]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gray-50"
    >
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
          <Input
            className="sm:w-1/2"
            placeholder="Search by company name"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <Button
            onClick={() => navigate('/admin/companies/create')}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            + New Company
          </Button>
        </div>

        <CompaniesTable />
      </div>
    </motion.div>
  );
};

export default Companies;
