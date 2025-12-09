import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Typography, Box, Paper, Button, Divider, CircularProgress } from "@mui/material";
import { ArrowBack as ArrowBackIcon } from "@mui/icons-material";
import RecordForm from "../components/RecordForm";
import {
  useRecordDetailQuery,
  useCreateRecordMutation,
  useUpdateRecordMutation,
} from "../hooks/index";
import type { CreateRecordDto, UpdateRecordDto } from "../../../common/models/cdm";
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
  const isSubmitting = createMutation.isPending || updateMutation.isPending;

  useEffect(() => {
    setLoading(isRecordQueryLoading || isSubmitting);
  }, [isRecordQueryLoading, isSubmitting, setLoading]);

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

  const renderContent = () => {
    if (isRecordQueryLoading) {
      return (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
          <CircularProgress />
        </Box>
      );
    }

    if (isRecordQueryError) {
      return (
        <Typography color="error" sx={{ textAlign: 'center', my: 4 }}>
          Error loading record details.
        </Typography>
      );
    }

    if (isEditMode && !record) {
      return (
        <Typography sx={{ textAlign: 'center', my: 4 }}>
          Record not found.
        </Typography>
      );
    }

    return (
      <RecordForm
        initialData={isEditMode ? record : undefined}
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
        isEditMode={isEditMode}
      />
    );
  };

  return (
    <Box
      sx={{
        bgcolor: "background.paper",
        boxShadow: 3,
        borderRadius: 2,
        p: { xs: 2, sm: 3, md: 4 },
        maxWidth: 800,
        mx: "auto",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h4" component="h1">
          {isEditMode ? `Edit Record: ${record?.name || ''}` : "Create New Record"}
        </Typography>
        <Button
          variant="outlined"
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate("/records")}
        >
          Back to List
        </Button>
      </Box>
      <Divider sx={{ mb: 3 }} />
      
      {renderContent()}
    </Box>
  );
};

export default RecordFormPage;
