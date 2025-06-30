import React, { useEffect, useState } from 'react';
import Navbar from '../shared/Navbar';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { RadioGroup } from '../ui/radio-group';
import { Button } from '../ui/button';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'sonner';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '../../redux/authslice';
import { Loader } from 'lucide-react';
import { motion } from 'framer-motion';
const backendURL = import.meta.env.VITE_BACKEND_URL;

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, user } = useSelector((store) => store.auth);

  const [input, setInput] = useState({
    fullname: '',
    email: '',
    phoneNumber: '',
    password: '',
    role: '',
    file: '',
  });

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    dispatch(setLoading(true));

    const formData = new FormData();
    formData.append('fullname', input.fullname);
    formData.append('email', input.email);
    formData.append('phoneNumber', input.phoneNumber);
    formData.append('password', input.password);
    formData.append('role', input.role);
    if (input.file) {
      formData.append('file', input.file);
    }

    try {
      const res = await axios.post(`${backendURL}/api/v1/user/register`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
      });

      if (res.data.success) {
        toast.success(res.data.message);
        navigate('/login');
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Signup failed');
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    if (user) {
      navigate('/home');
    }
  }, []);

  return (
    <motion.div  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }} className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex items-center justify-center max-w-7xl mx-auto">
        <form
          onSubmit={submitHandler}
          className="w-full md:w-1/2 border border-gray-200 bg-white rounded-2xl shadow-md p-8 my-10"
        >
          <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">Sign Up</h1>

          <div className="flex flex-col gap-1 mb-4">
            <Label>Full Name</Label>
            <Input
              type="text"
              name="fullname"
              value={input.fullname}
              onChange={handleChange}
              placeholder="Krishanveer Singh"
              required
            />
          </div>

          <div className="flex flex-col gap-1 mb-4">
            <Label>Email</Label>
            <Input
              type="email"
              name="email"
              value={input.email}
              onChange={handleChange}
              placeholder="you@example.com"
              required
            />
          </div>

          <div className="flex flex-col gap-1 mb-4">
            <Label>Phone Number</Label>
            <Input
              type="tel"
              name="phoneNumber"
              value={input.phoneNumber}
              onChange={handleChange}
              placeholder="9876543210"
              required
            />
          </div>

          <div className="flex flex-col gap-1 mb-4">
            <Label>Password</Label>
            <Input
              type="password"
              name="password"
              value={input.password}
              onChange={handleChange}
              placeholder="******"
              required
            />
          </div>

          <div className="mb-6">
            <Label className="mb-2 block">Register As</Label>
            <RadioGroup className="flex items-center gap-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <Input
                  type="radio"
                  name="role"
                  value="student"
                  checked={input.role === 'student'}
                  onChange={handleChange}
                  className="accent-blue-500"
                />
                <span>Student</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <Input
                  type="radio"
                  name="role"
                  value="recruiter"
                  checked={input.role === 'recruiter'}
                  onChange={handleChange}
                  className="accent-blue-500"
                />
                <span>Recruiter</span>
              </label>
            </RadioGroup>
          </div>

          <div className="flex flex-col gap-1 mb-6">
            <Label>Profile Picture</Label>
            <Input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="cursor-pointer"
            />
          </div>

          {loading ? (
            <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white">
              <Loader className="mr-2 h-4 w-4 animate-spin" /> Please Wait
            </Button>
          ) : (
            <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white">
              Sign Up
            </Button>
          )}

          <p className="text-sm text-center mt-4">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-600 hover:underline font-medium">
              Login
            </Link>
          </p>
        </form>
      </div>
    </motion.div>
  );
};

export default Signup;
