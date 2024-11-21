import React, { useState, useEffect } from 'react';
import './enrollments.css';

const Enrollments = () => {
    const [enrollments, setEnrollments] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showConfirm, setShowConfirm] = useState(false);
    const [selectedEnrollment, setSelectedEnrollment] = useState(null);

    // Fetch data from API
    useEffect(() => {
        const fetchEnrollments = async () => {
            try {
                const response = await fetch('http://192.168.1.9:8000/admin/enrollments');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();

                // Format dữ liệu
                const formattedData = data.map((enrollment) => ({
                    classId: enrollment.class_id,
                    userId: enrollment.user_id,
                }));

                setEnrollments(formattedData);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchEnrollments();
    }, []);

    // Filter enrollments by search term
    const filteredEnrollments = enrollments.filter((enrollment) =>
        enrollment.classId.toString().toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleDeleteClick = (enrollment) => {
        setSelectedEnrollment(enrollment);
        setShowConfirm(true);
    };

    const handleConfirmDelete = async () => {
        if (selectedEnrollment) {
            setShowConfirm(false); // Hide confirmation modal
            try {
                const response = await fetch(
                    `http://192.168.1.9:8000/enrollment/${selectedEnrollment.classId}/${selectedEnrollment.userId}`,
                    { method: 'DELETE' }
                );
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                // Remove deleted enrollment from the state
                setEnrollments((prevEnrollments) =>
                    prevEnrollments.filter(
                        (enrollment) =>
                            !(
                                enrollment.classId === selectedEnrollment.classId &&
                                enrollment.userId === selectedEnrollment.userId
                            )
                    )
                );
                alert('Enrollment deleted successfully!');
            } catch (error) {
                alert('Failed to delete enrollment. Please try again.');
            } finally {
                setSelectedEnrollment(null);
            }
        }
    };

    const handleCancelDelete = () => {
        setShowConfirm(false);
        setSelectedEnrollment(null);
    };

    if (loading) {
        return <p>Loading enrollments...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div className="enrollments-page">
            <h1 className="page-title">Manage Enrollments</h1>

            {/* Search Bar */}
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Search enrollments by class ID..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button>Search</button>
            </div>

            {/* Enrollments Table */}
            <div className="enrollments-table-wrapper">
                <table className="enrollments-table">
                    <thead>
                        <tr>
                            <th>Class ID</th>
                            <th>User ID</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredEnrollments.map((enrollment) => (
                            <tr key={`${enrollment.classId}-${enrollment.userId}`}>
                                <td>{enrollment.classId}</td>
                                <td>{enrollment.userId}</td>
                                <td>
                                    <button
                                        className="btn delete"
                                        onClick={() => handleDeleteClick(enrollment)}
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
                        <p>
                            Are you sure you want to delete enrollment for Class ID: "
                            {selectedEnrollment?.classId}" and User ID: "
                            {selectedEnrollment?.userId}"?
                        </p>
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

export default Enrollments;
