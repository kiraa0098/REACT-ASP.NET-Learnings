import { useQuery } from "@tanstack/react-query";
import cdmApi from "../../../common/api-service/cdmApi";
import type { PagedResult, Record } from "../../../common/models/cdm";

export const useRecordsQuery = (pageNumber: number, pageSize: number) => {
  return useQuery<PagedResult<Record>, Error>({
    queryKey: ["records", pageNumber, pageSize],
    queryFn: () => cdmApi.getRecords(pageNumber, pageSize),
  });
};
