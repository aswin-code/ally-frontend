import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import {
  RouterProvider,
  Route,
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
import Otp from "./Pages/otp/Otp";

function App() {
  const currentUser = true
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
    if (!currentUser) {
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
        }
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
    </div>
  );
};

export default App;
