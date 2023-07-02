import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { baseFetch } from 'service/authApi';
import { backendUrl } from 'utils/consts';

function useMultipleRoadmap(): UseQueryResult<any> {
  const fetchMultipleRoadmaps = async (): Promise<any> => {
    const res = await baseFetch(`${backendUrl}/roadmaps`, {});
    return res.json();
  };

  return useQuery(['roadmaps'], fetchMultipleRoadmaps);
}

export default useMultipleRoadmap;
