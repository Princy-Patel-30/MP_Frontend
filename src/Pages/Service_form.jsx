import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Service_form = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const navigate = useNavigate();
  const [services, setServices] = useState([]);
  const [error, setError] = useState(null);
  const { token, isAuthenticated, user } = useSelector((state) => state.auth);
  const apiUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

  useEffect(() => {
    if (!isAuthenticated || user?.role !== 'provider') {
      navigate('/login', { replace: true });
      return;
    }

    const fetchServices = async () => {
      try {
        const response = await axios.get(`${apiUrl}/provider/services`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setServices(response.data);
        setError(null);
      } catch (error) {
        console.error('Error fetching services:', error.response?.data?.message || error.message);
        setError('Failed to fetch services.');
      }
    };
    fetchServices();
  }, [isAuthenticated, user, token, navigate]);

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(`${apiUrl}/provider/services`, data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setServices((prev) => [...prev, response.data]);
      alert('Service created successfully!');
      reset();
      navigate('/service_dashboard');
    } catch (error) {
      console.error('Error creating service:', error.response?.data?.message || error.message);
      setError('Failed to create service.');
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Add New Service</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit(onSubmit)} className="card p-4 shadow-sm">
        <div className="row g-3">
          <div className="col-md-6">
            <label className="form-label">Company Name</label>
            <input
              {...register('companyName', { required: 'Company Name is required' })}
              className={`form-control ${errors.companyName ? 'is-invalid' : ''}`}
            />
            {errors.companyName && <div className="invalid-feedback">{errors.companyName.message}</div>}
          </div>

          <div className="col-md-6">
            <label className="form-label">Service Title</label>
            <input
              {...register('serviceTitle', { required: 'Service Title is required' })}
              className={`form-control ${errors.serviceTitle ? 'is-invalid' : ''}`}
            />
            {errors.serviceTitle && <div className="invalid-feedback">{errors.serviceTitle.message}</div>}
          </div>

          <div className="col-md-12">
            <label className="form-label">Description</label>
            <textarea
              {...register('description', { required: 'Description is required', minLength: { value: 10, message: 'Minimum 10 characters' } })}
              className={`form-control ${errors.description ? 'is-invalid' : ''}`}
              rows="4"
            />
            {errors.description && <div className="invalid-feedback">{errors.description.message}</div>}
          </div>

          <div className="col-md-6">
            <label className="form-label">Price</label>
            <input
              type="number"
              {...register('price', { required: 'Price is required', min: { value: 0, message: 'Price cannot be negative' } })}
              className={`form-control ${errors.price ? 'is-invalid' : ''}`}
            />
            {errors.price && <div className="invalid-feedback">{errors.price.message}</div>}
          </div>

          <div className="col-md-6">
            <label className="form-label">Availability</label>
            <div>
              {['Available', 'Not Available'].map((option) => (
                <div key={option} className="form-check form-check-inline">
                  <input
                    type="radio"
                    value={option}
                    {...register('availability', { required: 'Availability is required' })}
                    className="form-check-input"
                    id={`availability-${option}`}
                  />
                  <label className="form-check-label" htmlFor={`availability-${option}`}>
                    {option}
                  </label>
                </div>
              ))}
            </div>
            {errors.availability && <div className="invalid-feedback d-block">{errors.availability.message}</div>}
          </div>

          <div className="col-md-6">
            <label className="form-label">Provider Name</label>
            <input
              {...register('providerName', { required: 'Provider Name is required' })}
              className={`form-control ${errors.providerName ? 'is-invalid' : ''}`}
            />
            {errors.providerName && <div className="invalid-feedback">{errors.providerName.message}</div>}
          </div>

          <div className="col-md-6">
            <label className="form-label">Provider Contact</label>
            <input
              {...register('providerContact', {
                required: 'Provider Contact is required',
                pattern: { value: /^\+?[1-9]\d{1,14}$/, message: 'Invalid phone number' },
              })}
              className={`form-control ${errors.providerContact ? 'is-invalid' : ''}`}
            />
            {errors.providerContact && <div className="invalid-feedback">{errors.providerContact.message}</div>}
          </div>

          <div className="col-md-6">
            <label className="form-label">Category</label>
            <input
              {...register('category', { required: 'Category is required' })}
              className={`form-control ${errors.category ? 'is-invalid' : ''}`}
            />
            {errors.category && <div className="invalid-feedback">{errors.category.message}</div>}
          </div>

          <div className="col-md-6">
            <label className="form-label">Sub Category</label>
            <input
              {...register('subCategory', { required: 'Sub Category is required' })}
              className={`form-control ${errors.subCategory ? 'is-invalid' : ''}`}
            />
            {errors.subCategory && <div className="invalid-feedback">{errors.subCategory.message}</div>}
          </div>

          <div className="col-md-12">
            <label className="form-label">Status</label>
            <div>
              {['Pending', 'Accepted', 'Completed'].map((option) => (
                <div key={option} className="form-check form-check-inline">
                  <input
                    type="radio"
                    value={option}
                    {...register('status', { required: 'Status is required' })}
                    className="form-check-input"
                    id={`status-${option}`}
                  />
                  <label className="form-check-label" htmlFor={`status-${option}`}>
                    {option}
                  </label>
                </div>
              ))}
            </div>
            {errors.status && <div className="invalid-feedback d-block">{errors.status.message}</div>}
          </div>

          <div className="col-md-12">
            <button type="submit" className="btn btn-primary w-100">Submit</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Service_form;