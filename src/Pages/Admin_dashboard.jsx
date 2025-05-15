import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import {
  adminGetAllServices,
  updateServiceStatus,
  deleteService,
  getAllUsers,
  addUser,
  updateUser,
  deleteUser,
} from '../services/adminService';

const Admin_dashboard = () => {
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [services, setServices] = useState([]);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  useEffect(() => {
    if (!isAuthenticated || user?.role !== 'admin') {
      navigate('/login', { replace: true });
      return;
    }

    const fetchData = async () => {
      try {
        const [servicesData, usersData] = await Promise.all([
          adminGetAllServices(),
          getAllUsers(),
        ]);
        setServices(servicesData);
        setUsers(usersData);
        setError(null);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to load data. Please try again.');
      }
    };

    fetchData();
  }, [isAuthenticated, user, navigate]);

  const handleServiceUpdate = async (id, status) => {
    try {
      await updateServiceStatus(id, status);
      setServices((prev) =>
        prev.map((service) => (service._id === id ? { ...service, status } : service))
      );
    } catch (error) {
      console.error('Error updating service status:', error);
      setError('Failed to update service status.');
    }
  };

  const handleServiceDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this service?')) {
      try {
        await deleteService(id);
        setServices((prev) => prev.filter((service) => service._id !== id));
      } catch (error) {
        console.error('Error deleting service:', error);
        setError('Failed to delete service.');
      }
    }
  };

  const handleUserAdd = async (data) => {
    try {
      const addedUser = await addUser(data);
      setUsers((prev) => [...prev, addedUser]);
      reset();
      setError(null);
    } catch (error) {
      console.error('Error adding user:', error);
      setError('Failed to add user.');
    }
  };

  const handleUserUpdate = async (id, updatedData) => {
    try {
      await updateUser(id, updatedData);
      setUsers((prev) =>
        prev.map((user) => (user._id === id ? { ...user, ...updatedData } : user))
      );
    } catch (error) {
      console.error('Error updating user:', error);
      setError('Failed to update user.');
    }
  };

  const handleUserDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await deleteUser(id);
        setUsers((prev) => prev.filter((user) => user._id !== id));
      } catch (error) {
        console.error('Error deleting user:', error);
        setError('Failed to delete user.');
      }
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">Admin Dashboard</h2>
      {error && <div className="alert alert-danger">{error}</div>}

      <div className="card mb-4 shadow-sm">
        <div className="card-body">
          <h3 className="card-title">Manage Services</h3>
          <div className="table-responsive">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {services.map((service) => (
                  <tr key={service._id}>
                    <td>{service.serviceTitle}</td>
                    <td>{service.status}</td>
                    <td>
                      <button
                        onClick={() => handleServiceUpdate(service._id, 'Accepted')}
                        className="btn btn-success btn-sm me-2"
                      >
                        Accept
                      </button>
                      <button
                        onClick={() => handleServiceUpdate(service._id, 'Completed')}
                        className="btn btn-primary btn-sm me-2"
                      >
                        Complete
                      </button>
                      <button
                        onClick={() => handleServiceDelete(service._id)}
                        className="btn btn-danger btn-sm"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="card shadow-sm">
        <div className="card-body">
          <h3 className="card-title">Manage Users</h3>
          <div className="table-responsive">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.role}</td>
                    <td>
                      <button
                        onClick={() => handleUserUpdate(user._id, { role: 'admin' })}
                        className="btn btn-warning btn-sm me-2"
                        disabled={user.role === 'admin'}
                      >
                        Promote to Admin
                      </button>
                      <button
                        onClick={() => handleUserDelete(user._id)}
                        className="btn btn-danger btn-sm"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h4 className="mt-4">Add New User</h4>
          <form onSubmit={handleSubmit(handleUserAdd)} className="row g-3">
            <div className="col-md-4">
              <input
                type="text"
                className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                placeholder="Name"
                {...register('name', { required: 'Name is required' })}
              />
              {errors.name && <div className="invalid-feedback">{errors.name.message}</div>}
            </div>
            <div className="col-md-4">
              <input
                type="email"
                className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                placeholder="Email"
                {...register('email', {
                  required: 'Email is required',
                  pattern: { value: /.+\@.+\..+/, message: 'Invalid email' },
                })}
              />
              {errors.email && <div className="invalid-feedback">{errors.email.message}</div>}
            </div>
            <div className="col-md-3">
              <select
                className={`form-select ${errors.role ? 'is-invalid' : ''}`}
                {...register('role', { required: 'Role is required' })}
              >
                <option value="consumer">Consumer</option>
                <option value="provider">Provider</option>
                <option value="admin">Admin</option>
              </select>
              {errors.role && <div className="invalid-feedback">{errors.role.message}</div>}
            </div>
            <div className="col-md-1">
              <button type="submit" className="btn btn-primary w-100">Add</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Admin_dashboard;