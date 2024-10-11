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
import AdminHome from './pages/AdminHome'
import AdminDashboard from './pages/AdminDashboard';
import AdminAuthWrapper from './component/AdminAuthWrapper'

const AppRoutes: React.FC = (): JSX.Element => {
  const location = useLocation(); 

  // Check if the current path is related to admin routes
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <>
      {/*  Admin Routes */}
      {isAdminRoute && (
        <AdminAuthWrapper>
      <Routes>
        
        <Route path="/admin/login" element={<AdminSignIn />} />
        <Route path='/admin/home' element={<AdminHome/>} />
        <Route path='/admin/dashboard' element={<AdminDashboard/>} /> 

      </Routes>

        </AdminAuthWrapper>
      )}
     

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
