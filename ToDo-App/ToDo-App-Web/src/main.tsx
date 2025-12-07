import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom'; // Import router components
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline'; // Import CssBaseline
import theme from './theme';
import './index.css';
import ToDoPage from './pages/ToDoPage'; // Import ToDoPage
import App from './App'; // Import App for the layout

const queryClient = new QueryClient();

// Define the routes
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />, // App component will act as a layout
    children: [
      {
        path: '/',
        element: <ToDoPage />,
      },
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <RouterProvider router={router} /> {/* Use RouterProvider */}
      </ThemeProvider>
    </QueryClientProvider>
  </StrictMode>
);
