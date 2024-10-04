    import { useSelector } from "react-redux"
import { RootState } from "../redux/store"
    
    
    const Profile : React.FC = () : JSX.Element => {
      const {currentUser} = useSelector((state:RootState) => state.user)
      return (
        <div className="p-3 max-w-lg mx-auto ">
          
            <h1 
            className="text-3xl font-semibold text-center my-7">
              Profile
            </h1>
            <form className="flex flex-col gap-3">

                <img src={currentUser?.profilePicture} 
                alt="user image"
                className="w-32 h-32 mt-2 self-center object-cover rounded-full" />

                <p 
                  className="ms-2 font-mono text-gray-400 "
                  >User Name
                </p>
                <input 
                  type="text"
                  id="username"
                  defaultValue={currentUser?.username}
                  placeholder="Username"
                  className="bg-slate-100 rounded-lg p-3 "
                  />
                
                <p 
                  className="ms-2 font-mono text-gray-400"
                  >User Email
                </p>

                <input 
                  type="email"
                  id="email"
                  defaultValue={currentUser?.email}
                  placeholder="email"
                  className="bg-slate-100 rounded-lg p-3 "
                  /> 

                <p 
                  className="ms-2 font-mono text-gray-400 "
                  >User Passwod
                </p>

                <input 
                  type="password"
                  id="password"
                  placeholder="Password"
                  className="bg-slate-100 rounded-lg p-3 "
                  />

                <button
                    type="button"
                    className="bg-slate-700 text-white p-3 rounded-lg uppercase
                       hover:opacity-95 disabled:opacity-80"
                    >update

                </button>

                <div className="flex justify-between mt-5 ">

                  <span
                   className="text-white cursor-pointer bg-red-500 p-1.5 rounded-lg font-semibold hover:bg-purple-600"
                   >Delete account

                  </span>

                  <span
                   className="text-white cursor-pointer bg-blue-500 p-1.5 rounded-lg font-semibold hover:bg-green-600 "
                   >Sign out

                  </span>

                </div>



            </form>


        </div>
      )
    }
    
    export default Profile