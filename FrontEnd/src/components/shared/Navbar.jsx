import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Popover, PopoverTrigger, PopoverContent } from '../ui/popover'
import { Button } from '../ui/button'
const backendURL = import.meta.env.VITE_BACKEND_URL;
import { Avatar, AvatarImage } from '../ui/avatar'
import { LogOut, User2 } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'sonner'
import axios from 'axios'
import { setUser } from '../../redux/authslice'

const Navbar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector(store => store.auth)
    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${backendURL}/api/v1/user/logout`, { withCredentials: true })
            if (res.data.success) {
                dispatch(setUser(null));
                navigate("/home")
                toast.success(res.data.message);
            }
        }
        catch (err) {
            console.log(err);
            toast.error(err.response.data.message);
        }
    }
    return (
        <div className='bg-gray-50 border-b border-gray-200'>
            <div className='flex items-center justify-between mx-auto max-w-7xl h-16'>

                <div>
                    <h1 className='text-2xl font-bold'>Hire<span className='text-[#f90e25]'>On</span></h1>
                </div>

                <div className='flex items-center gap-12'>
                    <ul className='flex font-medium items-center gap-5'>
                        {
                            user && user.role === 'recruiter' ? (
                                <>
                                    <li><Link to="/admin/companies">Companies</Link></li>
                                    <li><Link to="/admin/jobs">Jobs</Link></li>
                                </>
                            ) : (
                                <>
                                    <li><Link to="/home">Home</Link></li>
                                    <li><Link to="/jobs">Jobs</Link></li>
                                    <li><Link to="/browse">Browse</Link></li>
                                </>
                            )
                        }

                    </ul>
                    {
                        !user ? (
                            <div className='flex items-center gap-2'>
                                <Link to="/login"><Button variant="outline" className="cursor-pointer" >Login</Button>
                                </Link>
                                <Link to="/signup"><Button className="bg-yellow-300 hover:bg-yellow-400 text-black cursor-pointer">Signup</Button></Link>

                            </div>
                        ) : (
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Avatar className='cursor-pointer'>
                                        <AvatarImage src={user?.profile?.profilePhoto} alt="@shadcn" />

                                    </Avatar>
                                </PopoverTrigger>
                                <PopoverContent className='w-80' >
                                    <div>
                                        <div className='flex gap-2 space-y-2'>
                                            <Avatar className='cursor-pointer'>
                                                <AvatarImage src={user?.profile?.profilePhoto} alt="@shadcn" />

                                            </Avatar>
                                            <div>
                                                <h4 className='font-medium'>{user?.fullname}</h4>
                                                <p className='text-sm text-muted-foreground'>{user?.profile?.bio}</p>
                                            </div>
                                        </div>

                                        <div className='flex flex-col text-gray-600 my-2'>
                                            {
                                                user && user.role === 'student' && (
                                                    <div className='flex w-fit items-center gap-2 '>
                                                        <User2 />
                                                        <Button variant='link' className="cursor-pointer"><Link to="/profile">View Profile</Link></Button>

                                                    </div>
                                                )

                                            }


                                            <div className='flex w-fit items-center gap-2 '>
                                                <LogOut />
                                                <Button variant='link' className="cursor-pointer" onClick={logoutHandler} >Logout</Button>

                                            </div>
                                        </div>
                                    </div>

                                </PopoverContent>
                            </Popover>
                        )
                    }


                </div>


            </div>

        </div>

    )
}

export default Navbar