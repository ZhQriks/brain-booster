import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { baseFetch } from 'service/authApi';
import { backendUrl } from 'utils/consts';

function useSingleRoadmap(id?: number): UseQueryResult<any> {
  const fetchSingleRoadmap = async (): Promise<any> => {
    const res = await baseFetch(`${backendUrl}/roadmaps/${id}`, {});
    return res.json();
  };

  return useQuery(['roadmapsSingle', id], fetchSingleRoadmap, { enabled: !!id });
}

export default useSingleRoadmap;
