import { useState } from 'react';
import Navbar from './shared/Navbar';
import { Avatar, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { Contact, Mail, Pen } from 'lucide-react';
import { Badge } from './ui/badge';
import { Label } from './ui/label';
import AppliedJobs from './AppliedJobs';
import UpdateProfileDialog from './UpdateProfileDialog';
import { useSelector } from 'react-redux';
import useGetAppliedJobs from '../hook/useGetAplliedJobs';
import { motion } from 'framer-motion';

const isresume = true;

const Profile = () => {
  useGetAppliedJobs();
  const [open, setOpen] = useState(false);
  const { user } = useSelector((store) => store.auth);

  return (
    <motion.div initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }} className="min-h-screen bg-gradient-to-br from-white via-slate-50 to-slate-100">
      <Navbar />

      <div className="max-w-4xl mx-auto border border-slate-200 bg-white shadow-md rounded-2xl my-8 p-8">
        <div className="flex justify-between">
          <div className="flex items-center gap-5">
            <Avatar className="h-28 w-28 border border-gray-200 shadow-sm">
              <AvatarImage src="https://img.freepik.com/premium-vector/company-logo-design_697972-460.jpg?w=996" />
            </Avatar>
            <div>
              <h1 className="font-semibold text-xl text-slate-800">{user?.fullname}</h1>
              <p className="text-gray-600">{user?.profile?.bio}</p>
            </div>
          </div>
          <Button
            onClick={() => setOpen(true)}
            className="rounded-full hover:bg-sky-100 transition"
            variant="outline"
            size="icon"
          >
            <Pen className="text-slate-700" />
          </Button>
        </div>

        <div className="my-6 space-y-2">
          <div className="flex items-center gap-3 text-gray-700">
            <Mail />
            <span>{user?.email}</span>
          </div>

          <div className="flex items-center gap-3 text-gray-700">
            <Contact />
            <span>{user?.phoneNumber}</span>
          </div>
        </div>

        <div className="my-6">
          <h2 className="text-md font-bold mb-2 text-slate-700">Skills</h2>
          {user?.profile?.skills?.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {user.profile.skills.map((item, idx) => (
                <Badge key={idx} className="bg-sky-100 text-sky-800">
                  {item}
                </Badge>
              ))}
            </div>
          ) : (
            <span className="text-gray-500">No skills added</span>
          )}
        </div>

        <div className="my-6">
          <Label className="text-md font-bold text-slate-700 mb-1 block">Resume</Label>
          {
            isresume ? (
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={`https://docs.google.com/gview?url=${encodeURIComponent(user?.profile?.resume)}&embedded=true`}
                className="text-blue-500 hover:underline cursor-pointer"
              >
                {user?.profile?.resumeOriginalName}
              </a>
            ) : (
              <span>NA</span>
            )
          }

        </div>
      </div>

      <div className="max-w-4xl mx-auto bg-white border border-slate-200 rounded-2xl p-6 shadow-md">
        <h1 className="font-semibold text-lg text-slate-800 mb-4">Applied Jobs</h1>
        <AppliedJobs />
      </div>

      <UpdateProfileDialog open={open} setOpen={setOpen} />
    </motion.div>
  );
};

export default Profile;
