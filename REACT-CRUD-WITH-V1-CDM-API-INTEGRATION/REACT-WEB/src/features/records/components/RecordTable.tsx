// C:\Users\alwynn\Desktop\Todo-App\REACT-CRUD-WITH-V1-CDM-API-INTEGRATION\REACT-WEB\src\features\records\components\RecordTable.tsx

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
  onEdit: (id: number) => void; // Changed id type to number
  onDelete: (id: number) => void; // Changed id type to number
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
            <TableCell>Name</TableCell> {/* Changed from Title to Name */}
            <TableCell>Description</TableCell>
            {/* Removed Is Global, Is Default, Is Deprecated headers */}
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {records.map((record) => (
            <TableRow
              key={record.Id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {record.Id}
              </TableCell>
              <TableCell>{record.Name}</TableCell> {/* Changed from Title to Name */}
              <TableCell>{record.Description?.substring(0, 50)}...</TableCell>
              <TableCell align="right">
                <Box
                  sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}
                >
                  <Button
                    variant="outlined"
                    startIcon={<EditIcon />}
                    onClick={() => record.Id && onEdit(record.Id)} // Ensure Id is not null
                    size="small"
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    startIcon={<DeleteIcon />}
                    onClick={() => record.Id && onDelete(record.Id)} // Ensure Id is not null
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
