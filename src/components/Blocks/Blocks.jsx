import React, { useState, useEffect } from 'react';
import './Blocks.css';
import BASE_URL from "../../apiconfig.js";

const Blocks = () => {
    const [blocks, setBlocks] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showConfirm, setShowConfirm] = useState(false);
    const [selectedBlock, setSelectedBlock] = useState(null);

    // Fetch data from API
    useEffect(() => {
        const fetchBlocks = async () => {
            try {
                const response = await fetch(`${BASE_URL}/admin/blocks`); // Đường dẫn API
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();

                // Format dữ liệu
                const formattedData = data.map((block) => ({
                    id: block.block_id,
                    location: block.location,
                    single: block.single ? 'Yes' : 'No',
                    startTime: block.start_time,
                    weekdays: block.weekdays,
                }));

                setBlocks(formattedData);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchBlocks();
    }, []);

    // Filter blocks by search term
    const filteredBlocks = blocks.filter((block) =>
        block.location.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleDeleteClick = (block) => {
        setSelectedBlock(block);
        setShowConfirm(true);
    };

    const handleConfirmDelete = async () => {
        if (selectedBlock) {
            setShowConfirm(false); // Hide confirmation modal
            try {
                const response = await fetch(`http://127.0.0.1:8000/block/${selectedBlock.id}`, {
                    method: 'DELETE',
                });
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                // Remove deleted block from the state
                setBlocks((prevBlocks) => prevBlocks.filter((block) => block.id !== selectedBlock.id));
                alert('Block deleted successfully!');
            } catch (error) {
                alert('Failed to delete block. Please try again.');
            } finally {
                setSelectedBlock(null);
            }
        }
    };

    const handleCancelDelete = () => {
        setShowConfirm(false);
        setSelectedBlock(null);
    };

    if (loading) {
        return <p>Loading blocks...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div className="blocks-page">
            <h1 className="page-title">Manage Blocks</h1>

            {/* Search Bar */}
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Search blocks by location..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button>Search</button>
            </div>

            {/* Blocks Table */}
            <div className="blocks-table-wrapper">
                <table className="blocks-table">
                    <thead>
                        <tr>
                            <th>Block ID</th>
                            <th>Location</th>
                            <th>Single</th>
                            <th>Start Time</th>
                            <th>Weekdays</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredBlocks.map((block) => (
                            <tr key={block.id}>
                                <td>{block.id}</td>
                                <td>{block.location}</td>
                                <td>{block.single}</td>
                                <td>{block.startTime}</td>
                                <td>{block.weekdays}</td>
                                <td>
                                    <button
                                        className="btn delete"
                                        onClick={() => handleDeleteClick(block)}
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
                        <p>Are you sure you want to delete Block {selectedBlock?.id}?</p>
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

export default Blocks;
