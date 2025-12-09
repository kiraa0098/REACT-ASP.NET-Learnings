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
  initialData?: Record;
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
      Name: initialData?.name || "",
      Description: initialData?.description || "",
    },
  });

  useEffect(() => {
    reset({
      Name: initialData?.name || "",
      Description: initialData?.description || "",
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
        name="Name"
        control={control}
        rules={{ required: "Name is required" }}
        render={({ field }) => (
          <TextField
            {...field}
            margin="normal"
            required
            fullWidth
            id="name"
            label="Name"
            autoFocus
            error={!!errors.Name}
            helperText={errors.Name ? errors.Name.message : ""}
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
