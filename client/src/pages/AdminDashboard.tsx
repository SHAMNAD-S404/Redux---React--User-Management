import React, { useState } from 'react';
import axios from 'axios';

const AdminDashboard: React.FC = () => {
  // Sample data for users
  const users = [
    { id: 1, name: 'John Doe', email: 'johndoe@example.com' },
    { id: 2, name: 'Jane Smith', email: 'janesmith@example.com' },
    { id: 3, name: 'Alice Johnson', email: 'alicejohnson@example.com' },
  ];

  // State for search input and selected user for editing
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<{ id: number; name: string; email: string } | null>(null);
  const [updatedName, setUpdatedName] = useState('');
  const [updatedEmail, setUpdatedEmail] = useState('');

  // Filter users based on the search term
  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Open modal with selected user info
  const handleEditClick = (user: { id: number; name: string; email: string }) => {
    setSelectedUser(user);
    setUpdatedName(user.name);
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
        // Send axios request to backend to update user
        const response = await axios.put(`/api/users/${selectedUser.id}`, {
          name: updatedName,
          email: updatedEmail,
        });

        // If successful, close modal
        if (response.status === 200) {
          console.log('User updated successfully', response.data);
          handleCloseModal(); // Close modal after success
        }
      } catch (error) {
        console.error('Error updating user:', error);
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
        <h2 className="text-2xl font-semibold mb-4 text-center">Users List</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-gray-700 rounded-lg">
            <thead>
              <tr>
                <th className="py-3 px-6 text-left text-gray-300">Name</th>
                <th className="py-3 px-6 text-left text-gray-300">Email</th>
                <th className="py-3 px-6 text-center text-gray-300">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-600 transition-colors">
                    <td className="py-3 px-6 border-b border-gray-600">{user.name}</td>
                    <td className="py-3 px-6 border-b border-gray-600">{user.email}</td>
                    <td className="py-3 px-6 border-b border-gray-600 text-center">
                      <button
                        onClick={() => handleEditClick(user)}
                        className="bg-yellow-500 text-gray-900 px-4 py-2 rounded-lg hover:bg-yellow-600 mr-2"
                      >
                        Edit
                      </button>
                      <button className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600">
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
            <label className="block mb-2 text-gray-300">Name</label>
            <input
              type="text"
              value={updatedName}
              onChange={(e) => setUpdatedName(e.target.value)}
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
