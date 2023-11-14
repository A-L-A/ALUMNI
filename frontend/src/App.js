import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import Navbar from "./components/Navbar";
import Login from "./components/Login"; 
import SignUp from "./components/SignUp"; 
import Home from "./pages/Home"; 
import Events from "./pages/Events"; 
import Footer from "./components/Footer"; 

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/" element={<Home />} />
          <Route path="/events" element={<Events/>} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
