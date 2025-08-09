import React from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { RootState } from '../../app/store'
import { Box, List, ListItem, ListItemText, IconButton } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import { formatDateIso } from '../../utils/helpers'
import { deleteForm } from '../../features/savedForms/savedFormsSlice'
import { useNavigate } from 'react-router-dom'

export default function MyFormsList() {
  const forms = useAppSelector((s: RootState) => s.savedForms.forms)
  const dispatch = useAppDispatch()
  const nav = useNavigate()

  return (
    <Box>
      <List>
        {forms.map((f) => (
          <ListItem key={f.id} secondaryAction={<IconButton onClick={() => dispatch(deleteForm(f.id))}><DeleteIcon /></IconButton>} button onClick={() => nav(`/preview/${f.id}`)}>
            <ListItemText primary={f.name} secondary={formatDateIso(f.createdAt)} />
          </ListItem>
        ))}
      </List>
    </Box>
  )
}
