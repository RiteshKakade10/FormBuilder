import React from 'react'
import { Container, Paper, Typography } from '@mui/material'
import MyFormsList from '../components/MyForms/MyFormsList'

export default function MyFormsPage() {
  return (
    <Container sx={{ mt: 4 }}>
      <Paper sx={{ p: 2 }}>
        <Typography variant="h6">My Forms</Typography>
        <MyFormsList />
      </Paper>
    </Container>
  )
}
