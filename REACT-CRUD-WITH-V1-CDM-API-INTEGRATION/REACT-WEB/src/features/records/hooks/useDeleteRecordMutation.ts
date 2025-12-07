// C:\Users\alwynn\Desktop\Todo-App\REACT-CRUD-WITH-V1-CDM-API-INTEGRATION\REACT-WEB\src\features\records\hooks\useDeleteRecordMutation.ts

import { useMutation, useQueryClient } from '@tanstack/react-query';
import cdmApi from '../../../common/api-service/cdmApi';

export const useDeleteRecordMutation = () => {
  const queryClient = useQueryClient();
  return useMutation<void, Error, string>({ // string is the ID of the record to delete
    mutationFn: cdmApi.deleteRecord,
    onSuccess: () => {
      // Invalidate and refetch the records list after a successful deletion
      queryClient.invalidateQueries({ queryKey: ['records'] });
    },
    // Add onError, onSettled, etc.
  });
};
