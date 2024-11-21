import React from "react";
import "./assignment.css"; // Tạo file CSS này để định dạng

const assignments = [
  {
    id: 1,
    title: "React Basics",
    description: "Learn the basics of React.js and create your first component.",
    dueDate: "2024-11-25",
    status: "Incomplete",
  },
  {
    id: 2,
    title: "State and Props",
    description: "Understand how state and props work in React applications.",
    dueDate: "2024-11-28",
    status: "Incomplete",
  },
  {
    id: 3,
    title: "React Router",
    description: "Set up routing in your React application using React Router.",
    dueDate: "2024-12-01",
    status: "Complete",
  },
];

const Assignment = () => {
  return (
    <div className="assignment-container">
      <h1>Assignments</h1>
      <div className="assignments-list">
        {assignments.map((assignment) => (
          <div key={assignment.id} className="assignment-card">
            <h3>{assignment.title}</h3>
            <p>{assignment.description}</p>
            <p>
              <strong>Due Date:</strong> {assignment.dueDate}
            </p>
            <p>
              <strong>Status:</strong> {assignment.status}
            </p>
            <button className="action-button">
              {assignment.status === "Complete" ? "View" : "Mark as Complete"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Assignment;
