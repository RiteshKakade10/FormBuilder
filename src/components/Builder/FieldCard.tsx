import React from 'react'
import { Card, CardContent, Typography, CardActions, IconButton } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import { FormField } from '../../features/formBuilder/types'

interface Props {
  field: FormField
  onEdit: (id: string) => void
  onDelete: (id: string) => void
}

export default function FieldCard({ field, onEdit, onDelete }: Props) {
  return (
    <Card sx={{ mb: 1 }}>
      <CardContent>
        <Typography variant="subtitle1">{field.label}</Typography>
        <Typography variant="caption" color="text.secondary">
          {field.type} {field.required ? ' • required' : ''} {field.derived ? ' • derived' : ''}
        </Typography>
      </CardContent>
      <CardActions>
        <IconButton onClick={() => onEdit(field.id)} size="small"><EditIcon /></IconButton>
        <IconButton onClick={() => onDelete(field.id)} size="small"><DeleteIcon /></IconButton>
      </CardActions>
    </Card>
  )
}
