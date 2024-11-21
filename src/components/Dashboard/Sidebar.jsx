import React from 'react';
import {
  BiLogOut,
  BiBookAlt,
  BiGroup,
  BiTask,
  BiStats,
  BiUser,
  BiFile
} from 'react-icons/bi';
import '../../styles/dashboard/sidebar.css';
import { useNavigate } from 'react-router-dom';

const Sidebar = ({ setActiveSection }) => {
  const navigate = useNavigate();

  // Retrieve username and role from localStorage
  const username = localStorage.getItem('username') || "User";
  const role = localStorage.getItem('role') || "guest";

  const menus = {
    teacher: [
      { label: "Courses", icon: <BiBookAlt />, section: "courses" },
      { label: "Students", icon: <BiGroup />, section: "students" },
      { label: "Materials", icon: <BiFile />, section: "materials" },
      { label: "Submissions", icon: <BiStats />, section: "submissions" },
      { label: "Assignments", icon: <BiTask />, section: "assignments" }
    ],
    student: [
      { label: "Not Enrolled ", icon: <BiBookAlt />, section: "not_enrolled" },
      { label: "Enrolled Classes", icon: <BiGroup />, section: "classes" },
      { label: "Assignments", icon: <BiTask />, section: "assignments" },
      { label: "Scores", icon: <BiStats />, section: "scores" },
      { label: "Materials", icon: <BiFile />, section: "materials" }
    ],
    
    admin: [
      { label: "Users", icon: <BiUser />, section: "users" },
      { label: "Blocks", icon: <BiGroup />, section: "blocks" },
      { label: "Classes", icon: <BiBookAlt />, section: "classes" },
      { label: "Courses", icon: <BiFile />, section: "courses" },
      { label: "Enrollments", icon: <BiTask />, section: "enrollments" }
    ]
  };

  const handleLogout = () => {
    // Remove token, role, and username from localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('username');
    // Navigate to login page
    navigate('/');
  };

  const handleMenuClick = (section) => {
    if (role === 'admin') {
      // For admin, navigate to /admin/<section>
      navigate(`/admin/${section}`);
    } else if (role === 'teacher') {
      // For teacher, navigate to /teacher/<section>
      navigate(`/teacher/${section}`);
    } else if (role === 'student') {
      // For student, navigate to /student/<section>
      navigate(`/student/${section}`);
    } else {
      // Default behavior for other roles or guests
      setActiveSection(section);
    }
  };
  

  return (
    <div className="menu">
      <div className="user-info">
        <h2>{`${username} (${role})`}</h2>
      </div>
      <div className="menu--list">
        {menus[role]?.map((menu, index) => (
          <a
            key={index}
            href="#"
            className="item"
            onClick={() => handleMenuClick(menu.section)}
          >
            {menu.icon}
            {menu.label}
          </a>
        ))}
      </div>
      <div className="logout">
        <button className="logout-btn" onClick={handleLogout}>
          <BiLogOut className="logout-icon" /> Log Out
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
