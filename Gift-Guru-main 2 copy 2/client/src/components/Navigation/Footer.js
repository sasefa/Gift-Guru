import React from 'react';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>© 2023 GiftIdeas. All Rights Reserved.</p>
        <ul className="footer-links">
          <li>
            <a href="/privacy" className="footer-link">
              Privacy Policy
            </a>
          </li>
          <li>
            <a href="/terms" className="footer-link">
              Terms of Service
            </a>
          </li>
          <li>
            <a href="/contact" className="footer-link">
              Contact
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
