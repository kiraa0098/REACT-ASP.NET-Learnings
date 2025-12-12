import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { Box } from "@mui/material";
import "./App.css";

function App() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "grey.100",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Outlet />
      <Toaster
        position="top-center"
        containerStyle={{
          width: "75%",
          left: "50%",
          transform: "translateX(-50%)",
        }}
        toastOptions={{
          style: {
            background: "#fffde7",
            color: "#213547",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
          },
        }}
      />
    </Box>
  );
}

export default App;
