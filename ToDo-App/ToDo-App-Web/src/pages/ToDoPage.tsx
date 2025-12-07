import React from "react";
import { Paper, Box, Typography } from "@mui/material";
import ToDoList from "../components/ToDoList";
import AddToDoForm from "../components/AddToDoForm";

const ToDoPage: React.FC = () => {
  return (
    <Paper 
      elevation={3} 
      sx={{
        width: '75%', // Use % for parent width
        height: '90vh',
        overflowY: 'auto',
        position: 'relative',
        backgroundColor: '#fffde7', // A light yellow color similar to Google Keep
        '&::-webkit-scrollbar': {
          width: '8px',
        },
        '&::-webkit-scrollbar-track': {
          backgroundColor: '#fffde7', // Match notebook background
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: '#c4b59d', // A brownish color for the thumb
          borderRadius: '4px',
        },
      }}
    >
      <Box 
        sx={{ 
          position: 'sticky', 
          top: 0, 
          zIndex: 1, 
          backgroundColor: '#fffde7',
          padding: '2rem 2rem 1rem 2rem',
        }}
      >
        <Typography variant="h4" component="h1" sx={{ textAlign: 'left', mb: 2 }}>
          ToDo App
        </Typography>
        <AddToDoForm />
      </Box>
      <Box sx={{ padding: '0 2rem 2rem 2rem' }}>
        <ToDoList />
      </Box>
    </Paper>
  );
};

export default ToDoPage;
