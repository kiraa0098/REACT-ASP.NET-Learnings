// C:\Users\alwynn\Desktop\Todo-App\REACT-CRUD-WITH-V1-CDM-API-INTEGRATION\REACT-WEB\src\features\records\hooks\useCreateRecordMutation.ts

import { useMutation, useQueryClient } from "@tanstack/react-query";
import cdmApi from "../../../common/api-service/cdmApi";
import type { CreateRecordDto, Record } from "../../../common/models/cdm";

export const useCreateRecordMutation = () => {
  const queryClient = useQueryClient();
  return useMutation<Record, Error, CreateRecordDto>({
    mutationFn: cdmApi.createRecord,
    onSuccess: () => {
      // Invalidate and refetch the records list after a successful creation
      queryClient.invalidateQueries({ queryKey: ["records"] });
    },
    // Add onError, onSettled, etc. for more sophisticated handling
  });
};
