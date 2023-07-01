import React from 'react';

import Login from 'pages/public/auth/Login';
import Register from 'pages/public/auth/Register';
import Home from 'pages/private/home/Home';
import { Navigate, Route, Routes } from 'react-router-dom';
import PublicLayout from 'routes/layouts/PublicLayout';

interface IRouteMap {
  [route: string]: JSX.Element;
}

export const unauthenticatedRoutes: IRouteMap = {
  '/login': <Login />,
  '/register': <Register />,
  '/': <Navigate to='/login' />,
};

const Unauthenticated = (): JSX.Element => {
  return (
    <Routes>
      {Object.keys(unauthenticatedRoutes).map(path => (
        <Route key={path} path={path} element={unauthenticatedRoutes[path]} />
      ))}
    </Routes>
  );
};

export default Unauthenticated;
