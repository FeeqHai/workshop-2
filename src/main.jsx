// src/main.jsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import BmiCalculator from './bmi-count.jsx';
import InspectionCalendar from './components/calendar/InspectionCalendar.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
  { path: "/", element: <BmiCalculator /> },
  { path: "/calendar", element: <InspectionCalendar /> },

]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
