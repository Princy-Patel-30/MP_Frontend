import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import BookingForm from './BookingForm';
import { fetchUserBookings } from '../Slices/BookingSlice';

function ServiceList() {
  const [services, setServices] = useState([]);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedServiceId, setSelectedServiceId] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const apiUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

  useEffect(() => {
    if (isAuthenticated && location.state?.serviceId) {
      setSelectedServiceId(location.state.serviceId);
      setShowModal(true);
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [isAuthenticated, location, navigate]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get(`${apiUrl}/services`);
        setServices(response.data);
        setError(null);
      } catch (error) {
        console.error('Failed to fetch services:', error.response?.data?.message || error.message);
        setError('Failed to load services. Please try again later.');
      }
    };
    fetchServices();
    dispatch(fetchUserBookings());
  }, [dispatch]);

  const handleBookNow = useCallback((serviceId) => {
    if (isAuthenticated) {
      setSelectedServiceId(serviceId);
      setShowModal(true);
    } else {
      navigate('/login', { state: { serviceId } });
    }
  }, [isAuthenticated, navigate]);

  const handleCloseModal = useCallback(() => {
    setShowModal(false);
    setSelectedServiceId(null);
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">Available Services</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      {services.length === 0 && !error ? (
        <p className="text-muted text-center">No services available.</p>
      ) : (
        <div className="row">
          {services.map((service) => (
            <div className="col-md-4 mb-4" key={service._id}>
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">{service.serviceTitle}</h5>
                  <p className="card-text">{service.description}</p>
                  <p className="card-text">Price: ₹{service.price}</p>
                  <button
                    className="btn btn-primary"
                    onClick={() => handleBookNow(service._id)}
                  >
                    {isAuthenticated ? 'Book Now' : 'Login to Book'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {showModal && (
        <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Book Service</h5>
                <button type="button" className="btn-close" onClick={handleCloseModal}></button>
              </div>
              <div className="modal-body">
                <BookingForm serviceId={selectedServiceId} onClose={handleCloseModal} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ServiceList;