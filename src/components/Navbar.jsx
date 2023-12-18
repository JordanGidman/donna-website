function Navbar() {
  return (
    <nav className="navbar">
      <div>Logo</div>
      <ul className="nav-list">
        <li className="nav-link">New Prints</li>
        <li className="nav-link">Gallery</li>
        <li className="nav-link">Contact Me</li>
      </ul>

      <div className="user">
        <span>Jordan</span>
        <button>Sign Out</button>
      </div>
    </nav>
  );
}

export default Navbar;
