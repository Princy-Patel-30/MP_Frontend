import { useForm } from 'react-hook-form';
import React from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginUser } from '../Slices/authSlice';

const Register = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const apiUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

  const onSubmit = async (data) => {
    try {
      const res = await axios.post(`${apiUrl}/auth/register`, data);
      await dispatch(loginUser({ email: data.email, password: data.password }));
      reset();
      const redirectTo =
        data.role === 'admin'
          ? '/admin_dashboard'
          : data.role === 'provider'
          ? '/provider_dashboard'
          : '/userdashboard';
      navigate(redirectTo, { replace: true });
    } catch (error) {
      alert(error.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="w-100" style={{ maxWidth: '400px' }}>
        <h2 className="mb-4 text-center">Register</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="card p-4 shadow-sm rounded-4">
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input
              type="text"
              className={`form-control ${errors.name ? 'is-invalid' : ''}`}
              {...register('name', { required: 'Name is required', minLength: { value: 2, message: 'Minimum 2 characters' } })}
            />
            {errors.name && <div className="invalid-feedback">{errors.name.message}</div>}
          </div>

          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className={`form-control ${errors.email ? 'is-invalid' : ''}`}
              {...register('email', {
                required: 'Email is required',
                pattern: { value: /.+\@.+\..+/, message: 'Invalid email' },
              })}
            />
            {errors.email && <div className="invalid-feedback">{errors.email.message}</div>}
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className={`form-control ${errors.password ? 'is-invalid' : ''}`}
              {...register('password', {
                required: 'Password is required',
                minLength: { value: 8, message: 'Minimum 8 characters' },
              })}
            />
            {errors.password && <div className="invalid-feedback">{errors.password.message}</div>}
          </div>

          <div className="mb-3">
            <label className="form-label">Role</label>
            <select
              className={`form-select ${errors.role ? 'is-invalid' : ''}`}
              {...register('role', { required: 'Role is required' })}
            >
              <option value="">Select Role</option>
              <option value="consumer">Consumer</option>
              <option value="provider">Service Provider</option>
              <option value="admin">Admin</option>
            </select>
            {errors.role && <div className="invalid-feedback">{errors.role.message}</div>}
          </div>

          <button type="submit" className="btn btn-dark w-100">Register</button>
          <p className="mt-3 text-center">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;