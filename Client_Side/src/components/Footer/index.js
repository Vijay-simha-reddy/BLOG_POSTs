import './index.css';

const Footer = () => {
  return (
    <footer className="footer-section">
      <div className="footer-container">
        <p className="footer-text">
          &copy; {new Date().getFullYear()} My Blog. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
