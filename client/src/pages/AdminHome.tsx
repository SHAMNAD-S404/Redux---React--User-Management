import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100 flex-col">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">Welcome Admin</h1>
        <Link to="/admin/dashboard">
          <button className="mt-4 px-6 w-52 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-700">
            Go to Dashboard
          </button>
        </Link>
      
      </div>
      
      <div className= "">
      <button className="mt-4 w-52 px-6 py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-green-600">
            Sign out 
          </button>
      </div>
    </div>
  );
};

export default Home;
