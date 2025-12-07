import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, Button, Paper } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RecordTable from "../components/RecordTable";
import { useRecordsQuery, useDeleteRecordMutation } from "../hooks/index";
import { useAppStore } from "../../../common/stores/useAppStore";
import ConfirmDialog from "../../../common/components/ConfirmDialog";

const RecordListPage: React.FC = () => {
  const navigate = useNavigate();
  const { showSnackbar, setLoading } = useAppStore();

  const [openConfirm, setOpenConfirm] = useState(false);
  const [recordToDeleteId, setRecordToDeleteId] = useState<number | null>(null);

  const {
    data: pagedRecords,
    isLoading: isQueryLoading,
    isError: isQueryError,
  } = useRecordsQuery();
  const records = pagedRecords?.Items || [];
  const deleteMutation = useDeleteRecordMutation();

  useEffect(() => {
    setLoading(isQueryLoading || deleteMutation.isPending);
  }, [isQueryLoading, deleteMutation.isPending, setLoading]);

  const handleEdit = (id: number) => {
    navigate(`/records/${id}/edit`);
  };

  const handleDeleteClick = (id: number) => {
    setRecordToDeleteId(id);
    setOpenConfirm(true);
  };

  const handleConfirmDelete = () => {
    if (recordToDeleteId !== null) {
      deleteMutation.mutate(recordToDeleteId, {
        onSuccess: () => {
          showSnackbar("Record deleted successfully!", "success");
          setOpenConfirm(false);
          setRecordToDeleteId(null);
        },
        onError: (error) => {
          showSnackbar(`Error deleting record: ${error.message}`, "error");
          setOpenConfirm(false);
          setRecordToDeleteId(null);
        },
      });
    }
  };

  const handleCancelDelete = () => {
    setOpenConfirm(false);
    setRecordToDeleteId(null);
  };

  return (
    <Box
      sx={{
        bgcolor: "background.paper",
        boxShadow: 3,
        borderRadius: 2,
        p: 4,
        display: "flex",
        flexDirection: "column",
        maxWidth: 1000,
        mx: "auto",
        minHeight: "400px", // Maintain a minimum height for stable layout
      }}
    >
      <Box
        sx={{
          my: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Typography variant="h4" component="h1">
          Records List
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => navigate("/records/new")}
        >
          Create New Record
        </Button>
      </Box>

      {isQueryError ? ( // Conditionally render error message within the main Box
        <Typography color="error" sx={{ textAlign: "center", my: 2 }}>
          Error loading records.
        </Typography>
      ) : (
        <RecordTable
          records={records}
          isLoading={false}
          isError={false}
          onEdit={handleEdit}
          onDelete={handleDeleteClick}
        />
      )}

      <ConfirmDialog
        open={openConfirm}
        title="Confirm Deletion"
        message={`Are you sure you want to delete record with ID: ${recordToDeleteId}? This action cannot be undone.`}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </Box>
  );
};

export default RecordListPage;