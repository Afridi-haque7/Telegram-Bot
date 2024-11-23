import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { Navigate } from "react-router-dom";

import Login from "./Login";

const Home = () => {
  const [credentialResponse, setCredentialResponse] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (credentialResponse !== null) {
      try {
        var decoded = jwtDecode(credentialResponse.credential);
        console.log("Decoded:", decoded);
        setUser(decoded.name); // Assuming the JWT contains a `name` field
      } catch (error) {
        console.error("Error decoding JWT:", error);
      }
    }
  }, [credentialResponse]);

  if (user) {
    console.log(user);
    localStorage.setItem("user", user);
    return <Navigate to="/dashboard" />;
  }

  return (
    <div>
      <div className="flex flex-col justify-center items-center p-10">
        <div className="font-semibold text-xl mb-10">
          Welcome to Weather Bot Admin Panel
        </div>
        <p className="font-semibold text-lg mb-5">
          Please login to access the Dashboard.
        </p>
        <div className="flex justify-center">
          <Login setCredentialResponse={setCredentialResponse} />
        </div>
      </div>
    </div>
  );
};

export default Home;
