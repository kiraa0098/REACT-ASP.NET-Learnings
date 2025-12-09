import { useMutation, useQueryClient } from "@tanstack/react-query";
import cdmApi from "../../../common/api-service/cdmApi";
import type { CreateRecordDto, Record } from "../../../common/models/cdm";

export const useCreateRecordMutation = () => {
  const queryClient = useQueryClient();
  return useMutation<Record, Error, CreateRecordDto>({
    mutationFn: cdmApi.createRecord,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["records"] });
    },
  });
};
