import { useMutation, useQueryClient } from "@tanstack/react-query";
import cdmApi from "../../../common/api-service/cdmApi";
import type { Record, UpdateRecordDto } from "../../../common/models/cdm";

interface UpdateRecordVariables {
  id: number;
  payload: UpdateRecordDto;
}

export const useUpdateRecordMutation = () => {
  const queryClient = useQueryClient();
  return useMutation<Record, Error, UpdateRecordVariables>({
    mutationFn: ({ id, payload }) => cdmApi.updateRecord(id, payload),
    onSuccess: (updatedRecord) => {
      queryClient.invalidateQueries({ queryKey: ["records"] });
      queryClient.invalidateQueries({ queryKey: ["record", updatedRecord.id] });
    },
  });
};
