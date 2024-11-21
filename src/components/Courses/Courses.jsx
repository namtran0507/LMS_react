import React, { useState, useEffect } from 'react';
import './courses.css';

const Courses = () => {
    const [courses, setCourses] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showConfirm, setShowConfirm] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState(null);

    // Fetch data from API
    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await fetch('http://192.168.1.9:8000/admin/courses'); // Đường dẫn API
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();

                // Format dữ liệu
                const formattedData = data.map((course) => ({
                    courseId: course.course_id,
                    instructorId: course.instructor_id,
                    name: course.name,
                }));

                setCourses(formattedData);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchCourses();
    }, []);

    // Filter courses by search term
    const filteredCourses = courses.filter((course) =>
        course.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleDeleteClick = (course) => {
        setSelectedCourse(course);
        setShowConfirm(true);
    };

    const handleConfirmDelete = async () => {
        if (selectedCourse) {
            setShowConfirm(false); // Hide confirmation modal
            try {
                const response = await fetch(
                    `http://192.168.1.9:8000/course/${selectedCourse.courseId}`,
                    { method: 'DELETE' }
                );
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                // Remove deleted course from the state
                setCourses((prevCourses) =>
                    prevCourses.filter((course) => course.courseId !== selectedCourse.courseId)
                );
                alert('Course deleted successfully!');
            } catch (error) {
                alert('Failed to delete course. Please try again.');
            } finally {
                setSelectedCourse(null);
            }
        }
    };

    const handleCancelDelete = () => {
        setShowConfirm(false);
        setSelectedCourse(null);
    };

    if (loading) {
        return <p>Loading courses...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div className="courses-page">
            <h1 className="page-title">Manage Courses</h1>

            {/* Search Bar */}
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Search courses by name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button>Search</button>
            </div>

            {/* Courses Table */}
            <div className="courses-table-wrapper">
                <table className="courses-table">
                    <thead>
                        <tr>
                            <th>Course ID</th>
                            <th>Instructor ID</th>
                            <th>Course Name</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredCourses.map((course) => (
                            <tr key={course.courseId}>
                                <td>{course.courseId}</td>
                                <td>{course.instructorId}</td>
                                <td>{course.name}</td>
                                <td>
                                    <button
                                        className="btn delete"
                                        onClick={() => handleDeleteClick(course)}
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
                        <p>Are you sure you want to delete Course "{selectedCourse?.name}"?</p>
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

export default Courses;
