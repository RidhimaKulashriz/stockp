import React, { useState, useEffect } from "react";

import { Link } from "react-router-dom";

const Menu = () => {
  const [selectedMenu, setSelectedMenu] = useState(0);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      // Check URL for token first (takes priority over localStorage)
      const urlParams = new URLSearchParams(window.location.search);
      const token = urlParams.get("token");
      console.log("Token from URL:", token);
      
      if (token) {
        // Clear old localStorage data when new token is provided
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        
        try {
          const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3012";
          console.log("Fetching user profile from:", `${API_URL}/user/profile?token=${token}`);
          const response = await fetch(`${API_URL}/user/profile?token=${token}`);
          console.log("Response status:", response.status);
          if (response.ok) {
            const userData = await response.json();
            console.log("User data received:", userData);
            setUser(userData);
            localStorage.setItem("user", JSON.stringify(userData));
            localStorage.setItem("token", token);
            // Clean URL by removing token parameter
            window.history.replaceState({}, document.title, window.location.pathname);
            return;
          } else {
            console.error("Failed to fetch user profile. Status:", response.status);
          }
        } catch (error) {
          console.error("Failed to fetch user profile:", error);
        }
      }

      // If no token in URL, check localStorage
      const userData = localStorage.getItem("user");
      console.log("localStorage user data:", userData);
      if (userData) {
        setUser(JSON.parse(userData));
      }
    };

    fetchUserData();
  }, []);

  const handleMenuClick = (index) => {
    setSelectedMenu(index);
  };

  const handleProfileClick = (index) => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };

  const menuClass = "menu";
  const activeMenuClass = "menu selected";

  return (
    <div className="menu-container">
      <img src="logo.png" style={{ width: "50px" }} />
      <div className="menus">
        <ul>
          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/"
              onClick={() => handleMenuClick(0)}
            >
              <p className={selectedMenu === 0 ? activeMenuClass : menuClass}>
                Dashboard
              </p>
            </Link>
          </li>
          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/orders"
              onClick={() => handleMenuClick(1)}
            >
              <p className={selectedMenu === 1 ? activeMenuClass : menuClass}>
                Orders
              </p>
            </Link>
          </li>
          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/holdings"
              onClick={() => handleMenuClick(2)}
            >
              <p className={selectedMenu === 2 ? activeMenuClass : menuClass}>
                Holdings
              </p>
            </Link>
          </li>
          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/positions"
              onClick={() => handleMenuClick(3)}
            >
              <p className={selectedMenu === 3 ? activeMenuClass : menuClass}>
                Positions
              </p>
            </Link>
          </li>
          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="funds"
              onClick={() => handleMenuClick(4)}
            >
              <p className={selectedMenu === 4 ? activeMenuClass : menuClass}>
                Funds
              </p>
            </Link>
          </li>
          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/apps"
              onClick={() => handleMenuClick(6)}
            >
              <p className={selectedMenu === 6 ? activeMenuClass : menuClass}>
                Apps
              </p>
            </Link>
          </li>
        </ul>
        <hr />
        <div className="profile" onClick={handleProfileClick}>
          <div className="avatar">{user ? user.username.substring(0, 2).toUpperCase() : "ZU"}</div>
          <p className="username">{user ? user.username : "USERID"}</p>
        </div>
      </div>
    </div>
  );
};

export default Menu;
