import React, { useState, useEffect } from 'react';
import './classes.css';

const Classes = () => {
    const [classes, setClasses] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showConfirm, setShowConfirm] = useState(false);
    const [selectedClass, setSelectedClass] = useState(null);

    // Fetch data from API
    useEffect(() => {
        const fetchClasses = async () => {
            try {
                const response = await fetch('http://192.168.1.9:8000/admin/classes'); // Đường dẫn API
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();

                // Format dữ liệu
                const formattedData = data.map((cls) => ({
                    blockId: cls.block_id,
                    classId: cls.class_id,
                    courseId: cls.course_id,
                }));

                setClasses(formattedData);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchClasses();
    }, []);

    // Filter classes by search term
    const filteredClasses = classes.filter((cls) =>
        cls.courseId.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleDeleteClick = (cls) => {
        setSelectedClass(cls);
        setShowConfirm(true);
    };

    const handleConfirmDelete = async () => {
        if (selectedClass) {
            setShowConfirm(false); // Hide confirmation modal
            try {
                const response = await fetch(`http://192.168.1.9:8000/class/${selectedClass.classId}`, {
                    method: 'DELETE',
                });
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                // Remove deleted class from the state
                setClasses((prevClasses) =>
                    prevClasses.filter((cls) => cls.classId !== selectedClass.classId)
                );
                alert('Class deleted successfully!');
            } catch (error) {
                alert('Failed to delete class. Please try again.');
            } finally {
                setSelectedClass(null);
            }
        }
    };

    const handleCancelDelete = () => {
        setShowConfirm(false);
        setSelectedClass(null);
    };

    if (loading) {
        return <p>Loading classes...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div className="classes-page">
            <h1 className="page-title">Manage Classes</h1>

            {/* Search Bar */}
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Search classes by ID..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button>Search</button>
            </div>

            {/* Classes Table */}
            <div className="classes-table-wrapper">
                <table className="classes-table">
                    <thead>
                        <tr>
                            <th>Block ID</th>
                            <th>Class ID</th>
                            <th>Course ID</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredClasses.map((cls) => (
                            <tr key={cls.classId}>
                                <td>{cls.blockId}</td>
                                <td>{cls.classId}</td>
                                <td>{cls.courseId}</td>
                                <td>
                                    <button
                                        className="btn delete"
                                        onClick={() => handleDeleteClick(cls)}
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
                        <p>Are you sure you want to delete Class {selectedClass?.classId}?</p>
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

export default Classes;
