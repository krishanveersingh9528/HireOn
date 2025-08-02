import { useSelector, useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import useGetBrowseJobs from '../hook/useGetBrowseJobs';
import useGetAllJobs from '../hook/useGetAllJobs';
import Navbar from './shared/Navbar';
import Job from './Job';
import { setBrowseJobs } from '../redux/jobSlice';
import { useEffect } from 'react';

const Browse = () => {
    const { browseJobs, allJobs } = useSelector(store => store.job);
    const dispatch = useDispatch();
    const [searchParams] = useSearchParams();
    const query = searchParams.get('q');
    const isSearching = !!query;
    const { loading } = useGetBrowseJobs(query, isSearching);
    useGetAllJobs(!isSearching);

    useEffect(() => {
        return () => {
            dispatch(setBrowseJobs([]));
        };
    }, [dispatch]);

    const jobsToDisplay = isSearching ? browseJobs : allJobs;
    const title = isSearching ? `Search Results for "${query}"` : "All Available Jobs";
    const isLoading = isSearching ? loading : allJobs.length === 0;

    return (
        <div>
            <Navbar />
            <div className='max-w-7xl mx-auto my-10 px-4'>
                <h1 className='font-bold text-xl my-10'>
                    {title} ({jobsToDisplay?.length || 0})
                </h1>

                {isLoading ? (
                    <p className="text-center text-gray-500 text-lg font-medium animate-pulse">
                        Loading...
                    </p>
                ) : (
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-5'>
                        {jobsToDisplay && jobsToDisplay.length > 0 ? (
                            jobsToDisplay.map((item) => <Job key={item._id} job={item} />)
                        ) : (
                            <div className="col-span-full flex flex-col items-center justify-center py-24">
                                <img
                                    src="https://cdn-icons-png.flaticon.com/512/4076/4076508.png"
                                    alt="No jobs found"
                                    className="w-28 h-28 mb-4 opacity-80"
                                />
                                <h2 className="text-2xl font-bold text-gray-700">
                                    No Jobs Found
                                </h2>
                                <p className="text-gray-500 mt-1 text-center">
                                    Try adjusting your search or check back later.
                                </p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Browse;
