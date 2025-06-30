import React, { useState } from 'react';
import Navbar from '../shared/Navbar';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '../ui/select';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Loader } from 'lucide-react';
import { toast } from 'sonner';
import { motion } from 'framer-motion'; // ✅ Import Framer Motion
const backendURL = import.meta.env.VITE_BACKEND_URL;

const PostJobs = () => {
  const [input, setInput] = useState({
    title: "",
    description: "",
    requirements: "",
    location: "",
    salary: "",
    jobType: "",
    experience: "",
    position: 0,
    companyid: ""
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { companies } = useSelector(store => store.company);

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const selectChangehandler = (value) => {
    const selectdCompany = companies.find((company) => company.name.toLowerCase() === value);
    setInput({ ...input, companyid: selectdCompany._id });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(`${backendURL}/api/v1/job/post`, input, {
        headers: {
          "Content-Type": "application/json"
        },
        withCredentials: true
      });

      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/jobs");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Job post failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-center w-screen my-5"
      >
        <form onSubmit={submitHandler} className="p-8 max-w-4xl border border-gray-200 shadow-lg rounded-md">
          <h1 className="text-2xl font-semibold mb-6 ml-20 text-green-500">Post a New Job</h1>
          <div className='grid grid-cols-2 gap-4 w-full max-w-4xl'>
            {/* Title */}
            <div>
              <Label>Title</Label>
              <Input
                type="text"
                name="title"
                value={input.title}
                onChange={changeEventHandler}
                className="focus-visible:ring-offset-0 focus-visible:ring-0"
              />
            </div>

            {/* Description */}
            <div>
              <Label>Description</Label>
              <Input
                type="text"
                name="description"
                value={input.description}
                onChange={changeEventHandler}
                className="focus-visible:ring-offset-0 focus-visible:ring-0"
              />
            </div>

            {/* Requirements */}
            <div>
              <Label>Requirements</Label>
              <Input
                type="text"
                name="requirements"
                value={input.requirements}
                onChange={changeEventHandler}
                className="focus-visible:ring-offset-0 focus-visible:ring-0"
              />
            </div>

            {/* Location */}
            <div>
              <Label>Location</Label>
              <Input
                type="text"
                name="location"
                value={input.location}
                onChange={changeEventHandler}
                className="focus-visible:ring-offset-0 focus-visible:ring-0"
              />
            </div>

            {/* Salary */}
            <div>
              <Label>Salary</Label>
              <Input
                type="text"
                name="salary"
                value={input.salary}
                onChange={changeEventHandler}
                className="focus-visible:ring-offset-0 focus-visible:ring-0"
              />
            </div>

            {/* Job Type */}
            <div>
              <Label>Job Type</Label>
              <Input
                type="text"
                name="jobType"
                value={input.jobType}
                onChange={changeEventHandler}
                className="focus-visible:ring-offset-0 focus-visible:ring-0"
              />
            </div>

            {/* Experience */}
            <div>
              <Label>Experience Level</Label>
              <Input
                type="text"
                name="experience"
                value={input.experience}
                onChange={changeEventHandler}
                className="focus-visible:ring-offset-0 focus-visible:ring-0"
              />
            </div>

            {/* Position */}
            <div>
              <Label>No of Position</Label>
              <Input
                type="number"
                name="position"
                value={input.position}
                onChange={changeEventHandler}
                className="focus-visible:ring-offset-0 focus-visible:ring-0"
              />
            </div>

            {/* Company Dropdown */}
            {
              companies.length > 0 && (
                <Select onValueChange={selectChangehandler}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select a Company" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {
                        companies.map((company) => (
                          <SelectItem value={company?.name?.toLowerCase()} key={company?._id}>
                            {company?.name}
                          </SelectItem>
                        ))
                      }
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )
            }
          </div>

          {/* Submit Button */}
          {loading ? (
            <Button className="w-full my-4">
              <Loader className='mr-2 h-4 w-4 animate-spin' />
              Please Wait
            </Button>
          ) : (
            <Button type="submit" className="w-full my-4 cursor-pointer">
              Post
            </Button>
          )}

          {/* No company warning */}
          {
            companies.length === 0 && (
              <p className='text-xs text-red-600 font-bold text-center my-3'>
                *Please Register a Company First, Before Posting Job
              </p>
            )
          }
        </form>
      </motion.div>
    </>
  );
};

export default PostJobs;
