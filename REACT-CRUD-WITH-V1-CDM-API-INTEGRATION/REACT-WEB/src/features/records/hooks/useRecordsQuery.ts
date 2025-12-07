// C:\Users\alwynn\Desktop\Todo-App\REACT-CRUD-WITH-V1-CDM-API-INTEGRATION\REACT-WEB\src\features\records\hooks\useRecordsQuery.ts

import { useQuery } from "@tanstack/react-query";
import cdmApi from "../../../common/api-service/cdmApi";
import type { Record } from "../../../common/models/cdm";

export const useRecordsQuery = () => {
  return useQuery<Record[], Error>({
    queryKey: ["records"],
    queryFn: cdmApi.getRecords,
    // Add more options as needed, e.g., staleTime, cacheTime
  });
};
