import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ProtectedRoute from "./routes/ProtectedRoute";
import Profile from "./pages/Profile.jsx";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={ <Signup /> } />
        <Route path="/login" element={ <Login /> } />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route path="/profile/:userId" element={ <Profile/> }/>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
