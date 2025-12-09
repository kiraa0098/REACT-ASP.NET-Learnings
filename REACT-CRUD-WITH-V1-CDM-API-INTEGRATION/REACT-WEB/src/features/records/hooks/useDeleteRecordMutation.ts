import { useMutation, useQueryClient } from '@tanstack/react-query';
import cdmApi from '../../../common/api-service/cdmApi';

export const useDeleteRecordMutation = () => {
  const queryClient = useQueryClient();
  return useMutation<void, Error, number>({
    mutationFn: cdmApi.deleteRecord,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['records'] });
    },
  });
};
