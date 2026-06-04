import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import Dashboard from "./Dashboard";
import TopBar from "./TopBar";

const Home = () => {
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const token = searchParams.get("token");
    console.log("Dashboard - Token from URL:", token);
    if (token) {
      localStorage.setItem("token", token);
      console.log("Dashboard - Token stored in localStorage");
      window.history.replaceState({}, document.title, window.location.pathname);
    } else {
      console.log("Dashboard - No token in URL, checking localStorage");
      const storedToken = localStorage.getItem("token");
      console.log("Dashboard - Token from localStorage:", storedToken);
    }
  }, [searchParams]);

  return (
    <>
      <TopBar />
      <Dashboard />
    </>
  );
};

export default Home;
