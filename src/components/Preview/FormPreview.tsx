import React, { useEffect, useState } from 'react'
import { Box, Button, Stack } from '@mui/material'
import { FormSchema } from '../../features/formBuilder/types'
import FieldRenderer from './FieldRenderer'
import { evaluateDerivedExpression } from '../../utils/derivedEvaluator'
import { validateField } from '../../utils/validators'

interface Props {
  schema: FormSchema
  onSubmit?: (values: Record<string, any>) => void
}

export default function FormPreview({ schema, onSubmit }: Props) {
  const initial: Record<string, any> = {}
  schema.fields.forEach((f) => { initial[f.name] = f.defaultValue ?? '' })

  const [values, setValues] = useState<Record<string, any>>(initial)
  const [errors, setErrors] = useState<Record<string, string | null>>({})

  useEffect(() => {
    schema.fields.forEach((f) => {
      if (f.derived) {
        const parentMap: Record<string, any> = {}
        f.derived.parentFieldIds.forEach((pid) => {
          const p = schema.fields.find((x) => x.id === pid)
          if (p) parentMap[p.name] = values[p.name]
        })
        const res = evaluateDerivedExpression(f.derived.expression, parentMap)
        setValues((prev) => ({ ...prev, [f.name]: res }))
      }
    })
  }, [values, schema.fields])

  function handleChange(name: string, v: any) {
    setValues((prev) => ({ ...prev, [name]: v }))
    const field = schema.fields.find((f) => f.name === name)
    if (field) {
      const err = validateField(field, v)
      setErrors((prev) => ({ ...prev, [name]: err }))
    }
  }

  function doSubmit() {
    const newErrors: Record<string, string | null> = {}
    schema.fields.forEach((f) => {
      const err = validateField(f, values[f.name])
      newErrors[f.name] = err
    })
    setErrors(newErrors)
    const anyError = Object.values(newErrors).some((x) => x)
    if (!anyError) {
      if (onSubmit) onSubmit(values)
      else alert('Form submitted (no backend). Check console.')
      console.log('Submitted values', values)
    }
  }

  return (
    <Box>
      <Stack spacing={2}>
        {schema.fields.map((f) => (
          <FieldRenderer key={f.id} field={f} value={values[f.name]} error={errors[f.name]} onChange={(v) => handleChange(f.name, v)} />
        ))}
      </Stack>
      <Box sx={{ mt: 2 }}>
        <Button variant="contained" onClick={doSubmit}>Submit</Button>
      </Box>
    </Box>
  )
}
