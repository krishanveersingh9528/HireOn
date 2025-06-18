import { useNavigate } from "react-router-dom";

const OpeningPage = () => {
  const navigate = useNavigate();

  return (
    <div className="relative w-full h-[90vh] overflow-hidden">
      {/* Background Image */}
      <img
        src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
        alt="Career Banner"
        className="w-full h-full object-cover"
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent"></div>

      {/* Hero Content */}
      <div className="absolute inset-0 flex flex-col justify-center px-6 md:px-20">
        <h1 className="text-white text-4xl md:text-6xl font-extrabold leading-tight drop-shadow-xl animate-fade-in">
          Find Your <span className="text-blue-500">Dream Job</span>
        </h1>
        <p className="text-gray-200 text-lg md:text-xl mt-4 max-w-xl drop-shadow animate-fade-in">
          Explore top job opportunities that match your passion and potential. Your career journey starts here.
        </p>
        <button
          onClick={() => navigate("/home")}
          className="mt-6 w-fit px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl shadow-lg transition duration-300 animate-fade-in cursor-pointer"
        >
          Browse Jobs or Post Job
        </button>
      </div>
    </div>
  );
};

export default OpeningPage;
