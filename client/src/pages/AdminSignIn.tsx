
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import bgImg from "../assets/man.jpg";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import {adminSingInSuccess , adminSignOut} from '../redux/user/userSlice'

const AdminSignIn: React.FC = (): JSX.Element => {

  const [adminId, setAdminId] = useState('');
  const [password , setPassword] = useState('');
  const navigate  = useNavigate();
  const dispatch  = useDispatch();

  const handleAdminLogin = async (event:any) => {

    event.preventDefault()
    try {
      alert('clicked')

      const response =  await axios.post('/api/admin/login',
                { adminId,password },
                { withCredentials:true });

      if(response.data.success){
         dispatch(adminSingInSuccess(response.data.adminId))
         navigate('/admin/home');
      }

    } catch (error) {
      console.error(error);
      
    }
  }
    


  return (

    <div className="flex flex-col lg:flex-row h-[80vh] p-4 m-4 lg:m-10 lg:ms-28 lg:me-28">
      {/* Black section (Sign Up form) */}
      <div className="bg-gray-900 h-full w-full lg:w-1/2 rounded-l-3xl flex flex-col justify-center p-4">
        <h1 className="text-center text-2xl font-semibold font-mono text-white mb-4">
          Sign In
        </h1>
        <div>
          <form
             onSubmit={handleAdminLogin}
            className="flex flex-col gap-6 items-center"
          >
            <input
              className="w-3/4 h-10 rounded-lg text-center outline-none"
              type="email"
              placeholder="Enter email"
              id="email"
              required
              value={adminId}
              onChange={(e) => setAdminId(e.target.value)}
            />
            <input
              className="w-3/4 h-10 rounded-lg text-center outline-none"
              type="password"
              id="password"
              placeholder="Enter Password"
              required
              onChange={(e)=> setPassword(e.target.value)}
            />
            <button
               type="submit"
              className="text-white bg-gradient-to-r from-purple-700 to-red-500 p-2 w-24 h-10 rounded-full text-md font-semibold
           hover:text-black hover:bg-gradient-to-r hover:from-green-500 hover:to-yellow-400 transition-all duration-300"
            >
           
              Sign in
            </button>

          </form>

          {/* error showing */}
          <p className="text-red-500  font-mono text-center mt-2">
            {/* {error ? error || "something went wrong !!!" : ""} */}

          </p>
        </div>
      </div>

      {/* Blue section */}
      <div
        className="hidden sm:flex bg-blue-500 h-full w-full lg:w-1/2 overflow-hidden rounded-r-3xl bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${bgImg})` }}
      >
        <ToastContainer />

        <div className="flex items-center justify-center h-full w-full bg-black bg-opacity-40">
          <h1 className="text-white font-semibold text-3xl shadow-2xl text-center">
            Login To <br /> Buy Games
          </h1>
        </div>
      </div>
    </div>
  );
};

export default AdminSignIn;
