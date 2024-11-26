import React, { useState, useEffect } from 'react';
import './NotEnroll.css';
import BASE_URL from "../../apiconfig.js";

const NotEnroll = () => {
    const [notEnrolledClasses, setNotEnrolledClasses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch data from API
    useEffect(() => {
        const fetchNotEnrolledClasses = async () => {
            try {
                const token = localStorage.getItem('token'); // Lấy token từ localStorage
                const response = await fetch(`${BASE_URL}/student/${token}/not_enrolled`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setNotEnrolledClasses(data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchNotEnrolledClasses();
    }, []);

    // Handle Enroll
    const handleEnroll = async (classId) => {
        try {
            const token = localStorage.getItem('token'); // Lấy token từ localStorage
            const response = await fetch(
                `http://192.168.80.44:8000/student/${token}/not_enrolled/enroll/${classId}`,
                {
                    method: 'POST',
                }
            );
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            alert('Enrolled successfully!');
            // Update the state to remove the enrolled class from the list
            setNotEnrolledClasses((prevClasses) =>
                prevClasses.filter((classItem) => classItem.class_id !== classId)
            );
        } catch (err) {
            alert('Failed to enroll. Please try again.');
        }
    };

    if (loading) {
        return <p>Loading not enrolled classes...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div className="not-enroll-page">
            <h1 className="page-title">Not Enrolled Classes</h1>
            <div className="not-enroll-table-wrapper">
                <table className="not-enroll-table">
                    <thead>
                        <tr>
                            <th>Block ID</th>
                            <th>Class ID</th>
                            <th>Course ID</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {notEnrolledClasses.map((classItem, index) => (
                            <tr key={index}>
                                <td>{classItem.block_id}</td>
                                <td>{classItem.class_id}</td>
                                <td>{classItem.course_id}</td>
                                <td>
                                    <button
                                        className="btn enroll"
                                        onClick={() => handleEnroll(classItem.class_id)}
                                    >
                                        Enroll
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

export default NotEnroll;
