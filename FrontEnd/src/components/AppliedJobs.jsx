import React from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';
import { Badge } from './ui/badge';
import { useSelector } from 'react-redux';

const AppliedJobs = () => {
  const { allAppliedJobs } = useSelector((store) => store.job);

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableCaption className="text-gray-500 italic mt-2">A list of your applied jobs</TableCaption>

        <TableHeader>
          <TableRow>
            <TableHead className="text-slate-600 font-semibold">Date</TableHead>
            <TableHead className="text-slate-600 font-semibold">Job Role</TableHead>
            <TableHead className="text-slate-600 font-semibold">Company</TableHead>
            <TableHead className="text-right text-slate-600 font-semibold">Status</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {allAppliedJobs?.length <= 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center text-gray-500 py-6">
                You haven't applied to any jobs yet.
              </TableCell>
            </TableRow>
          ) : (
            allAppliedJobs.map((appliedjob) => (
              <TableRow key={appliedjob?._id}>
                <TableCell>{appliedjob?.createdAt?.split('T')[0]}</TableCell>
                <TableCell>{appliedjob?.job?.title}</TableCell>
                <TableCell>{appliedjob?.job?.company?.name}</TableCell>
                <TableCell className="text-right">
                  <Badge
                    className={`px-3 py-1 font-semibold rounded-full ${
                      appliedjob?.status === 'rejected'
                        ? 'bg-red-100 text-red-700'
                        : appliedjob?.status === 'pending'
                        ? 'bg-gray-100 text-gray-700'
                        : 'bg-green-100 text-green-700'
                    }`}
                    variant="ghost"
                  >
                    {appliedjob?.status?.toUpperCase()}
                  </Badge>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default AppliedJobs;
