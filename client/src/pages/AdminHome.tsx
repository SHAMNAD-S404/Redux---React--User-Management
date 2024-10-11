import axios from 'axios';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { adminSignOut } from '../redux/user/userSlice';

const Home: React.FC = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSignOut = async () => {
        try {
            const response = await axios.get('/api/admin/sign-out',{
                withCredentials:true
            })
            
            if(response.data.success){
                dispatch(adminSignOut())
                navigate('/admin/login')
            }

        } catch (error) {
            console.error(error);
            
        }
    }

    const gotoDashboard = async ()=>{

        try {          
            const response = await axios.get('/api/admin/dashboard',{
                withCredentials:true,
            })
            
            if (response.status === 200) {              
                navigate('/admin/dashboard')
            }    

        } catch (error) {
            console.error(error);         
        }
    }



  return (
    <div className="flex items-center justify-center h-screen bg-gray-100 flex-col">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">Welcome Admin</h1>
  
          <button
            type='button'
            onClick={gotoDashboard}
           className="mt-4 px-6 w-52 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-700">
            Go to Dashboard
          </button>
     
      
      </div>
      
      <div className= "">
      <button
       type='button'
       onClick={handleSignOut}
       className="mt-4 w-52 px-6 py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-green-600">
            Sign out 
      </button>
      </div>
    </div>
  );
};

export default Home;
