import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminDashboard: React.FC = () => {
  const [users, setUsers] = useState<{ _id: string; username: string; email: string }[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<{ _id: string; username: string; email: string } | null>(null);
  const [updatedUsername, setUpdatedUsername] = useState('');
  const [updatedEmail, setUpdatedEmail] = useState('');


  console.log(users);
  

  // Fetch users from the backend when the component mounts
  useEffect(() => {
    const fetchUsers = async () => {



      try {

        const response = await axios.get('/api/admin/getUser'); 

        setUsers(response.data.userData); 
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  // Filter users based on the search term
  const filteredUsers = users.filter(
    (user) =>
      user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Open modal with selected user info
  const handleEditClick = (user: { _id: string; username: string; email: string }) => {
    setSelectedUser(user);
    setUpdatedUsername(user.username);
    setUpdatedEmail(user.email);
    setIsModalOpen(true);
  };

  // Close modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  // Handle update user
  const handleUpdateUser = async () => {
    if (selectedUser) {
      try {
        
        const response = await axios.patch(`/api/admin/update-user/${selectedUser._id}`, {
          username: updatedUsername,
          email: updatedEmail,
        });

        if (response.status === 200) {
          setUsers((prevUsers) =>
            prevUsers.map((user) =>
              user._id === selectedUser._id ? { ...user, username: updatedUsername, email: updatedEmail } : user
            )
          );
          handleCloseModal(); // Close modal after success
        }
      } catch (error) {
        console.error('Error updating user:', error);
      }
    }
  };

  // Handle delete user
  const handleDeleteUser = async (userId: string) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        
        const response = await axios.delete(`/api/admin/delete-user/${userId}`);

        if (response.status === 200) {
          // Refresh users after deletion
          const updatedUsers = users.filter(user => user._id !== userId);
          setUsers(updatedUsers);
        }
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 p-8">
      {/* Search Bar */}
      <div className="max-w-4xl mx-auto mb-6">
        <div className="flex items-center bg-gray-800 p-4 rounded-lg shadow-lg">
          <input
            type="text"
            placeholder="Search user..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-gray-700 text-gray-300 px-4 py-2 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-r-lg">
            Search
          </button>         
        </div>
      </div>

      {/* Users Table */}
      <div className="max-w-4xl mx-auto bg-gray-800 p-6 rounded-lg shadow-lg">

        <button 


        
        className='text-white bg-red-600 '>
            A-Z
        </button>

        <h2 className="text-2xl font-semibold mb-4 text-center">Users List</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-gray-700 rounded-lg">
            <thead>
              <tr>
                <th className="py-3 px-6 text-left text-gray-300">Username</th>
                <th className="py-3 px-6 text-left text-gray-300">Email</th>
                <th className="py-3 px-6 text-center text-gray-300">Actions</th>
              </tr>
            </thead>
            <tbody>


              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <tr key={user._id} className="hover:bg-gray-600 transition-colors">
                    <td className="py-3 px-6 border-b border-gray-600">{user.username}</td>
                    <td className="py-3 px-6 border-b border-gray-600">{user.email}</td>
                    <td className="py-3 px-6 border-b border-gray-600 text-center">
                      <button
                        onClick={() => handleEditClick(user)}
                        className="bg-yellow-500 text-gray-900 px-4 py-2 rounded-lg hover:bg-yellow-600 mr-2"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteUser(user._id)} // Call delete function with user _id
                        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={3} className="py-4 text-center text-gray-400">
                    No users found.
                  </td>
                </tr>
              )}



            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && selectedUser && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-xl font-semibold mb-4">Edit User</h3>
            <label className="block mb-2 text-gray-300">Username</label>
            <input
              type="text"
              value={updatedUsername}
              onChange={(e) => setUpdatedUsername(e.target.value)}
              className="w-full bg-gray-700 text-gray-300 px-4 py-2 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <label className="block mb-2 text-gray-300">Email</label>
            <input
              type="email"
              value={updatedEmail}
              onChange={(e) => setUpdatedEmail(e.target.value)}
              className="w-full bg-gray-700 text-gray-300 px-4 py-2 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="flex justify-end mt-4">
              <button
                onClick={handleCloseModal}
                className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 mr-2"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateUser}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
