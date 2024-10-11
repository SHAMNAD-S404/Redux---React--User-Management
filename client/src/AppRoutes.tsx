import { Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import About from './pages/About';
import Header from './component/Header';
import Profile from './pages/Profile';
import PrivateRoute from './component/PrivateRoute';
import AuthWrapper from './component/AuthWrapper';
import AdminSignIn from './pages/AdminSignIn';

const AppRoutes: React.FC = (): JSX.Element => {
  const location = useLocation(); // Now inside the BrowserRouter

  // Check if the current path is related to admin routes
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <>
      {/* Separate Admin Routes */}
      <Routes>
        <Route path="/admin/login" element={<AdminSignIn />} />
        {/* Add more admin routes here */}
      </Routes>

      {/* User Routes with AuthWrapper */}
      {!isAdminRoute && (
        <AuthWrapper>
          {/* Render Header for user routes */}
          <Header />
          <Routes>
            {/* User Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/about" element={<About />} />
            
            {/* Private Route for authenticated users */}
            <Route element={<PrivateRoute />}>
              <Route path="/profile" element={<Profile />} />
            </Route>
          </Routes>
        </AuthWrapper>
      )}
    </>
  );
};


export default AppRoutes;
