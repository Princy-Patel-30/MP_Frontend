import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Footer = () => {
  return (
    <footer className="bg-dark text-white py-4">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <h5>About Us</h5>
            <p>
              We are a company dedicated to providing the best services to our customers.
            </p>
          </div>
        </div>
        <div className="row mt-3">
          <div className="col text-center">
            <h5>Follow Us</h5>
            <a href="#" className="text-white me-3">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#" className="text-white me-3">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" className="text-white">
              <i className="fab fa-instagram"></i>
            </a>
          </div>
        </div>
        <div className="row mt-3">
          <div className="col text-center">
            <p>&copy; 2025 Clickbook. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;