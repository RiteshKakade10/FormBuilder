import React, { useState } from 'react'
import { Box, Typography, TextField, Button, MenuItem } from '@mui/material'
import { FormField } from '../../features/formBuilder/types'
import { evaluateDerivedExpression } from '../../utils/derivedEvaluator'

interface Props {
  field: FormField
  allFields: FormField[]
  onSave: (derived: any) => void
  onClose?: () => void
}

export default function DerivedFieldEditor({ field, allFields, onSave, onClose }: Props) {
  const [expression, setExpression] = useState(field.derived?.expression ?? '')
  const [parents, setParents] = useState<string[]>(field.derived?.parentFieldIds ?? [])
  const [previewRes, setPreviewRes] = useState<any>('')

  function computePreview() {
    const map: Record<string, any> = {}
    parents.forEach((p) => {
      const f = allFields.find((x) => x.id === p)
      if (f) map[f.name] = f.defaultValue ?? ''
    })
    const res = evaluateDerivedExpression(expression, map)
    setPreviewRes(res)
  }

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="subtitle1">Derived Field</Typography>
      <TextField select label="Parent fields" value={parents.join(',')} onChange={(e) => {
        const val = e.target.value
        setParents(val ? val.split(',') : [])
      }} helperText="Select parent field ids separated by comma">
        {allFields.map((af) => (
          <MenuItem key={af.id} value={af.id}>
            {af.label} ({af.name})
          </MenuItem>
        ))}
      </TextField>
      <TextField label="Expression" value={expression} onChange={(e) => setExpression(e.target.value)} helperText={`Examples: age(dob)  OR  field1 + field2`} fullWidth sx={{ mt: 1 }} />
      <Box sx={{ mt: 1 }}>
        <Button onClick={computePreview} variant="contained">Preview</Button>
        <Button onClick={() => { onSave({ parentFieldIds: parents, expression }); if (onClose) onClose() }} sx={{ ml: 1 }} variant="outlined">Save</Button>
      </Box>
      <Box sx={{ mt: 2 }}>
        <Typography variant="body2">Preview result: {String(previewRes)}</Typography>
      </Box>
    </Box>
  )
}
