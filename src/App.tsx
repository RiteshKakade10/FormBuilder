import React from 'react';
import AppRoutes from './routes/AppRoutes';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

export default function App() {
  return (
    <div>
      <AppBar 
        position="static" 
        sx={{ 
          background: 'linear-gradient(90deg, #6a11cb, #2575fc)',
          boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
        }}
      >
        <Toolbar>
          <Typography 
            component="div" 
            sx={{ 
              flexGrow: 1, 
              fontWeight: 'bold', 
              fontSize: '1.5rem',
              letterSpacing: '1px',
            }}
          >
            Form Builder
          </Typography>

          <Button 
            color="inherit" 
            component={RouterLink} 
            to="/create"
            sx={{
              textTransform: 'none',
              fontWeight: '500',
              fontSize: '1rem',
              '&:hover': {
                backgroundColor: 'rgba(255,255,255,0.2)',
                borderRadius: '8px',
              }
            }}
          >
            Create
          </Button>

          <Button 
            color="inherit" 
            component={RouterLink} 
            to="/myforms"
            sx={{
              textTransform: 'none',
              fontWeight: '500',
              fontSize: '1rem',
              ml: 2,
              '&:hover': {
                backgroundColor: 'rgba(255,255,255,0.2)',
                borderRadius: '8px',
              }
            }}
          >
            My Forms
          </Button>
        </Toolbar>
      </AppBar>

      <div style={{ padding: '20px', backgroundColor: '#f4f6f8', minHeight: '100vh' }}>
        <AppRoutes />
      </div>
    </div>
  );
}
