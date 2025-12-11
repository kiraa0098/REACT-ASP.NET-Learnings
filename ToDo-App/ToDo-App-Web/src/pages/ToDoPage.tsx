import { Paper, Box, Typography, Button } from "@mui/material";
import ToDoList from "../components/ToDoList";
import AddToDoForm from "../components/AddToDoForm";
import { exportToDos } from "../api/api"; // Import the new function
import toast from "react-hot-toast";

const ToDoPage: React.FC = () => {
  const handleExport = async () => {
    try {
      const excelBlob = await exportToDos();
      const url = window.URL.createObjectURL(new Blob([excelBlob]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "ToDoItems.xlsx");
      document.body.appendChild(link);
      link.click();
      link.parentNode?.removeChild(link);
      toast.success("To-Do items exported successfully!");
    } catch (error) {
      console.error("Error exporting To-Do items:", error);
      toast.error("Failed to export To-Do items.");
    }
  };

  return (
    <Paper
      elevation={3}
      sx={{
        width: "75%", // Use % for parent width
        height: "90vh",
        overflowY: "auto",
        position: "relative",
        backgroundColor: "#fffde7", // A light yellow color similar to Google Keep
        "&::-webkit-scrollbar": {
          width: "8px",
        },
        "&::-webkit-scrollbar-track": {
          backgroundColor: "#fffde7", // Match notebook background
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: "#c4b59d", // A brownish color for the thumb
          borderRadius: "4px",
        },
      }}
    >
      <Box
        sx={{
          position: "sticky",
          top: 0,
          zIndex: 1,
          backgroundColor: "#fffde7",
          padding: "2rem 2rem 1rem 2rem",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Typography variant="h4" component="h1">
            ToDo App
          </Typography>
          <Button variant="contained" color="primary" onClick={handleExport}>
            Export to Excel
          </Button>
        </Box>
        <AddToDoForm />
      </Box>
      <Box sx={{ padding: "0 2rem 2rem 2rem" }}>
        <ToDoList />
      </Box>
    </Paper>
  );
};

export default ToDoPage;
