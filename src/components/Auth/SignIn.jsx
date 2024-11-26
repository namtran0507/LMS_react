import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import BASE_URL from "../../apiconfig.js";


function SignInForm() {
  const [state, setState] = useState({
    username: "",
    password: ""
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = evt => {
    const value = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value
    });
  };
  
  const handleOnSubmit = async evt => {
    evt.preventDefault();

    const { username, password } = state;
    setLoading(true);
    try {
      const response = await axios.post(`${BASE_URL}/auth`, {
        username,
        password,
      });

      // Save token and role
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('username',username);
      localStorage.setItem('role', response.data.role);
      

      toast.success("Login successful!");
      navigate('/dashboard');

    } catch (error) {
      if (error.response && error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An error occurred while signing in!");
      }
    } finally {
      setLoading(false);
    }

    setState({ username: "", password: "" });
  };

  return (
    <div className="form-container sign-in-container">
      <form onSubmit={handleOnSubmit}>
        <h1>Sign in</h1>
        <br />
        <span>or use your account</span>
        <input
          type="text"
          placeholder="Username"
          name="username"
          value={state.username}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={state.password}
          onChange={handleChange}
        />
        <a href="#">Forgot your password?</a>
        <button type="submit" disabled={loading}>
          {loading ? "Signing in..." : "Sign In"}
        </button>
      </form>
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
    </div>
  );
}

export default SignInForm;
