import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Box,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import type { Record } from "../../../common/models/cdm";

interface RecordTableProps {
  records: Record[];
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
  isLoading: boolean;
  isError: boolean;
}

const RecordTable: React.FC<RecordTableProps> = ({
  records,
  onEdit,
  onDelete,
  isLoading,
  isError,
}) => {
  if (isLoading) {
    return <Typography>Loading records...</Typography>;
  }

  if (isError) {
    return <Typography color="error">Error loading records.</Typography>;
  }

  if (!records || records.length === 0) {
    return <Typography>No records found. Create one!</Typography>;
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="records table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Description</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {records.map((record) => (
            <TableRow
              key={record.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {record.id}
              </TableCell>
              <TableCell>{record.name}</TableCell>
              <TableCell>{record.description?.substring(0, 50)}...</TableCell>
              <TableCell align="right">
                <Box
                  sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}
                >
                  <Button
                    variant="outlined"
                    startIcon={<EditIcon />}
                    onClick={() => record.id && onEdit(record.id)}
                    size="small"
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    startIcon={<DeleteIcon />}
                    onClick={() => record.id && onDelete(record.id)}
                    size="small"
                  >
                    Delete
                  </Button>
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default RecordTable;
