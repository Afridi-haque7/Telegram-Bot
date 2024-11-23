import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Dashboard from "./components/Dashboard";

export default function App() {
  return (
    <header>
      <Routes>
        <Route path="/" exact element={<Home/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
      </Routes>
    </header>
  );
}

/*
GOOGLE_API_KEY=AIzaSyDHIe8BUQYIjf1Obc7GAkJ3l07DJjnLQZA
CLIENT_ID=726133460823-6ti5u3cjo1ltgv6g85eptr973em6bcv9.apps.googleusercontent.com
CLIENT_SECRET_KEY=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

*/ 