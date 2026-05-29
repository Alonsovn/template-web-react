import type { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from '../../shared/store/store';

interface PrivateRouteProps {
  children: ReactNode;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated,
  );
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return <>{children}</>;
};

export default PrivateRoute;