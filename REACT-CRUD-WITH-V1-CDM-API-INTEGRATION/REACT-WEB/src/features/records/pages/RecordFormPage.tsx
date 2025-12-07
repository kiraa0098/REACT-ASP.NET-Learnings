import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Typography, Box, CircularProgress, Paper } from "@mui/material";
import RecordForm from "../components/RecordForm";
import {
  useRecordDetailQuery,
  useCreateRecordMutation,
  useUpdateRecordMutation,
} from "../hooks/index";
import type { // Retaining 'type' keyword
  CreateRecordDto,
  UpdateRecordDto,
} from "../../../common/models/cdm";
import { useAppStore } from "../../../common/stores/useAppStore";

const RecordFormPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const recordId = id ? parseInt(id, 10) : undefined;
  const isEditMode = !!recordId;
  const { showSnackbar, setLoading } = useAppStore();

  const {
    data: record,
    isLoading: isRecordQueryLoading,
    isError: isRecordQueryError,
  } = useRecordDetailQuery(recordId);
  const createMutation = useCreateRecordMutation();
  const updateMutation = useUpdateRecordMutation();

  useEffect(() => {
    setLoading(
      isRecordQueryLoading ||
        createMutation.isPending ||
        updateMutation.isPending
    );
  }, [
    isRecordQueryLoading,
    createMutation.isPending,
    updateMutation.isPending,
    setLoading,
  ]);

  const handleSubmit = (formData: CreateRecordDto | UpdateRecordDto) => {
    if (isEditMode && recordId) {
      updateMutation.mutate(
        { id: recordId, payload: formData as UpdateRecordDto },
        {
          onSuccess: () => {
            showSnackbar("Record updated successfully!", "success");
            navigate("/records");
          },
          onError: (error) => {
            showSnackbar(`Error updating record: ${error.message}`, "error");
          },
        }
      );
    } else {
      createMutation.mutate(formData as CreateRecordDto, {
        onSuccess: () => {
          showSnackbar("Record created successfully!", "success");
          navigate("/records");
        },
        onError: (error) => {
          showSnackbar(`Error creating record: ${error.message}`, "error");
        },
      });
    }
  };

  return (
    <Box
      sx={{
        mt: 4,
        bgcolor: "background.paper",
        boxShadow: 3,
        borderRadius: 2,
        p: 4,
        maxWidth: 800,
        mx: "auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minHeight: '400px', // Maintain a minimum height for stable layout
      }}
    >
      <Typography variant="h4" component="h1" gutterBottom>
        {isEditMode ? `Edit Record: ${record?.Name}` : "Create New Record"}
      </Typography>

      {/* Conditionally render error/not-found messages within the main Box */}
      {isRecordQueryError ? (
        <Typography color="error" sx={{ textAlign: 'center', my: 2 }}>
          Error loading record details.
        </Typography>
      ) : isEditMode && !record && !isRecordQueryLoading ? (
        <Typography sx={{ textAlign: 'center', my: 2 }}>
          Record not found.
        </Typography>
      ) : (
        <Box sx={{ p: 3 }}>
          {/* Render RecordForm only if not in edit mode OR if in edit mode and record data is available */}
          {!isEditMode || record ? (
            <RecordForm
              initialData={isEditMode ? record : undefined}
              onSubmit={handleSubmit}
              isSubmitting={createMutation.isPending || updateMutation.isPending}
              isEditMode={isEditMode}
            />
          ) : (
            // This case handles when in edit mode, not found, and not loading, but record is null
            // This should ideally be caught by "Record not found" above, but as a fallback
            <Typography>Loading record data...</Typography>
          )}
        </Box>
      )}
    </Box>
  );
};
export default RecordFormPage;
