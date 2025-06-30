import { useEffect } from 'react'
import Navbar from './shared/Navbar'
import Job from './Job';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchedQuery } from '../redux/jobSlice';
import useGetAllJobs from '../hook/useGetAllJobs';


const Browse = () => {
    useGetAllJobs();
    const { allJobs } = useSelector(store => store.job);
    const dispatch = useDispatch();
    useEffect(() => {
        return () => {
            dispatch(setSearchedQuery(""))
        }
    },[])
    return (
        <div>
            <Navbar />
            <div className='max-w-7xl mx-auto my-10'>
                <h1 className='font-bold text-xl my-10 '>Search Results ({allJobs.length})</h1>
                <div className='grid grid-cols-3 gap-4 mt-5'>
                    {
                        allJobs.length > 0 ? (
                            allJobs.map((item) => (
                                <Job key={item._id} job={item} />
                            ))
                        ) : (
                            <p className="text-center text-gray-500">No jobs found</p>
                        )
                    }

                </div>

            </div>
        </div>
    )
}

export default Browse

//useEffet for cleaup when we return frm useEffect then it run wehn it unmount
//jab ummount kru to`   
