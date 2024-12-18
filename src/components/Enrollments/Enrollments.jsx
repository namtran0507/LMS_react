import React, { useState, useEffect } from 'react';
import './Enrollments.css';
import BASE_URL from "../../apiconfig.js";

const Enrollments = () => {
    const [enrolledClasses, setEnrolledClasses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch enrolled classes from API
    useEffect(() => {
        const fetchEnrolledClasses = async () => {
            try {
                const token = localStorage.getItem('token'); // Lấy token từ localStorage
                const response = await fetch(`${BASE_URL}/student/${token}/classes`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setEnrolledClasses(data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchEnrolledClasses();
    }, []);

    // Handle delete enrollment
    const handleDelete = async (classId) => {
        try {
            const token = localStorage.getItem('token'); // Lấy token từ localStorage
            const response = await fetch(
                `http://192.168.80.44:8000/student/${token}/remove_enrollment/${classId}`,
                {
                    method: 'DELETE',
                }
            );
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            alert('Enrollment removed successfully!');
            // Update the state to remove the deleted class from the list
            setEnrolledClasses((prevClasses) =>
                prevClasses.filter((classItem) => classItem.class_id !== classId)
            );
        } catch (err) {
            alert('Failed to remove enrollment. Please try again.');
        }
    };

    if (loading) {
        return <p>Loading enrolled classes...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div className="enrollments-page">
            <h1 className="page-title">Enrolled Classes</h1>
            <div className="enrollments-table-wrapper">
                <table className="enrollments-table">
                    <thead>
                        <tr>
                            <th>Block ID</th>
                            <th>Class ID</th>
                            <th>Course ID</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {enrolledClasses.map((classItem, index) => (
                            <tr key={index}>
                                <td>{classItem.block_id}</td>
                                <td>{classItem.class_id}</td>
                                <td>{classItem.course_id}</td>
                                <td>
                                    <button
                                        className="btn delete"
                                        onClick={() => handleDelete(classItem.class_id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Enrollments;
