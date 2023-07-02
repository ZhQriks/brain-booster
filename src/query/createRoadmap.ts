import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query';
import { baseFetch } from 'service/authApi';
import { backendUrl } from 'utils/consts';

export default function useCreateRoadmap(): UseMutationResult<any> {
  const queryClient = useQueryClient();

  const createRoadmap = (topic: any): any => {
    return baseFetch(`${backendUrl}/roadmaps/tests`, {
      method: 'POST',
      body: JSON.stringify({ topic }),
    });
  };

  return useMutation(createRoadmap, {
    onSuccess: () => {
      // @ts-ignore
      queryClient.invalidateQueries('quizz');
    },
  });
}
