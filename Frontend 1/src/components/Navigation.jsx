// ...existing code...
import { NavLink } from "react-router-dom";
import "../style/Navigation.css";

function Navigation() {
  return (
    <nav className="navbar">
      <div className="nav-container">
        <NavLink to="/" className="nav-logo">🌾 AgroExport</NavLink>
        <ul className="nav-menu">
          <li><NavLink to="/" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"} end>Home</NavLink></li>
          <li>
            <NavLink
              to="/special-crops"
              className={({ isActive }) =>
                isActive ? "nav-link nav-link-priority active" : "nav-link nav-link-priority"
              }
            >
              Special Crops
            </NavLink>
          </li>
          <li><NavLink to="/howto" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>How to Use</NavLink></li>
          <li><NavLink to="/faq" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>FAQ</NavLink></li>
          <li><NavLink to="/contact" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Contact</NavLink></li>
          <li><NavLink to="/about" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>About</NavLink></li>
        </ul>
        <div className="nav-actions">
          <NavLink to="/recommend" className="nav-cta">Get Started</NavLink>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
// ...existing code...