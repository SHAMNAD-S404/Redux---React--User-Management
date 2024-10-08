import { useNavigate } from "react-router-dom";
import bgImg from "../assets/new.jpg";
import { useState } from "react";
import OAuth from "../component/OAuth";
import {  ToastContainer , toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const SignUp: React.FC = (): JSX.Element => {
  const navigate = useNavigate();

  const redirectSignIn = () => {
    navigate("/sign-in");
  };

  const [formData, setFormData] = useState({});
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError(false);

      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      setLoading(false);
      
      if (data.error || data.success === false) {
        setError(true);
        toast.error(JSON.stringify(data.error || data),{

          position: "top-right", 
          autoClose: 5000, 
          hideProgressBar: false, 
          closeOnClick: true, 
          pauseOnHover: true, 
          draggable: true, 
        });

        return;
      }

      toast.success(JSON.stringify(data),{
        position: "top-right", 
              autoClose: 5000, 
              hideProgressBar: false, 
              closeOnClick: true, 
              pauseOnHover: true, 
              draggable: true, 
              theme:"dark",
      })
      navigate("/sign-in");
    } catch (error) {
      setLoading(false);
      setError(true);
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row h-[80vh] p-4 m-4 lg:m-10 lg:ms-28 lg:me-28">
      {/* Black section (Sign Up form) */}
      <div className="bg-gray-900 h-full w-full lg:w-1/2 rounded-l-3xl flex flex-col justify-center p-4">
        <h1 className="text-center text-2xl font-semibold font-mono text-white mb-4">
          Sign Up
        </h1>
        <div>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-6 items-center"
          >
            <input
              className="w-3/4 h-10 rounded-lg text-center outline-none"
              type="text"
              id="username"
              placeholder="User name"
              required
              onChange={handleChange}
            />
            <input
              className="w-3/4 h-10 rounded-lg text-center outline-none"
              type="email"
              placeholder="Email"
              id="email"
              required
              onChange={handleChange}
            />
            <input
              className="w-3/4 h-10 rounded-lg text-center outline-none"
              type="password"
              id="password"
              placeholder="Password"
              required
              onChange={handleChange}
            />
            <button
              disabled={loading}
              className="text-white bg-gradient-to-r from-purple-700 to-red-500 p-2 w-24 h-10 rounded-full text-md font-semibold
           hover:text-black hover:bg-gradient-to-r hover:from-green-500 hover:to-yellow-400 transition-all duration-300"
            >
              {loading ? "Loading..." : "Sign Up"}
            </button>

            <OAuth />
          </form>
          <p className="text-white text-center">
            Already have an account?
            <span
              className="text-blue-600 cursor-pointer ms-2 font-semibold hover:text-lime-400"
              onClick={redirectSignIn}
            >
              Sign in?
            </span>
          </p>

          {/* error showing */}
          <p className="text-red-500  font-mono text-center mt-2">
            {error && "something went wrong !!!"}
          </p>
        </div>
      </div>

      <ToastContainer/>

      {/* Blue section */}
      <div
        className="hidden sm:flex bg-blue-500 h-full w-full lg:w-1/2 overflow-hidden rounded-r-3xl bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${bgImg})` }}
      >
        <div className="flex items-center justify-center h-full w-full bg-black bg-opacity-40">
          <h1 className="text-white font-semibold text-3xl shadow-2xl text-center">
            Welcome Gamers <br /> to <br /> Buy Games
          </h1>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
