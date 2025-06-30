import { Button } from './ui/button';
import { Bookmark } from 'lucide-react';
import { Badge } from './ui/badge';
import { AvatarImage, Avatar } from './ui/avatar';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion'; // ✅ import

const Job = ({ job }) => {
  const jobid = job?._id;
  const navigate = useNavigate();

  const daysAgoFunction = (mongodbtime) => {
    const createdate = new Date(mongodbtime);
    const currentDate = new Date();
    const timeDiff = Math.abs(currentDate - createdate);
    const diffDays = Math.floor(timeDiff / (1000 * 3600 * 24));
    return diffDays === 0 ? 'Today' : `${diffDays} days ago`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="p-5 rounded-xl shadow-md bg-gradient-to-br from-white via-slate-50 to-slate-100 border border-slate-200 hover:shadow-lg transition"
    >
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600">{daysAgoFunction(job?.createdAt)}</p>
        <Button variant="outline" className="rounded-full" size="icon">
          <Bookmark />
        </Button>
      </div>

      <div className="flex items-center gap-2 my-4">
        <Avatar className="w-12 h-12 border border-gray-200 shadow-sm">
          <AvatarImage src={job?.company?.logo} />
        </Avatar>
        <div className="ml-3">
          <h1 className="font-semibold text-slate-800">{job?.company?.name}</h1>
          <p className="text-sm text-gray-500">India</p>
        </div>
      </div>

      <div>
        <h1 className="font-bold text-xl mb-1 text-slate-900">{job?.title}</h1>
        <p className="text-sm text-gray-600 line-clamp-2">{job?.description}</p>
      </div>

      <div className="flex flex-wrap gap-2 mt-4">
        <Badge className="text-sky-800 bg-sky-100 font-semibold" variant="ghost">
          {job?.position} Positions
        </Badge>
        <Badge className="text-rose-700 bg-rose-100 font-semibold" variant="ghost">
          {job?.jobType}
        </Badge>
        <Badge className="text-purple-700 bg-purple-100 font-semibold" variant="ghost">
          {job?.salary} LPA
        </Badge>
      </div>

      <div className="flex items-center gap-4 mt-5">
        <Button
          onClick={() => navigate(`/description/${jobid}`)}
          className="w-full bg-sky-600 hover:bg-sky-700 text-white transition"
        >
          Details
        </Button>
      </div>
    </motion.div>
  );
};

export default Job;
