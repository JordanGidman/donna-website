import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

function Navbar() {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <div className="nav-wrapper">
        <div className="logo" onClick={() => navigate("/")}>
          Logo
        </div>
        <ul className="nav-list">
          <li className="nav-link">New Prints</li>
          <li className="nav-link">Gallery</li>
          <li className="nav-link">Contact Me</li>
          {currentUser && <li className="nav-link">Admin</li>}
        </ul>
      </div>

      {currentUser ? (
        <div className="user-wrapper">
          <span className="user-name">{currentUser.displayName}</span>
          <button className="btn-signout" onClick={() => signOut(auth)}>
            Sign out
          </button>
        </div>
      ) : (
        <div className="user-wrapper">
          <button className="btn-signup" onClick={() => navigate("/signup")}>
            Sign Up
          </button>
          <button className="btn-signup" onClick={() => navigate("/signin")}>
            Sign In
          </button>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
