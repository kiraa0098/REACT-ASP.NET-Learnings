import { Outlet } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { Box } from '@mui/material';
import "./App.css";

function App() {
  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: 'grey.100', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Outlet /> {/* This will render the matched child route */}
      <Toaster 
        position="top-center"
        containerStyle={{
          width: '75%',
          left: '50%', // Center the container
          transform: 'translateX(-50%)', // Adjust for centering
        }}
        toastOptions={{
          style: {
            background: '#fffde7', // Match notebook paper color
            color: '#213547', // Match primary text color
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', // Subtle shadow
          },
        }}
      />
    </Box>
  );
}

export default App;
