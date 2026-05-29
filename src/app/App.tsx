import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from '../features/home/pages/Home';
import Login from '../features/auth/pages/Login';
import PrivateRoute from './guards/PrivateRoute';
import { ROUTES } from './routes';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path={ROUTES.LOGIN} element={<Login />} />
      <Route
        path={ROUTES.HOME}
        element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        }
      />
      <Route path="*" element={<Login />} />
    </Routes>
  );
};

export default App;