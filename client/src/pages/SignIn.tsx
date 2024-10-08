import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { signInStart,signInFailure,signInSuccess } from "../redux/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { ToastContainer, toast } from "react-toastify";
import OAuth from "../component/OAuth";
import "react-toastify/dist/ReactToastify.css";
import bgImg from "../assets/man.jpg";

const SignIn: React.FC = (): JSX.Element => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const redirectSignUp = () => {
    navigate("/sign-up");
  };

  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state: RootState) => state.user);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      dispatch(signInStart());

      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.error) {
        
        toast.error(JSON.stringify(data.error), {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });

        navigate("/sign-in");
        dispatch(signInFailure(data.error));
        return;
      }
      
      console.log('from signIn.tsx success user data',data.user);
      
      toast.success("Welcome" ,{
        position: "top-right",
        autoClose: 500,
        hideProgressBar: false,
        onClose:()=>{

           dispatch(signInSuccess(data.user));
            navigate("/");
        }
      })

     
    } catch (error) {
      console.log(error);
      dispatch(signInFailure(error));
    }
  };

  return (

    <div className="flex flex-col lg:flex-row h-[80vh] p-4 m-4 lg:m-10 lg:ms-28 lg:me-28">
      {/* Black section (Sign Up form) */}
      <div className="bg-gray-900 h-full w-full lg:w-1/2 rounded-l-3xl flex flex-col justify-center p-4">
        <h1 className="text-center text-2xl font-semibold font-mono text-white mb-4">
          Sign In
        </h1>
        <div>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-6 items-center"
          >
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
              {loading ? "Loading..." : "Sign In"}
            </button>

            <OAuth />
          </form>
          <p className="text-white text-center">
            Dont have an account?
            <span
              className="text-blue-600 cursor-pointer ms-2 font-semibold hover:text-lime-400"
              onClick={redirectSignUp}
            >
              Sign up?
            </span>
          </p>

          {/* error showing */}
          <p className="text-red-500  font-mono text-center mt-2">
            {error ? error || "something went wrong !!!" : ""}
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

export default SignIn;
