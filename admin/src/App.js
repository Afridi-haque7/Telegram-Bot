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
