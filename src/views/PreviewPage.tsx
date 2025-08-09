import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useAppSelector } from '../hooks'
import FormPreview from '../components/Preview/FormPreview'
import { Container, Button } from '@mui/material'
import { loadFromStorage } from '../utils/localStorage'

// Example validation function
const validateForm = (schema, values) => {
  if (!schema || !schema.fields) return false
  for (const field of schema.fields) {
    const value = values[field.name]
    if (field.required && (value === undefined || value === null || value === '')) {
      alert(`Please fill in the required field: ${field.label || field.name}`)
      return false
    }
  }
  return true
}

export default function PreviewPage() {
  const { formId } = useParams()
  const navigate = useNavigate()
  const builderForm = useAppSelector((s) => s.formBuilder.currentForm)
  const savedForms = useAppSelector((s) => s.savedForms.forms)

  let schema = builderForm ?? savedForms[0]
  if (formId) {
    const found = savedForms.find((f) => f.id === formId)
    if (found) schema = found
    else {
      const stored = loadFromStorage('upliance_forms_v1')
      if (Array.isArray(stored)) {
        const s = stored.find((x) => x.id === formId)
        if (s) schema = s
      }
    }
  }

  if (!schema) return <div>No form available to preview</div>

  return (
    <Container sx={{ mt: 4 }}>
      <Button onClick={() => navigate('/myforms')} sx={{ mb: 2 }}>
        Back to My Forms
      </Button>
      <FormPreview
        schema={schema}
        onSubmit={(vals) => {
          if (validateForm(schema, vals)) {
            console.log('Preview submit', vals)
            alert('Form is valid — Submitted (no backend). Check console.')
          } else {
            console.warn('Form validation failed', vals)
          }
        }}
      />
    </Container>
  )
}
