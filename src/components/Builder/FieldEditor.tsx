import React, { useEffect, useState } from 'react'
import { Box, TextField, Switch, FormControlLabel, Button, Typography, MenuItem, Stack } from '@mui/material'
import { FormField } from '../../features/formBuilder/types'
import { updateField } from '../../features/formBuilder/formBuilderSlice'
import { useAppDispatch } from '../../hooks'

interface Props {
  field?: FormField | null
  onClose?: () => void
}

export default function FieldEditor({ field, onClose }: Props) {
  const dispatch = useAppDispatch()
  const [local, setLocal] = useState<FormField | null>(field ?? null)

  useEffect(() => setLocal(field ?? null), [field])

  if (!local) return null

  function apply() {
    dispatch(updateField({ id: local.id, patch: local }))
    if (onClose) onClose()
  }

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6">Edit Field</Typography>
      <Stack spacing={2} sx={{ mt: 1 }}>
        <TextField label="Label" value={local.label} onChange={(e) => setLocal({ ...local, label: e.target.value })} />
        <TextField label="Name" value={local.name} onChange={(e) => setLocal({ ...local, name: e.target.value })} />
        <TextField select label="Type" value={local.type} onChange={(e) => setLocal({ ...local, type: e.target.value as any })}>
          <MenuItem value="text">Text</MenuItem>
          <MenuItem value="number">Number</MenuItem>
          <MenuItem value="textarea">Textarea</MenuItem>
          <MenuItem value="select">Select</MenuItem>
          <MenuItem value="radio">Radio</MenuItem>
          <MenuItem value="checkbox">Checkbox</MenuItem>
          <MenuItem value="date">Date</MenuItem>
          <MenuItem value="derived">Derived</MenuItem>
        </TextField>
        <TextField label="Placeholder" value={local.placeholder ?? ''} onChange={(e) => setLocal({ ...local, placeholder: e.target.value })} />
        <FormControlLabel control={<Switch checked={!!local.required} onChange={(e) => setLocal({ ...local, required: e.target.checked })} />} label="Required" />
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button variant="contained" onClick={apply}>Save</Button>
          {onClose && <Button variant="outlined" onClick={onClose}>Cancel</Button>}
        </Box>
      </Stack>
    </Box>
  )
}
