import React, { useState } from 'react'
import { Box, Container, Button, Grid, Paper } from '@mui/material'
import AddFieldDrawer from '../components/Builder/AddFieldDrawer'
import FieldList from '../components/Builder/FieldList'
import FieldEditor from '../components/Builder/FieldEditor'
import SaveFormDialog from '../components/Builder/SaveFormDialog'
import DerivedFieldEditor from '../components/Builder/DerivedFieldEditor'
import { useAppDispatch, useAppSelector } from '../hooks'
import { setEditingField, deleteField, setPreviewMode, setCurrentForm } from '../features/formBuilder/formBuilderSlice'
import type { FormField } from '../features/formBuilder/types'

// Temporary preview renderer — replace with your own implementation
function PreviewForm({ fields }: { fields: FormField[] }) {
  return (
    <Box>
      {fields.length === 0 && <Box sx={{ color: 'text.secondary' }}>No fields to preview</Box>}
      {fields.map((f) => (
        <Paper key={f.id} sx={{ p: 2, mb: 1 }}>
          <strong>{f.label}</strong>
          <Box sx={{ mt: 1 }}>
            <input
              type={f.type === 'number' ? 'number' : 'text'}
              placeholder={f.placeholder || ''}
              disabled
              style={{ width: '100%', padding: '8px' }}
            />
          </Box>
        </Paper>
      ))}
    </Box>
  )
}

export default function CreatePage() {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [saveOpen, setSaveOpen] = useState(false)

  const form = useAppSelector((s) => s.formBuilder.currentForm)
  const editingId = useAppSelector((s) => s.formBuilder.editingFieldId)
  const previewMode = useAppSelector((s) => s.formBuilder.previewMode)

  const dispatch = useAppDispatch()

  const editingField = form?.fields.find((f) => f.id === editingId) ?? null

  function onEdit(id: string) {
    dispatch(setEditingField(id))
  }

  function onDelete(id: string) {
    dispatch(deleteField(id))
  }

  // If preview mode is active, show preview screen
  if (previewMode) {
    return (
      <Container sx={{ mt: 4 }}>
        <Paper sx={{ p: 2 }}>
          <Button variant="outlined" onClick={() => dispatch(setPreviewMode(false))}>
            Back to Edit
          </Button>
          <Box sx={{ mt: 2 }}>
            <PreviewForm fields={form?.fields ?? []} />
          </Box>
        </Paper>
      </Container>
    )
  }

  // Default builder UI
  return (
    <Container sx={{ mt: 4 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2 }}>
            <Button variant="contained" onClick={() => setDrawerOpen(true)}>Add Field</Button>
            <Button sx={{ ml: 1 }} onClick={() => setSaveOpen(true)} variant="outlined">Save</Button>
            <Button sx={{ ml: 1 }} onClick={() => dispatch(setPreviewMode(true))} variant="text">Preview</Button>
            <Box sx={{ mt: 2 }}>
              <FieldList fields={form?.fields ?? []} onEdit={onEdit} onDelete={onDelete} />
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 2 }}>
            {editingField ? (
              <>
                <FieldEditor field={editingField} onClose={() => dispatch(setEditingField(null))} />
                {editingField.type === 'derived' && (
                  <DerivedFieldEditor
                    field={editingField}
                    allFields={form?.fields ?? []}
                    onSave={(derived) =>
                      dispatch(
                        setCurrentForm({
                          ...form!,
                          fields: form!.fields.map((f) =>
                            f.id === editingField.id ? { ...f, derived } : f
                          )
                        })
                      )
                    }
                    onClose={() => dispatch(setEditingField(null))}
                  />
                )}
              </>
            ) : (
              <Box sx={{ color: 'text.secondary' }}>Select a field to edit</Box>
            )}
          </Paper>
        </Grid>
      </Grid>
      <AddFieldDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
      <SaveFormDialog open={saveOpen} onClose={() => setSaveOpen(false)} />
    </Container>
  )
}
