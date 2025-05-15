import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import BookingForm from '../Components/BookingForm';
import { fetchUserBookings, resetBookingState } from '../Slices/BookingSlice';
import { fetchServices, resetServiceState } from '../Slices/serviceSlice';

const User_dashboard = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedServiceId, setSelectedServiceId] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { token, isAuthenticated } = useSelector((state) => state.auth);
  const { bookings, loading: bookingLoading, error: bookingError } = useSelector((state) => state.booking);
  const { services, loading: serviceLoading, error: serviceError } = useSelector((state) => state.services);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login', { replace: true });
      return;
    }

    if (location.state?.serviceId) {
      setSelectedServiceId(location.state.serviceId);
      setShowModal(true);
      navigate(location.pathname, { replace: true, state: {} });
    }

    dispatch(fetchServices());
    dispatch(fetchUserBookings());

    return () => {
      dispatch(resetBookingState());
      dispatch(resetServiceState());
    };
  }, [navigate, isAuthenticated, dispatch, location]);

  const handleBookService = (serviceId) => {
    if (isAuthenticated) {
      setSelectedServiceId(serviceId);
      setShowModal(true);
    } else {
      navigate('/login', { state: { serviceId } });
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedServiceId(null);
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">Welcome to Your Dashboard</h2>

      {/* Services Section */}
      <h3 className="mb-3">Available Services</h3>
      {serviceLoading ? (
        <p>Loading services...</p>
      ) : serviceError ? (
        <div className="alert alert-danger">{serviceError}</div>
      ) : services.length === 0 ? (
        <p className="text-muted">No services available.</p>
      ) : (
        <div className="row">
          {services.map((service) => (
            <div className="col-md-4 mb-4" key={service._id}>
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">{service.companyName}</h5>
                  <h6 className="card-subtitle mb-2 text-muted">{service.serviceTitle}</h6>
                  <p className="card-text">{service.description}</p>
                  <p className="card-text">Price: ₹{service.price}</p>
                  <button
                    className="btn btn-primary"
                    onClick={() => handleBookService(service._id)}
                  >
                    Book Service
                  </button>
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
        <div className="alert alert-danger">{bookingError}</div>
      ) : bookings.length === 0 ? (
        <p className="text-muted">No bookings found.</p>
      ) : (
        <div className="row">
          {bookings.map((booking) => (
            <div className="col-md-4 mb-4" key={booking._id}>
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">{booking.service?.serviceTitle}</h5>
                  <p className="card-text">Provider: {booking.provider?.name}</p>
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

      {/* Booking Modal */}
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
};

export default User_dashboard;