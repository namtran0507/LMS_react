import React, { useState, useEffect } from 'react';
import './users.css';
import BASE_URL from "../../apiconfig.js";

const Users = () => {
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showConfirm, setShowConfirm] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    
    // Fetch data from API
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch(`${BASE_URL}/admin/users`); // Đường dẫn API
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();

                // Format dữ liệu
                const formattedData = data.map((user) => ({
                    id: user.user_id,
                    name: `${user.last_name} ${user.first_name}`,
                    email: user.email,
                    role: user.role,
                }));

                setUsers(formattedData);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    // Filter users by search term
    const filteredUsers = users.filter((user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleDeleteClick = (user) => {
        setSelectedUser(user);
        setShowConfirm(true);
    };

    const handleConfirmDelete = async () => {
        if (selectedUser) {
            setShowConfirm(false); // Hide the modal immediately
            try {
                const response = await fetch(`http://127.0.0.1:8000/user/${selectedUser.id}`, {
                    method: 'DELETE',
                });
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                // Remove deleted user from the state
                setUsers((prevUsers) => prevUsers.filter((user) => user.id !== selectedUser.id));
                alert('User deleted successfully!');
            } catch (error) {
                alert('Failed to delete user. Please try again.');
            } finally {
                setSelectedUser(null);
            }
        }
    };

    const handleCancelDelete = () => {
        setShowConfirm(false);
        setSelectedUser(null);
    };

    if (loading) {
        return <p>Loading users...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div className="users-page">
            <h1 className="page-title">Manage Users</h1>

            {/* Search Bar */}
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Search users..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button>Search</button>
            </div>

            {/* Users Table */}
            <div className="users-table-wrapper">
                <table className="users-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredUsers.map((user) => (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.role}</td>
                                <td>
                                    <button
                                        className="btn delete"
                                        onClick={() => handleDeleteClick(user)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Confirmation Modal */}
            {showConfirm && (
                <div className="confirm-modal">
                    <div className="modal-content">
                        <p>Are you sure you want to delete {selectedUser?.name}?</p>
                        <button className="btn confirm" onClick={handleConfirmDelete}>
                            Yes
                        </button>
                        <button className="btn cancel" onClick={handleCancelDelete}>
                            No
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Users;
