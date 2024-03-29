import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

function Navbar() {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [showMobileNav, setShowMobileNav] = useState(false);

  function toggleOpenNav() {
    setShowMobileNav((prevVal) => !prevVal);
  }

  return (
    <nav className={`navbar ${showMobileNav ? "fullscreen-nav" : ""}`}>
      <div className="nav-wrapper">
        <div
          className="logo"
          onClick={() => {
            navigate("/");
            setShowMobileNav(false);
          }}
        >
          Logo
        </div>
        <ul className={`nav-list ${showMobileNav ? "show-mobile-nav" : ""}`}>
          <li
            className="nav-link"
            onClick={() => {
              navigate("/gallery");
              setShowMobileNav(false);
            }}
          >
            Gallery
          </li>
          <li
            className="nav-link"
            onClick={() => {
              navigate("/contact");
              setShowMobileNav(false);
            }}
          >
            Contact Me
          </li>
          {currentUser?.uid === "TPrNEyUfJsTLnxqVulhlAKrPfBF2" && (
            <li
              className="nav-link"
              onClick={() => {
                navigate("/admin");
                setShowMobileNav(false);
              }}
            >
              Admin
            </li>
          )}
        </ul>
      </div>

      <div className={`user-wrapper ${showMobileNav ? "show-mobile-nav" : ""}`}>
        {currentUser ? (
          <>
            <span className="user-name">{currentUser.displayName}</span>
            <button className="btn-signout" onClick={() => signOut(auth)}>
              Sign out
            </button>
          </>
        ) : (
          <>
            <button className="btn-signup" onClick={() => navigate("/signup")}>
              Sign Up
            </button>
            <button className="btn-signup" onClick={() => navigate("/signin")}>
              Sign In
            </button>
          </>
        )}
      </div>

      <button
        className={`mobile-nav-btn ${showMobileNav ? "show-mobile-nav" : ""}`}
        onClick={toggleOpenNav}
        aria-label="Menu"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="burger-icon"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>
      </button>
    </nav>
  );
}

export default Navbar;
