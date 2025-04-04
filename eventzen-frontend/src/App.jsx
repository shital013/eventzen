import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ErrorBoundary from './components/ErrorBoundary';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Dashboard from './components/layout/Dashboard';
import DashboardContent from './components/DashboardContent';
import EventList from './components/events/EventList';
import EventForm from './components/events/EventForm';
import VenueList from './components/venues/VenueList';
import VenueForm from './components/venues/VenueForm';
import PrivateRoute from './components/layout/PrivateRoute';

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ErrorBoundary>
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* Protected Routes */}
            <Route path="/" element={<PrivateRoute />}>
              <Route index element={<Navigate to="/dashboard" replace />} />
              <Route path="dashboard" element={
                <Dashboard>
                  <DashboardContent />
                </Dashboard>
              } />
              <Route path="events" element={
                <Dashboard>
                  <EventList />
                </Dashboard>
              } />
              <Route path="events/new" element={
                <Dashboard>
                  <EventForm />
                </Dashboard>
              } />
              <Route path="events/:id/edit" element={
                <Dashboard>
                  <EventForm />
                </Dashboard>
              } />
              <Route path="venues" element={
                <Dashboard>
                  <VenueList />
                </Dashboard>
              } />
              <Route path="venues/new" element={
                <Dashboard>
                  <VenueForm />
                </Dashboard>
              } />
              <Route path="venues/:id/edit" element={
                <Dashboard>
                  <VenueForm />
                </Dashboard>
              } />
            </Route>

            {/* Fallback for unmatched routes */}
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </ErrorBoundary>
      </AuthProvider>
    </BrowserRouter>
  );
}