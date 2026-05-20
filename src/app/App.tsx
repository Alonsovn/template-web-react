import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../features/home/pages/Home";
import Login from "../features/auth/pages/Login";
import PrivateRoute from "./PrivateRoute";
import { ROUTES } from "./routes";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path={ROUTES.HOME} element={<PrivateRoute><Home /></PrivateRoute>} />
        <Route path={ROUTES.LOGIN} element={<Login />} />
      </Routes>
    </Router>
  );
};

export default App;
