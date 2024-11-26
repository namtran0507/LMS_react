import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "./styles.css";
import SignInForm from "./components/Auth/SignIn.jsx";
import SignUpForm from "./components/Auth/SignUp.jsx";
import Dashboard from "./components/Dashboard/Dashboard.jsx";
import Sidebar from "./components/Dashboard/Sidebar.jsx";  // Import Sidebar
import Users from "./components/User/Users.jsx";
import Blocks from "./components/Blocks/Blocks.jsx";
import Classes from "./components/Classes/Classes.jsx";
import Courses from "./components/Courses/Courses.jsx";
import Enrollments from "./components/Enrollments/Enrollments.jsx";
import NotEnroll from "./components/NotEnroll/NotEnroll.jsx";



export default function App() {
  const [type, setType] = useState("signIn");
  
  // Hàm chuyển đổi giữa Sign In và Sign Up
  const handleOnClick = (text) => {
    if (text !== type) {
      setType(text);
      return;
    }
  };

  // Kiểm tra nếu người dùng đã đăng nhập (có token trong localStorage)
  const isAuthenticated = localStorage.getItem('token') !== null;

  const containerClass = "container " + (type === "signUp" ? "right-panel-active" : "");

  return (
    <Router>
      <Routes>
        {/* Route chính cho Sign In/Sign Up */}
        <Route
          path="/"
          element={
            <div className="App">
              <h2>Sign in/up Form</h2>
              <div className={containerClass} id="container">
                <SignUpForm />
                <SignInForm />
                <div className="overlay-container">
                  <div className="overlay">
                    <div className="overlay-panel overlay-left">
                      <h1>Welcome Back!</h1>
                      <p>
                        To keep connected with us please login with your personal info
                      </p>
                      <button
                        className="ghost"
                        id="signIn"
                        onClick={() => handleOnClick("signIn")}
                      >
                        Sign In
                      </button>
                    </div>
                    <div className="overlay-panel overlay-right">
                      <h1>Hello, Friend!</h1>
                      <p>Enter your personal details and start journey with us</p>
                      <button
                        className="ghost "
                        id="signUp"
                        onClick={() => handleOnClick("signUp")}
                      >
                        Sign Up
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          }
        />
        
        {/* Route cho Dashboard, chỉ cho phép truy cập nếu đã đăng nhập */}
        <Route
          path="/dashboard"
          element={isAuthenticated ? (
            <div className="dashboard">
              <Sidebar /> {/* Sidebar nằm trong App */}
              <div className="dashboard--content">
                <Dashboard />
              </div>
            </div>
          ) : (
            <Navigate to="/" />
          )}
        />

        <Route
          path="/admin/users"
          element={isAuthenticated ? (
            <div className="dashboard">
              <Sidebar /> {/* Sidebar nằm trong App */}
              <div className="dashboard--content">
                <Users />
              </div>
            </div>
          ) : (
            <Navigate to="/" />
          )}
        />

        <Route
          path="/admin/blocks"
          element={isAuthenticated ? (
            <div className="dashboard">
              <Sidebar /> {/* Sidebar nằm trong App */}
              <div className="dashboard--content">
                <Blocks />
              </div>
            </div>
          ) : (
            <Navigate to="/" />
          )}
        />

        <Route
          path="/admin/classes"
          element={isAuthenticated ? (
            <div className="dashboard">
              <Sidebar /> {/* Sidebar nằm trong App */}
              <div className="dashboard--content">
                <Classes />
              </div>
            </div>
          ) : (
            <Navigate to="/" />
          )}
        />

        <Route
          path="/admin/courses"
          element={isAuthenticated ? (
            <div className="dashboard">
              <Sidebar /> {/* Sidebar nằm trong App */}
              <div className="dashboard--content">
                <Courses />
              </div>
            </div>
          ) : (
            <Navigate to="/" />
          )}
        />

        <Route
          path="/admin/enrollments"
          element={isAuthenticated ? (
            <div className="dashboard">
              <Sidebar /> {/* Sidebar nằm trong App */}
              <div className="dashboard--content">
                <Enrollments />
              </div>
            </div>
          ) : (
            <Navigate to="/" />
          )}
        />

        <Route
          path="/student/classes"
          element={isAuthenticated ? (
            <div className="dashboard">
              <Sidebar /> {/* Sidebar nằm trong App */}
              <div className="dashboard--content">
                <Enrollments />
              </div>
            </div>
          ) : (
            <Navigate to="/" />
          )}
        />

        <Route
          path="/student/not_enrolled"
          element={isAuthenticated ? (
            <div className="dashboard">
              <Sidebar /> {/* Sidebar nằm trong App */}
              <div className="dashboard--content">
                <NotEnroll />
              </div>
            </div>
          ) : (
            <Navigate to="/" />
          )}
        />



      </Routes>
    </Router>
  );
}
