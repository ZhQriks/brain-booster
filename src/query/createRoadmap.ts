import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query';
import { baseFetch } from 'service/authApi';
import { backendUrl } from 'utils/consts';

export default function useCreateEvent(): UseMutationResult<any> {
  const queryClient = useQueryClient();

  const createRoadmap = (data: any): any => {
    return baseFetch(`${backendUrl}/roadmaps`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  };

  return useMutation(createRoadmap, {
    onSuccess: () => {
      // @ts-ignore
      queryClient.invalidateQueries('events');
    },
  });
}
