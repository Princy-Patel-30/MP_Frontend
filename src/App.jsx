import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import Home from './Pages/Home';
import Register from './Pages/Register';
import Login from './Pages/Login';
import User_dashboard from './Pages/User_dashboard';
import Service_form from './Pages/Service_form';
import ServiceDashboard from './Pages/ServiceDashboard';
import Admin_dashboard from './Pages/Admin_dashboard';
import Provider_dashboard from './Pages/Provider_dashboard';
import Landing from './Pages/Landing';
import GoogleCallback from './Components/GoogleCallback';
import ServiceList from './Components/ServiceList';
import { Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './Store';

function ProtectedRoute({ children, requiredRole }) {
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: window.location.pathname }} />;
  }

  if (requiredRole && user?.role !== requiredRole) {
    return <Navigate to="/" />;
  }

  return children;
}

function App() {
  return (
    <Provider store={store}>
      <div className="d-flex flex-column min-vh-100">
        <Navbar />
        <main className="flex-grow-1">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/home" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/services"
              element={
                <ProtectedRoute>
                  <ServiceList />
                </ProtectedRoute>
              }
            />
            <Route
              path="/userdashboard"
              element={
                <ProtectedRoute>
                  <User_dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/service_form"
              element={
                <ProtectedRoute requiredRole="provider">
                  <Service_form />
                </ProtectedRoute>
              }
            />
            <Route
              path="/service_dashboard"
              element={
                <ProtectedRoute requiredRole="provider">
                  <ServiceDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin_dashboard"
              element={
                <ProtectedRoute requiredRole="admin">
                  <Admin_dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/provider_dashboard"
              element={
                <ProtectedRoute requiredRole="provider">
                  <Provider_dashboard />
                </ProtectedRoute>
              }
            />
            <Route path="/auth/google/callback" element={<GoogleCallback />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Provider>
  );
}

export default App;