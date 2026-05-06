// ...existing code...
import "../style/Home.css";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <div className="footer-logo">🌾 AgroExport</div>
          <p>Helping Indian farmers reach global markets with smarter choices.</p>
        </div>

        <div className="footer-links">
          <div>
            <h4>Product</h4>
            <Link to="/recommend">Predict</Link>
            <Link to="/about">About</Link>
          </div>
          <div>
            <h4>Company</h4>
            <Link to="/contact">Contact</Link>
          </div>
        </div>
      </div>
      <div className="footer-bottom">© {new Date().getFullYear()} AgroExport — Made with care</div>
    </footer>
  );
}

export default Footer;
// ...existing code...