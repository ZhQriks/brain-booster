import React from 'react';

import Home from 'pages/private/home/Home';
import Roadmap from 'pages/private/roadmap/Roadmap';
import { Navigate, Route, Routes } from 'react-router-dom';
import PublicLayout from 'routes/layouts/PublicLayout';

import GenerateRoadmap from '../pages/private/generate-roadmap/GenerateRoadmap';

interface IRouteMap {
  [route: string]: JSX.Element;
}

export const authenticatedRoutes: IRouteMap = {
  '/': <Home />,
  '/roadmap': <Roadmap />,
  '/generate-roadmap': <GenerateRoadmap />,
  '/login': <Navigate to='/' />,
};

const Authenticated = (): JSX.Element => {
  return (
    <PublicLayout>
      <Routes>
        {Object.keys(authenticatedRoutes).map(path => (
          <Route key={path} path={path} element={authenticatedRoutes[path]} />
        ))}
      </Routes>
    </PublicLayout>
  );
};

export default Authenticated;
