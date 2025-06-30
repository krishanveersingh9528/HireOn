import { useState } from 'react';
import { Button } from './ui/button';
import { Search } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '../redux/jobSlice';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
  const [query, SetQuery] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = () => {
    if (query.trim() === '') return; // Optional: prevent empty search
    dispatch(setSearchedQuery(query));
    navigate('/browse');
  };

  return (
    <div className="relative text-center mx-4 md:mx-16 mt-6 overflow-hidden rounded-3xl shadow-xl border border-slate-200">
      {/* Background Image */}
      <img
        src="https://images.unsplash.com/photo-1581091870620-1c620c5495b3?auto=format&fit=crop&w=1500&q=80"
        alt="Career background"
        className="absolute inset-0 w-full h-full object-cover opacity-30"
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-100 via-white to-blue-100 opacity-90" />

      <div className="relative py-20 px-4 flex flex-col gap-6 z-10">
        <span className="mx-auto px-4 py-2 rounded-full bg-white text-blue-600 font-medium shadow">
          No.1 Job Hunt Website
        </span>
        <h1 className="text-5xl font-bold text-gray-800 drop-shadow-md">
          Browse, Apply & <br />
          Build <span className="text-blue-500">Your Future</span>
        </h1>
        <p className="text-gray-700 text-lg max-w-2xl mx-auto">
          Dream big with confidence, work smart with focus, and get hired for the job that truly defines your future.
        </p>
        <div className="flex w-full max-w-xl shadow-md border border-gray-300 pl-3 rounded-full items-center gap-4 mx-auto bg-white">
          <input
            type="text"
            value={query}
            placeholder="Find Your Dream Jobs"
            onChange={(e) => SetQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                searchJobHandler();
              }
            }}
            className="outline-none border-none w-full bg-transparent text-gray-700 placeholder-gray-400"
          />
          <Button
            onClick={searchJobHandler}
            className="rounded-r-full bg-blue-500 hover:bg-blue-600 transition-colors cursor-pointer"
          >
            <Search className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
