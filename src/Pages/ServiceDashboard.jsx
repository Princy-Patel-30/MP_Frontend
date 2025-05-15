import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const ServiceDashboard = () => {
  const [services, setServices] = useState([]);
  const [error, setError] = useState(null);
  const { token, isAuthenticated, user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

  useEffect(() => {
    if (!isAuthenticated || user?.role !== 'provider') {
      navigate('/login', { replace: true });
      return;
    }

    const fetchServices = async () => {
      try {
        const res = await axios.get(`${apiUrl}/provider/services`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setServices(Array.isArray(res.data) ? res.data : []);
        setError(null);
      } catch (error) {
        console.error('Error fetching services:', error.response?.data?.message || error.message);
        setError('Failed to fetch services.');
      }
    };

    fetchServices();
  }, [apiUrl, token, isAuthenticated, user, navigate]);

  const updateStatus = async (id, status) => {
    try {
      await axios.put(
        `${apiUrl}/provider/services/${id}/${status}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setServices((prev) =>
        prev.map((service) =>
          service._id === id ? { ...service, status } : service
        )
      );
      alert(`Status updated to ${status}`);
    } catch (error) {
      console.error('Error updating status:', error.response?.data?.message || error.message);
      setError('Failed to update status.');
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Service Dashboard</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      {services.length === 0 ? (
        <p className="text-muted text-center">No services available.</p>
      ) : (
        <div className="row">
          {services.map((service) => (
            <div className="col-md-4 mb-4" key={service._id}>
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">{service.serviceTitle}</h5>
                  <p className="card-text">Company: {service.companyName}</p>
                  <p className="card-text">Provider: {service.providerName}</p>
                  <p className="card-text">Category: {service.category} - {service.subCategory}</p>
                  <p className="card-text">Price: ₹{service.price}</p>
                  <p className="card-text">Availability: {service.availability}</p>
                  <p className="card-text">Status: {service.status || 'Pending'}</p>
                  <div className="d-flex gap-2">
                    <button
                      onClick={() => updateStatus(service._id, 'Accepted')}
                      className="btn btn-success btn-sm"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => updateStatus(service._id, 'Completed')}
                      className="btn btn-primary btn-sm"
                    >
                      Complete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ServiceDashboard;