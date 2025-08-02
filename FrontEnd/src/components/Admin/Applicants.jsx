const Applicants = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { applicants } = useSelector((store) => store.application);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllApplicants = async () => {
      try {
        const res = await axios.get(
          `${backendURL}/api/v1/application/${id}/applicants`,
          { withCredentials: true }
        );
        dispatch(setAllApplicants(res.data.job));
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false); // ✅ stops loading after request
      }
    };
    fetchAllApplicants();
  }, [dispatch, id]);

  return (
    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <Navbar />
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-xl font-bold my-5 text-blue-600">
          Applicants <span className="text-sm font-medium text-gray-600">
            ({applicants?.applications?.length || 0})
          </span>
        </h1>

        {loading ? (
          <p className="text-gray-500">Loading applicants...</p> // ✅ show loader/spinner
        ) : (
          <ApplicantsTable />
        )}
      </div>
    </motion.div>
  );
};
