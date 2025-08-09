import React from 'react'
import { Drawer, Box, List, ListItem, ListItemButton, ListItemText, Typography } from '@mui/material'
import { createField } from '../../features/formBuilder/utils'
import { FormField } from '../../features/formBuilder/types'
import { useAppDispatch } from '../../hooks'
import { addField } from '../../features/formBuilder/formBuilderSlice'

interface Props {
  open: boolean
  onClose: () => void
}

const available = [
  { type: 'text', label: 'Text' },
  { type: 'number', label: 'Number' },
  { type: 'textarea', label: 'Textarea' },
  { type: 'select', label: 'Select' },
  { type: 'radio', label: 'Radio' },
  { type: 'checkbox', label: 'Checkbox' },
  { type: 'date', label: 'Date' },
  { type: 'derived', label: 'Derived' }
]

export default function AddFieldDrawer({ open, onClose }: Props) {
  const dispatch = useAppDispatch()

  function handleAdd(type: string) {
    const f: FormField = createField({
      type: type as any,
      label: `${type} field`,
      name: `${type}_${Date.now()}`
    })
    dispatch(addField(f))
    onClose()
  }

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box sx={{ width: 320, p: 2 }}>
        <Typography variant="h6">Add Field</Typography>
        <List>
          {available.map((a) => (
            <ListItem key={a.type} disablePadding>
              <ListItemButton onClick={() => handleAdd(a.type)}>
                <ListItemText primary={a.label} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  )
}
