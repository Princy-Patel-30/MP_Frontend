import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { googleLogin, clearError } from '../Slices/authSlice';

function GoogleCallback() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, user, error, loading } = useSelector((state) => state.auth);
  const didExchange = useRef(false);

  // Capture and dispatch the authorization code exactly once
  useEffect(() => {
    const code = new URLSearchParams(window.location.search).get('code');

    if (!code) {
      console.error('No authorization code found in URL');
      navigate('/login', { replace: true }); // Use replace to avoid adding to history stack
      return;
    }

    if (!didExchange.current) {
      didExchange.current = true;
      dispatch(googleLogin(code));
    }
  }, [dispatch, navigate]);

  // Handle navigation based on authentication state
  useEffect(() => {
    if (isAuthenticated && user) {
      const targetRoute =
        user.role === 'admin'
          ? '/admin_dashboard'
          : user.role === 'provider'
          ? '/provider_dashboard'
          : '/userdashboard';
      navigate(targetRoute, { replace: true }); // Use replace to avoid adding to history stack
    }

    if (error) {
      console.error('Authentication error:', error);
      alert(`Login failed: ${error}`);
      dispatch(clearError());
      navigate('/login', { replace: true }); // Use replace to avoid adding to history stack
    }
  }, [isAuthenticated, user, error, navigate, dispatch]);

  return (
    <div className="text-center mt-5">
      {loading ? 'Authenticating with Google...' : 'Processing...'}
    </div>
  );
}

export default GoogleCallback;
