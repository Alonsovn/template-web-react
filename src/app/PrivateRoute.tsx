import React from "react";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../shared/store/hooks";
import { ROUTES } from "./routes";

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  return isAuthenticated ? <>{children}</> : <Navigate to={ROUTES.LOGIN} />;
};

export default PrivateRoute;