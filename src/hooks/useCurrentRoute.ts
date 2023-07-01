import { matchRoutes, useLocation } from 'react-router-dom';

import { authenticatedRoutes } from '../routes/Authenticated';
import { unauthenticatedRoutes } from '../routes/Unauthenticated';

export default function useCurrentRoute(): string {
  const routes = ['/'].concat(Object.keys(authenticatedRoutes), Object.keys(unauthenticatedRoutes));

  const location = useLocation();
  const uniqRoutes = [...new Set(routes)];
  const matchedRoutes = matchRoutes(
    uniqRoutes.map(item => ({ path: item })),
    location,
  );

  if (Array.isArray(matchedRoutes)) {
    return matchedRoutes[0].route.path;
  }

  return '';
}
