import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import {
  RouterProvider,
  createBrowserRouter,
  Outlet,
  Navigate
} from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import LeftBar from "./components/LeftBar/LeftBar";
import RightBar from "./components/RightBar/RightBar";
import Home from './Pages/Home/Home';
import Profile from './Pages/Profile/Profile';
import './style.scss'
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import { ToastContainer } from 'react-toastify'
import Otp from "./Pages/otp/Otp";
import 'react-toastify/dist/ReactToastify.css';
import PostModal from "./components/modal/createPostModal/ModalBody.jsx/PostModal";
import useAuth from "./hooks/useAuth";





function App() {
  const current = localStorage.getItem('current') || null
  const Layout = () => {

    const { darkMode } = useContext(DarkModeContext)
    return (
      <div className={`theme-${darkMode ? "dark" : "light"}`}>
        <NavBar />
        <div style={{ display: 'flex' }}>
          <LeftBar />
          <div style={{ flex: 6 }}>
            <Outlet />
          </div>
          <RightBar />
        </div>
      </div>
    )
  };
  const ProtectedRoute = ({ children }) => {
    if (!current) {
      return <Navigate to='/login' />
    }
    return children
  };
  const router = createBrowserRouter([
    {
      path: '/',
      element: <ProtectedRoute><Layout /></ProtectedRoute>,
      children: [
        {
          path: '/',
          element: <Home />
        },
        {
          path: '/profile/:id',
          element: <Profile />
        },
      ]
    },
    {
      path: '/login',
      element: <Login />
    },
    {
      path: 'register',
      element: <Register />
    }, {
      path: '/otp',
      element: <Otp />
    }
  ])

  return (
    <div className="App">
      <RouterProvider router={router} />
      <ToastContainer />
      <PostModal />
    </div>
  );
};

export default App;
