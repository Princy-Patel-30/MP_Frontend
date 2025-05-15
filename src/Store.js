import { configureStore } from '@reduxjs/toolkit';
import authReducer from './Slices/authSlice';
import serviceReducer from './Slices/serviceSlice';
import bookingReducer from './Slices/BookingSlice';
export const store = configureStore({
  reducer: {
    auth: authReducer,
    services: serviceReducer,
    booking: bookingReducer,
  },
});

export default store;