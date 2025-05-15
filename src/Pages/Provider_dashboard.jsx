import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { getGoogleAuthUrl } from '../Slices/authSlice';
import { fetchUserBookings } from '../Slices/BookingSlice';

const Provider_dashboard = () => {
  const { isAuthenticated, user, googleAuthUrl } = useSelector((state) => state.auth);
  const { bookings, loading: bookingLoading, error: bookingError } = useSelector((state) => state.booking);
  const [services, setServices] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const apiUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

  useEffect(() => {
    if (!isAuthenticated || user?.role !== 'provider') {
      navigate('/login', { replace: true });
      return;
    }

    const fetchServices = async () => {
      try {
        const res = await axios.get(`${apiUrl}/provider/services`, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setServices(res.data);
      } catch (error) {
        console.error('Error fetching services:', error.response?.data?.message || error.message);
      }
    };

    fetchServices();
    dispatch(fetchUserBookings());
    dispatch(getGoogleAuthUrl());
  }, [isAuthenticated, user, navigate, dispatch]);

  const handleGoogleLink = () => {
    if (googleAuthUrl) {
      window.location.href = googleAuthUrl;
    } else {
      alert('Google account linking is not available.');
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">Provider Dashboard</h2>

      {/* Google Account Linking */}
      <div className="mb-4 text-center">
        <h4>Link Google Account</h4>
        <p>Link your Google account to enable calendar integration for bookings.</p>
        <button
          className="btn btn-outline-danger"
          onClick={handleGoogleLink}
          disabled={!googleAuthUrl}
        >
          Link Google Account
        </button>
      </div>

      {/* Services Section */}
      <h3 className="mb-3">Your Services</h3>
      {services.length === 0 ? (
        <p className="text-muted">No services available. Add one in Service Form.</p>
      ) : (
        <div className="row">
          {services.map((service) => (
            <div className="col-md-4 mb-4" key={service._id}>
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">{service.serviceTitle}</h5>
                  <p className="card-text">Company: {service.companyName}</p>
                  <p className="card-text">Price: ₹{service.price}</p>
                  <p className="card-text">Status: {service.status}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Bookings Section */}
      <h3 className="mb-3 mt-5">Your Bookings</h3>
      {bookingLoading ? (
        <p>Loading bookings...</p>
      ) : bookingError ? (
        <p className="text-danger">{bookingError}</p>
      ) : bookings.length === 0 ? (
        <p className="text-muted">No bookings found.</p>
      ) : (
        <div className="row">
          {bookings.map((booking) => (
            <div className="col-md-4 mb-4" key={booking._id}>
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">{booking.service?.serviceTitle}</h5>
                  <p className="card-text">User: {booking.user?.name}</p>
                  <p className="card-text">
                    Scheduled: {new Date(booking.scheduledDate).toLocaleString()}
                  </p>
                  <p className="card-text">Status: {booking.status}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Provider_dashboard;