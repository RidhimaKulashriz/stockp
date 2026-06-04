import React, { useState } from "react";
import "./Signup.css";

function Signup() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3012";
      const DASHBOARD_URL = process.env.REACT_APP_DASHBOARD_URL || "http://localhost:3000";
      console.log("API_URL:", API_URL);
      console.log("DASHBOARD_URL:", DASHBOARD_URL);
      const endpoint = isLogin ? `${API_URL}/login` : `${API_URL}/signup`;
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log("Response data:", data);
      
      if (response.ok) {
        if (isLogin) {
          localStorage.setItem("token", data.token);
          localStorage.setItem("user", JSON.stringify(data.user));
          console.log("Redirecting to:", `${DASHBOARD_URL}?token=${data.token}`);
          console.log("Token:", data.token);
          console.log("User:", data.user);
          // Use window.location.href instead of replace
          window.location.href = `${DASHBOARD_URL}?token=${data.token}`;
        } else {
          alert("Signup successful! Please login.");
          setIsLogin(true);
        }
      } else {
        alert(data.error || "Authentication failed");
      }
    } catch (error) {
      console.error("Auth error:", error);
      alert("Server error. Please try again.");
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <h2>{isLogin ? "Sign In" : "Sign Up"}</h2>
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="form-group">
              <label>Username</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>
          )}
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="submit-btn">
            {isLogin ? "Sign In" : "Sign Up"}
          </button>
        </form>
        <p className="toggle-text">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <span onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? "Sign Up" : "Sign In"}
          </span>
        </p>
      </div>
    </div>
  );
}

export default Signup;
