// C:\Users\alwynn\Desktop\Todo-App\REACT-CRUD-WITH-V1-CDM-API-INTEGRATION\REACT-WEB\src\features\records\components\RecordForm.tsx

import React, { useEffect } from "react";
import type { SubmitHandler } from "react-hook-form";
import { useForm, Controller } from "react-hook-form";
import { TextField, Button, Box, Typography } from "@mui/material";
import type {
  Record,
  CreateRecordDto,
  UpdateRecordDto,
} from "../../../common/models/cdm";

interface RecordFormProps {
  initialData?: Record; // For editing existing records
  onSubmit: SubmitHandler<CreateRecordDto | UpdateRecordDto>;
  isSubmitting: boolean;
  isEditMode: boolean;
}

const RecordForm: React.FC<RecordFormProps> = ({
  initialData,
  onSubmit,
  isSubmitting,
  isEditMode,
}) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateRecordDto | UpdateRecordDto>({
    defaultValues: {
      Name: initialData?.Name || "", // Changed from Title to Name
      Description: initialData?.Description || "",
      // Removed IsGlobal, IsDefault, IsDeprecated, DeprecationDate
    },
  });

  useEffect(() => {
    reset({
      Name: initialData?.Name || "", // Changed from Title to Name
      Description: initialData?.Description || "",
      // Removed IsGlobal, IsDefault, IsDeprecated, DeprecationDate
    });
  }, [initialData, reset]);

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      sx={{ mt: 1 }}
    >
      <Controller
        name="Name" // Changed from Title to Name
        control={control}
        rules={{ required: "Name is required" }} // Changed from Title to Name
        render={({ field }) => (
          <TextField
            {...field}
            margin="normal"
            required
            fullWidth
            id="name" // Changed from title to name
            label="Name" // Changed from Title to Name
            autoFocus
            error={!!errors.Name} // Changed from Title to Name
            helperText={errors.Name ? errors.Name.message : ""} // Changed from Title to Name
          />
        )}
      />
      <Controller
        name="Description"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            margin="normal"
            fullWidth
            id="description"
            label="Description"
            multiline
            rows={4}
            error={!!errors.Description}
            helperText={errors.Description ? errors.Description.message : ""}
          />
        )}
      />
      {/* Removed IsGlobal, IsDefault, IsDeprecated, DeprecationDate controls */}

      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        disabled={isSubmitting}
      >
        {isSubmitting
          ? "Submitting..."
          : isEditMode
          ? "Update Record"
          : "Create Record"}
      </Button>
    </Box>
  );
};

export default RecordForm;
