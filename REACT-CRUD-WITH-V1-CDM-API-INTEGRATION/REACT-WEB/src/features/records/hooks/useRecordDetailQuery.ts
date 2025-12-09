import { useQuery } from "@tanstack/react-query";
import cdmApi from "../../../common/api-service/cdmApi";
import type { Record } from "../../../common/models/cdm";

export const useRecordDetailQuery = (id: number | undefined) => {
  return useQuery<Record | undefined, Error>({
    queryKey: ["record", id],
    queryFn: () => {
      if (typeof id === 'number') {
        return cdmApi.getRecordById(id);
      }
      return Promise.resolve(undefined);
    },
    enabled: typeof id === 'number',
  });
};
