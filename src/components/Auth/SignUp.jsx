import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BASE_URL from "../../apiconfig.js";

function SignUpForm() {
  const [state, setState] = useState({
    user_id: "",
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    password: "",
    role: "student",
  });

  const handleChange = (evt) => {
    const value = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value,
    });
  };

  const handleOnSubmit = async (evt) => {
    evt.preventDefault();

    const { user_id, first_name, last_name, username, email, password, role } = state;

    try {
      const response = await axios.post(`${BASE_URL}/users`, 
        { user_id, first_name, last_name, username, email, password, role }, 
        { headers: { "Content-Type": "application/json" } }
      );

      if (response.status === 201) {
        toast.success("Account created successfully!");
      } else {
        console.log("Response data:", response.data);
        toast.error(`Error: ${response.data}`);
      }
    } catch (error) {
      console.error("Error occurred during fetch:", error);
      if (error.response?.status === 400) {
        toast.error("Account already exists!");
      } else {
        toast.error(`Error: ${error.message}`);
      }
    }

    setState({
      user_id: "",
      first_name: "",
      last_name: "",
      username: "",
      email: "",
      password: "",
      role: "student",
    });
  };

  return (
    <div className="form-container sign-up-container">
      <form onSubmit={handleOnSubmit}>
        <h1>Create Account</h1>
        <br />
        <span>or use your email for registration</span>
        <input type="text" name="user_id" value={state.user_id} onChange={handleChange} placeholder="User ID" required />
        <input type="text" name="first_name" value={state.first_name} onChange={handleChange} placeholder="First Name" required />
        <input type="text" name="last_name" value={state.last_name} onChange={handleChange} placeholder="Last Name" required />
        <input type="text" name="username" value={state.username} onChange={handleChange} placeholder="Username" required />
        <input type="email" name="email" value={state.email} onChange={handleChange} placeholder="Email" required />
        <input type="password" name="password" value={state.password} onChange={handleChange} placeholder="Password" required />
        <select name="role" value={state.role} onChange={handleChange} required>
          <option value="student">Student</option>
          <option value="teacher">Teacher</option>
        </select>
        <button type="submit">Sign Up</button>
      </form>
      <ToastContainer autoClose={5000} />
    </div>
  );
}

export default SignUpForm;