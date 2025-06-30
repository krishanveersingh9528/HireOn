import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import Home from "./components/Home";
import Jobs from "./components/Jobs";
import Browse from "./components/Browse";
import Profile from "./components/Profile";
import JobDescription from "./components/JobDescription";
import Companies from "./components/Admin/Companies";
import ComapniesCreate from "./components/Admin/ComapniesCreate";
import CompanySetup from "./components/Admin/CompanySetup";
import AdminJobs from "./components/Admin/AdminJobs";
import PostJobs from "./components/Admin/PostJobs";
import Applicants from "./components/Admin/Applicants";
import ProtectedAdminRoute from "./components/Admin/ProtectedAdminRoutes";
import OpeneningPage from "./components/OpeneningPage";


const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <OpeneningPage/>
  },
  {
    path: "/home",
    element: <Home/>
  },
  {
    path: "/login",
    element:  <Login />
  },
  {
    path: "/signup",
    element:<Signup/>
  },
  {
    path: "/jobs",
    element: <Jobs />
  },
  {
    path: "/browse",
    element:<Browse />
  },
  {
    path: "/profile",
    element: <Profile />
  },
  {
    path: "/description/:id",
    element:<JobDescription /> 
  },

  // ✅ Protected admin routes
  {
    path: "/admin/companies",
    element: <ProtectedAdminRoute><Companies /></ProtectedAdminRoute>
  },
  {
    path: "/admin/companies/create",
    element: <ProtectedAdminRoute><ComapniesCreate /></ProtectedAdminRoute>
  },
  {
    path: "/admin/companies/:id",
    element: <ProtectedAdminRoute><CompanySetup /></ProtectedAdminRoute>
  },
  {
    path: "/admin/jobs",
    element: <ProtectedAdminRoute><AdminJobs /></ProtectedAdminRoute>
  },
  {
    path: "/admin/jobs/create",
    element: <ProtectedAdminRoute><PostJobs /></ProtectedAdminRoute>
  },
  {
    path: "/admin/application/:id/applicants",
    element: <ProtectedAdminRoute><Applicants /></ProtectedAdminRoute>
  }
]);

function App() {
  return <RouterProvider router={appRouter} />;
}

export default App;
