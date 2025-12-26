import React, { useContext } from "react";
import "./Navbar.css";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { user, logout, isLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <h2 className="logo">Facebook</h2>
      </div>

      {isLoggedIn ?
        (
          <>
          <div className="navbar-center">
        <input
          type="text"
          placeholder="Search Facebook"
          className="search-input"
        />
      </div>
          <div className="navbar-right">
        <button className="nav-btn">Home</button>
          <div className="profile">
            <span className="avatar">{user?.name?.[0]}</span>
            <span className="username">{user?.name}</span>
            <button className="nav-btn" onClick={logout}>
              Logout
            </button>
          </div>
          </div>
          </>
        ) :
        (<button className="nav-btn" onClick={() => navigate("/login")}>
              Log In
            </button>)
      }

    </nav>
  );
};

export default Navbar;
