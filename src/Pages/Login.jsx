import { useForm } from 'react-hook-form';
import React, { useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, getGoogleAuthUrl, clearError } from '../Slices/authSlice';

const Login = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { isAuthenticated, loading, error, googleAuthUrl, user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getGoogleAuthUrl());
  }, [dispatch]);

  useEffect(() => {
    if (isAuthenticated) {
      const redirectTo = location.state?.serviceId
        ? '/services'
        : user?.role === 'admin'
        ? '/admin_dashboard'
        : user?.role === 'provider'
        ? '/provider_dashboard'
        : '/userdashboard';
      navigate(redirectTo, { state: location.state, replace: true });
    }

    if (error) {
      alert(error);
      dispatch(clearError());
    }
  }, [isAuthenticated, error, navigate, dispatch, user, location.state]);

  const onSubmit = async (data) => {
    await dispatch(loginUser(data));
    reset();
  };

  const handleGoogleLogin = () => {
    if (googleAuthUrl) {
      window.location.href = googleAuthUrl;
    } else {
      alert('Google sign-in is not available at the moment.');
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="w-100" style={{ maxWidth: '400px' }}>
        <h2 className="mb-4 text-center">Login</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="card p-4 shadow-sm rounded-4">
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className={`form-control ${errors.email ? 'is-invalid' : ''}`}
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /.+\@.+\..+/,
                  message: 'Invalid email address',
                },
              })}
            />
            {errors.email && <div className="invalid-feedback">{errors.email.message}</div>}
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className={`form-control ${errors.password ? 'is-invalid' : ''}`}
              {...register('password', { required: 'Password is required' })}
            />
            {errors.password && <div className="invalid-feedback">{errors.password.message}</div>}
          </div>

          <button type="submit" className="btn btn-dark w-100" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>

          <button
            type="button"
            onClick={handleGoogleLogin}
            className="btn btn-outline-danger w-100 mt-2"
            disabled={!googleAuthUrl}
          >
            Sign in with Google
          </button>

          <p className="mt-3 text-center">
            Don't have an account? <Link to="/register">Register</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;