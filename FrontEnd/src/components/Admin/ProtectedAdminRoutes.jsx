import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ProtectedAdminRoute = ({ children }) => {
  const { user } = useSelector(store => store.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (user === null || user.role !== 'recruiter') {
      navigate("/home");
    }
  }, []);

  return (
    <>
      {children}
    </>
  );
};

export default ProtectedAdminRoute;

//b ise app.jsx m laga do admin wale route ko protected krne
