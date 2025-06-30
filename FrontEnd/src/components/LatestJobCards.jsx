import { Badge } from './ui/badge';
import { useNavigate } from 'react-router-dom';

const LatestJobCards = ({ job }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/description/${job._id}`)}
      className="p-5 rounded-xl shadow-md bg-gradient-to-br from-white via-slate-50 to-slate-100 border border-slate-200 hover:shadow-lg cursor-pointer transition"
    >
      <div>
        <h1 className="font-medium text-lg text-slate-800">{job?.company?.name}</h1>
        <p className="text-sm text-gray-500">India</p>
      </div>

      <div className="mt-3">
        <h1 className="font-bold text-xl mb-1 text-slate-900">{job?.title}</h1>
        <p className="text-sm text-gray-600 line-clamp-2">{job?.description}</p>
      </div>

      <div className="flex flex-wrap gap-2 mt-4">
        <Badge className="text-sky-800 font-semibold bg-sky-100" variant="ghost">
          {job?.position} Positions
        </Badge>
        <Badge className="text-rose-700 font-semibold bg-rose-100" variant="ghost">
          {job?.jobType}
        </Badge>
        <Badge className="text-purple-700 font-semibold bg-purple-100" variant="ghost">
          {job?.salary} LPA
        </Badge>
      </div>
    </div>
  );
};

export default LatestJobCards;
