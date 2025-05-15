import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useGoogleLogin } from '@react-oauth/google';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { createBooking, resetBookingState } from '../Slices/BookingSlice';

function BookingForm({ serviceId, onClose }) {
  const [scheduledDate, setScheduledDate] = useState('');
  const [googleAccessToken, setGoogleAccessToken] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token, isAuthenticated, user } = useSelector((state) => state.auth);
  const { loading, error, success } = useSelector((state) => state.booking);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
    // Check for an existing Google access token in the user object
    if (user?.googleAccessToken) {
      setGoogleAccessToken(user.googleAccessToken);
    }
    return () => {
      dispatch(resetBookingState());
    };
  }, [isAuthenticated, navigate, dispatch, user]);

  useEffect(() => {
    if (success) {
      alert('Booking created successfully!');
      onClose();
      navigate('/services');
    }
    if (error) {
      alert(`Booking failed: ${error}`);
      dispatch(resetBookingState());
    }
  }, [success, error, navigate, onClose, dispatch]);

  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      setGoogleAccessToken(tokenResponse.access_token);
    },
    onError: () => {
      alert('Google login failed');
    },
    scope: 'https://www.googleapis.com/auth/calendar.events',
    redirect_uri: 'http://localhost:5173/auth/google/callback',
  });

  const handleDateSelect = (selectInfo) => {
    const dateStr = selectInfo.startStr;
    setScheduledDate(dateStr.split('+')[0]);
  };

  const handleBooking = async (e) => {
    e.preventDefault();
    if (!googleAccessToken) {
      alert('Please sign in with Google to schedule the booking.');
      return;
    }
    dispatch(createBooking({ serviceId, scheduledDate, googleAccessToken }));
  };

  return (
    <div>
      {!googleAccessToken ? (
        <div className="text-center mb-3">
          <button className="btn btn-outline-primary" onClick={() => login()}>
            Sign in with Google to Schedule
          </button>
        </div>
      ) : (
        <>
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView="timeGridWeek"
            selectable={true}
            select={handleDateSelect}
            events={[]}
            slotMinTime="08:00:00"
            slotMaxTime="20:00:00"
            height="400px"
          />
          <form onSubmit={handleBooking} className="mt-3">
            <div className="mb-3">
              <label className="form-label">Scheduled Date</label>
              <input
                type="datetime-local"
                value={scheduledDate}
                onChange={(e) => setScheduledDate(e.target.value)}
                className="form-control"
                required
              />
            </div>
            <button type="submit" className="btn btn-primary w-100" disabled={loading}>
              {loading ? 'Booking...' : 'Book'}
            </button>
            <button type="button" className="btn btn-secondary w-100 mt-2" onClick={onClose}>
              Cancel
            </button>
          </form>
        </>
      )}
    </div>
  );
}

export default BookingForm;