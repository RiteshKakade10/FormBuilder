import React from 'react'
import { Typography } from '@mui/material'

export default function ValidationMessage({ message }: { message?: string | null }) {
  if (!message) return null
  return <Typography variant="caption" color="error">{message}</Typography>
}
