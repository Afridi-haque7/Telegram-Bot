import React from "react";
import { googleLogout } from "@react-oauth/google";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const LogoutButton = () => {
  const navigate = useNavigate(); // Initialize navigate
  const handleLogout = () => {
    googleLogout();
    console.log("pressed");
    localStorage.removeItem("user");
    navigate("/"); // Use navigate to go to the root path
  };

  return (
    <>
      <div>
        <button className="border border-red-500 p-2 rounded-lg text-red-500 hover:bg-red-500 hover:text-white"onClick={handleLogout}>Logout</button>
      </div>
    </>
  );
};

export default LogoutButton;
