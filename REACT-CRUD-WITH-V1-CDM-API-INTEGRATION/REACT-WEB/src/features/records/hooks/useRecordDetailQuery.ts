// C:\Users\alwynn\Desktop\Todo-App\REACT-CRUD-WITH-V1-CDM-API-INTEGRATION\REACT-WEB\src\features\records\hooks\useRecordDetailQuery.ts

import { useQuery } from "@tanstack/react-query";
import cdmApi from "../../../common/api-service/cdmApi";
import type { Record } from "../../../common/models/cdm";

export const useRecordDetailQuery = (id: string) => {
  return useQuery<Record | undefined, Error>({
    queryKey: ["record", id],
    queryFn: () => cdmApi.getRecordById(id),
    enabled: !!id, // Only run the query if id is available
  });
};
