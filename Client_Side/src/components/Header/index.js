import './index.css'
import logo from '../../images/logo.png'

const Header = () => {
  return (
    <div className="header-section">
      <img src={logo} className="website-logo" alt="website-logo" />
      <ul className="header-items">
        <li className="nav-item">Home</li>
        <li className="nav-item">Feature</li>
        <li className="nav-item">Pricing</li>
        <li className="nav-item">FAQ's</li>
        <li className="nav-item">About</li>
      </ul>
      <div className="header-right-section">
        <input type="search" className="search-bar" placeholder="Search..." />
        <button type="button" className="login-btn">Login</button>
        <button type="button" className="signup-btn">Signup</button>
      </div>
    </div>
  );
}

export default Header;
