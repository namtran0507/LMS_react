import React, { useState, useEffect } from 'react';
import './std_classes.css';

const StdClasses = ({ userId }) => {
    const [classes, setClasses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch data from API using user_id
    useEffect(() => {
        const fetchClasses = async () => {
            try {
                const response = await fetch(`http://192.168.1.9:8000/student/${userId}/classes`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setClasses(data.result);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        if (userId) {
            fetchClasses();
        }
    }, [userId]);

    if (loading) {
        return <p>Loading classes...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div className="std-classes-page">
            <h1 className="page-title">My Classes</h1>

            {/* Classes Table */}
            <div className="classes-table-wrapper">
                <table className="classes-table">
                    <thead>
                        <tr>
                            <th>Class ID</th>
                            <th>Course ID</th>
                            <th>Location</th>
                            <th>Start Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {classes.map((classInfo) => (
                            <tr key={classInfo.class_id}>
                                <td>{classInfo.class_id}</td>
                                <td>{classInfo.course_id}</td>
                                <td>{classInfo.block_location}</td>
                                <td>{classInfo.block_start_time}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default StdClasses;
