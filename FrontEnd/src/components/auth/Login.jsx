import React, { useEffect, useState } from 'react';
import Navbar from '../shared/Navbar';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { RadioGroup } from '../ui/radio-group';
import { Button } from '../ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading, setUser } from '../../redux/authslice';
import { Loader } from 'lucide-react';
import { motion } from 'framer-motion';
const backendURL = import.meta.env.VITE_BACKEND_URL;

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, user } = useSelector((store) => store.auth);

  const [input, setInput] = useState({
    email: '',
    password: '',
    role: '',
  });

  const ChangeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    dispatch(setLoading(true));
    try {
      const res = await axios.post(`${backendURL}/api/v1/user/login`, input, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(res.data.user));
        navigate('/home');
        toast.success(res.data.message);
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Login failed');
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    if (user) navigate('/home');
  }, [user, navigate]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex items-center justify-center max-w-7xl mx-auto">
        <motion.form
          onSubmit={submitHandler}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="w-full md:w-1/2 bg-white border border-gray-200 rounded-2xl shadow-md p-8 my-10"
        >
          <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">Login</h1>

          <div className="flex flex-col gap-1 mb-4">
            <Label>Email</Label>
            <Input
              type="email"
              placeholder="kv@gmail.com"
              value={input.email}
              name="email"
              onChange={ChangeEventHandler}
              required
            />
          </div>

          <div className="flex flex-col gap-1 mb-4">
            <Label>Password</Label>
            <Input
              type="password"
              value={input.password}
              name="password"
              onChange={ChangeEventHandler}
              placeholder="******"
              required
            />
          </div>

          <div className="mb-6">
            <Label className="mb-2 block">Login As</Label>
            <RadioGroup className="flex items-center gap-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <Input
                  type="radio"
                  name="role"
                  value="student"
                  checked={input.role === 'student'}
                  onChange={ChangeEventHandler}
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
                  onChange={ChangeEventHandler}
                  className="accent-blue-500"
                />
                <span>Recruiter</span>
              </label>
            </RadioGroup>
          </div>

          {loading ? (
            <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white">
              <Loader className="mr-2 h-4 w-4 animate-spin" /> Please Wait
            </Button>
          ) : (
            <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white">
              Login
            </Button>
          )}

          <p className="text-sm text-center mt-4">
            Don't have an account?{' '}
            <Link to="/signup" className="text-blue-600 hover:underline font-medium">
              Sign Up
            </Link>
          </p>
        </motion.form>
      </div>
    </div>
  );
};

export default Login;
