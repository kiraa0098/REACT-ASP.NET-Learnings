import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, Button, Paper, TextField, Divider, IconButton } from "@mui/material";
import { Add as AddIcon, ArrowBackIos as ArrowBackIcon, ArrowForwardIos as ArrowForwardIcon } from "@mui/icons-material";
import RecordTable from "../components/RecordTable";
import { useRecordsQuery, useDeleteRecordMutation } from "../hooks/index";
import { useAppStore } from "../../../common/stores/useAppStore";
import ConfirmDialog from "../../../common/components/ConfirmDialog";

const RecordListPage: React.FC = () => {
  const navigate = useNavigate();
  const { showSnackbar, setLoading } = useAppStore();

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [pageInput, setPageInput] = useState<string>(page.toString());
  const [openConfirm, setOpenConfirm] = useState(false);
  const [recordToDeleteId, setRecordToDeleteId] = useState<number | null>(null);

  const {
    data: pagedRecords,
    isLoading: isQueryLoading,
    isError: isQueryError,
  } = useRecordsQuery(page, pageSize);
  const records = pagedRecords?.items || [];
  const totalPages = pagedRecords?.totalPages || 1;
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

  const handlePageInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (value === "") {
      setPageInput("");
      return;
    }
    if (/^\d+$/.test(value)) {
      setPageInput(value);
      const newPage = parseInt(value, 10);
      if (newPage > 0 && newPage <= totalPages) {
        setPage(newPage);
      }
    }
  };

  useEffect(() => {
    setPageInput(page.toString());
  }, [page]);

  return (
    <Box
      sx={{
        bgcolor: "background.paper",
        boxShadow: 3,
        borderRadius: 2,
        p: { xs: 2, sm: 3, md: 4 },
        display: "flex",
        flexDirection: "column",
        maxWidth: 1000,
        mx: "auto",
        minHeight: "400px",
      }}
    >
      <Box
        sx={{
          mb: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 2,
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

      <Divider sx={{ mb: 3 }} />

      {isQueryError ? (
        <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Typography color="error" sx={{ textAlign: "center", my: 2 }}>
            Error loading records. Please try again.
          </Typography>
        </Box>
      ) : (
        <>
          <RecordTable
            records={records}
            isLoading={isQueryLoading}
            isError={isQueryError}
            onEdit={handleEdit}
            onDelete={handleDeleteClick}
          />
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              mt: 3,
              p: 1,
              gap: 1,
            }}
          >
            <IconButton onClick={() => setPage(page - 1)} disabled={page <= 1}>
              <ArrowBackIcon />
            </IconButton>
            <Typography variant="body2" sx={{ mx: 1 }}>
              Page
            </Typography>
            <TextField
              value={pageInput}
              onChange={handlePageInputChange}
              type="text"
              inputProps={{ inputMode: "numeric", pattern: "[0-9]*" , style: { textAlign: 'center' }}}
              sx={{ width: 60 }}
              size="small"
              variant="outlined"
            />
            <Typography variant="body2" sx={{ mx: 1 }}>
              of {totalPages}
            </Typography>
            <IconButton onClick={() => setPage(page + 1)} disabled={page >= totalPages}>
              <ArrowForwardIcon />
            </IconButton>
          </Box>
        </>
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