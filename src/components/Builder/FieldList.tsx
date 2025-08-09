import React from 'react'
import { Box } from '@mui/material'
import FieldCard from './FieldCard'
import { FormField } from '../../features/formBuilder/types'

interface Props {
  fields: FormField[]
  onEdit: (id: string) => void
  onDelete: (id: string) => void
}

export default function FieldList({ fields, onEdit, onDelete }: Props) {
  return (
    <Box>
      {fields.map((f) => (
        <FieldCard key={f.id} field={f} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </Box>
  )
}
