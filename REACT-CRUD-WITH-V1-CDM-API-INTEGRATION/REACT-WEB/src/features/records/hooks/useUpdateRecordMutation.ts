// C:\Users\alwynn\Desktop\Todo-App\REACT-CRUD-WITH-V1-CDM-API-INTEGRATION\REACT-WEB\src\features\records\hooks\useUpdateRecordMutation.ts

import { useMutation, useQueryClient } from "@tanstack/react-query";
import cdmApi from "../../../common/api-service/cdmApi";
import type { Record, UpdateRecordDto } from "../../../common/models/cdm";

interface UpdateRecordVariables {
  id: string;
  payload: UpdateRecordDto;
}

export const useUpdateRecordMutation = () => {
  const queryClient = useQueryClient();
  return useMutation<Record, Error, UpdateRecordVariables>({
    mutationFn: ({ id, payload }) => cdmApi.updateRecord(id, payload),
    onSuccess: (updatedRecord) => {
      // Invalidate and refetch the records list and the specific record detail
      queryClient.invalidateQueries({ queryKey: ["records"] });
      queryClient.invalidateQueries({ queryKey: ["record", updatedRecord.Id] });
    },
    // Add onError, onSettled, etc.
  });
};
