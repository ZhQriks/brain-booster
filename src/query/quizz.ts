import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { baseFetch } from 'service/authApi';
import { backendUrl } from 'utils/consts';

function useQuiz(topic?: string): UseQueryResult<any> {
  const fetchQuiz = async (): Promise<any> => {
    const res = await baseFetch(`${backendUrl}/roadmaps/tests`, {
      method: 'POST',
      body: JSON.stringify({ topic }),
    });
    return res.json();
  };

  return useQuery(['roadmapsSingle', topic], fetchQuiz, { enabled: !!topic });
}

export default useQuiz;
