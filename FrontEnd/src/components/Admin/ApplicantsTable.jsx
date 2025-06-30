import { MoreHorizontal } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { toast } from 'sonner';
import { motion } from 'framer-motion'; // ✅ Import Framer Motion
const backendURL = import.meta.env.VITE_BACKEND_URL;

const shortlistingStatus = ["Accepted", "Rejected"];

const ApplicantsTable = () => {
    const { applicants } = useSelector(store => store.application);

    const statusHandler = async (status, id) => {
        try {
            const res = await axios.post(`${backendURL}/api/v1/application/status/${id}/update`, { status }, {
                withCredentials: true
            });
            if (res.data.success) {
                toast.success(res.data.message);
            }
        } catch (err) {
            toast.error(err?.res?.data?.message || "Something went wrong");
        }
    };

    return (
        <div>
            <Table>
                <TableCaption>A list of your recent applied user</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Full Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Contact</TableHead>
                        <TableHead>Resume</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        applicants && applicants?.applications?.map((item, index) => (
                            <motion.tr
                                key={item._id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, delay: index * 0.05 }}
                            >
                                <TableCell>{item?.applicant?.fullname}</TableCell>
                                <TableCell>{item?.applicant?.email}</TableCell>
                                <TableCell>{item?.applicant?.phoneNumber}</TableCell>
                                {
                                    item?.applicant?.profile?.resume ?
                                        <TableCell className="text-blue-600 cursor-pointer">
                                            <a href={item?.applicant?.profile?.resume} target="_blank" rel="noopener noreferrer">
                                                {item?.applicant?.profile?.resumeOriginalName}
                                            </a>
                                        </TableCell>
                                        :
                                        <TableCell className="text-red-600">NA</TableCell>
                                }
                                <TableCell>{item?.createdAt.split("T")[0]}</TableCell>
                                <TableCell className="text-right">
                                    <Popover>
                                        <PopoverTrigger className="cursor-pointer">
                                            <MoreHorizontal />
                                        </PopoverTrigger>
                                        <PopoverContent className='w-32'>
                                            {
                                                shortlistingStatus.map((status, index) => (
                                                    <div
                                                        key={index}
                                                        onClick={() => statusHandler(status, item?._id)}
                                                        className='flex w-fit items-center my-2 cursor-pointer'
                                                    >
                                                        <span>{status}</span>
                                                    </div>
                                                ))
                                            }
                                        </PopoverContent>
                                    </Popover>
                                </TableCell>
                            </motion.tr>
                        ))
                    }
                </TableBody>
            </Table>
        </div>
    );
};

export default ApplicantsTable;
