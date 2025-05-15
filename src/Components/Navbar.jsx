import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../Slices/authSlice';

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const [expanded, setExpanded] = useState(false);

  const handleToggle = () => setExpanded(!expanded);
  const handleClose = () => setExpanded(false);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
    handleClose();
  };

  const commonLinks = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
  ];

  const roleLinks = {
    provider: [
      { name: 'Add Service', path: '/service_form' },
      { name: 'Service Dashboard', path: '/service_dashboard' },
      { name: 'Provider Dashboard', path: '/provider_dashboard' },
    ],
    admin: [
      { name: 'Admin Dashboard', path: '/admin_dashboard' },
    ],
    consumer: [
      { name: 'User Dashboard', path: '/userdashboard' },
    ],
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light" aria-label="Main navigation">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/" onClick={handleClose}>
          <i className="fas fa-calendar-check me-2" aria-hidden="true"></i>Clickbook
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          aria-controls="navbarNav"
          aria-expanded={expanded}
          aria-label="Toggle navigation"
          onClick={handleToggle}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className={`collapse navbar-collapse${expanded ? ' show' : ''}`} id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {commonLinks.map((link) => (
              <li className="nav-item" key={link.name}>
                <Link className="nav-link" to={link.path} onClick={handleClose}>
                  {link.name}
                </Link>
              </li>
            ))}

            {isAuthenticated &&
              user?.role &&
              roleLinks[user.role]?.map((link) => (
                <li className="nav-item" key={link.name}>
                  <Link className="nav-link" to={link.path} onClick={handleClose}>
                    {link.name}
                  </Link>
                </li>
              ))}

            {isAuthenticated ? (
              <li className="nav-item">
                <button
                  className="btn btn-outline-danger ms-3"
                  onClick={handleLogout}
                  aria-label="Logout"
                >
                  <i className="fas fa-sign-out-alt me-1" aria-hidden="true"></i>Logout
                </button>
              </li>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login" onClick={handleClose}>
                    <i className="fas fa-sign-in-alt me-1" aria-hidden="true"></i>Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="btn btn-primary ms-3" to="/register" onClick={handleClose}>
                    <i className="fas fa-user-plus me-1" aria-hidden="true"></i>Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;