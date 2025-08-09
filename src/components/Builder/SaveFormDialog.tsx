import React, { useState, useEffect } from 'react'
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { upsertForm } from '../../features/savedForms/savedFormsSlice'
import type { RootState } from '../../app/store'

interface Props {
  open: boolean
  onClose: () => void
}

export default function SaveFormDialog({ open, onClose }: Props) {
  const form = useAppSelector((s: RootState) => s.formBuilder.currentForm)
  const dispatch = useAppDispatch()
  const [name, setName] = useState(form?.name ?? '')

  useEffect(() => setName(form?.name ?? ''), [form])

  function handleSave() {
    if (!form) return
    const toSave = { ...form, name: name || form.name, updatedAt: new Date().toISOString() }
    dispatch(upsertForm(toSave))
    onClose()
  }

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Save Form</DialogTitle>
      <DialogContent>
        <TextField label="Form name" value={name} onChange={(e) => setName(e.target.value)} fullWidth />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSave} variant="contained">Save</Button>
      </DialogActions>
    </Dialog>
  )
}
