import React, { useState } from 'react';
import Navbar from '../shared/Navbar';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'sonner';
import { useDispatch } from 'react-redux';
import { setSingleCompany } from '../../redux/companySlice';
import { motion } from 'framer-motion'; // ✅ Framer Motion added
const backendURL = import.meta.env.VITE_BACKEND_URL;

const CompanyCreate = () => {
  const navigate = useNavigate();
  const [companyName, setCompanyName] = useState('');
  const dispatch = useDispatch();

  const registernewCompany = async () => {
    try {
      const res = await axios.post(
        `${backendURL}/api/v1/company/register`,
        { companyName },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      );

      if (res?.data?.success) {
        dispatch(setSingleCompany(res?.data?.company));
        toast.success(res.data.message);
        const companyID = res?.data?.company?._id;
        navigate(`/admin/companies/${companyID}`);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Navbar />
      <div className="max-w-4xl mx-auto">
        <div className="my-10">
          <h1 className="font-bold text-2xl">Your Company Name</h1>
          <p className="text-gray-500">
            What would you like to give your company name? You can change this later.
          </p>
        </div>

        <Label>Company Name</Label>
        <Input
          type="text"
          className="my-2"
          placeholder="JobHunt, Microsoft etc."
          onChange={(e) => setCompanyName(e.target.value)}
        />

        <div className="flex items-center gap-2 my-10">
          <Button variant="outline" onClick={() => navigate('/admin/companies')} className="cursor-pointer">
            Cancel
          </Button>
          <Button onClick={registernewCompany} className="cursor-pointer">
            Continue
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default CompanyCreate;
