import React from 'react';
import { Routes, Route, Link as RouterLink } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Box, Snackbar, Alert, CircularProgress } from '@mui/material'; // Added CircularProgress
import RecordListPage from './features/records/pages/RecordListPage';
import RecordFormPage from './features/records/pages/RecordFormPage';
import { useAppStore } from './common/stores/useAppStore';
import PageLayout from './common/layouts/PageLayout';

function App() {
  const { snackbar, hideSnackbar, isLoading } = useAppStore(); // Added isLoading

  return (
    <Box sx={{ flexGrow: 1, position: 'relative' }}> {/* Added position: 'relative' for overlay positioning */}
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <RouterLink to="/" style={{ color: 'inherit', textDecoration: 'none' }}>
              CDM Records App
            </RouterLink>
          </Typography>
          <Button color="inherit" component={RouterLink} to="/records">
            Records
          </Button>
          {/* Add other navigation links here if needed */}
        </Toolbar>
      </AppBar>

      <PageLayout> {/* Wrap Routes with PageLayout */}
        <Routes>
          <Route path="/" element={<RecordListPage />} />
          <Route path="/records" element={<RecordListPage />} />
          <Route path="/records/new" element={<RecordFormPage />} />
          <Route path="/records/:id/edit" element={<RecordFormPage />} />
          {/* Add a 404 Not Found page here if desired */}
          <Route path="*" element={<Typography variant="h4" sx={{ mt: 4, textAlign: 'center' }}>404 - Not Found</Typography>} />
        </Routes>
      </PageLayout>

      {/* Global Loading Overlay */}
      {isLoading && (
        <Box
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: 'rgba(0, 0, 0, 0.3)', // Semi-transparent background
            zIndex: 9999, // Ensure it's on top of everything
          }}
        >
          <CircularProgress color="inherit" />
        </Box>
      )}

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={hideSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={hideSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default App;
