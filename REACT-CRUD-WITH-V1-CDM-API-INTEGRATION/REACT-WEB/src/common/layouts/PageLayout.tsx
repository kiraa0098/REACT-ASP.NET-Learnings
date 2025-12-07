// C:\Users\alwynn\Desktop\Todo-App\REACT-CRUD-WITH-V1-CDM-API-INTEGRATION\REACT-WEB\src\common\layouts\PageLayout.tsx

import React from 'react';
import { Box, Container } from '@mui/material';

interface PageLayoutProps {
  children: React.ReactNode;
}

const PageLayout: React.FC<PageLayoutProps> = ({ children }) => {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      {/* Reintroducing Box for central alignment */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',    // Center children horizontally
          justifyContent: 'center', // Center children vertically
          // Calculate minHeight: 100vh (viewport height) - AppBar height (e.g., 64px) - top/bottom margins (e.g., 2*4*8px = 64px)
          minHeight: 'calc(100vh - 64px - 64px)',
          width: '100%', // Ensure it takes full width within the container
        }}
      >
        {children}
      </Box>
    </Container>
  );
};

export default PageLayout;
