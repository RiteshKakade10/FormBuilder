import React from 'react'
import { TextField, MenuItem, FormControl, FormControlLabel, Checkbox, RadioGroup, Radio, FormHelperText } from '@mui/material'
import { FormField } from '../../features/formBuilder/types'

interface Props {
  field: FormField
  value: any
  error?: string | null
  onChange: (v: any) => void
}

export default function FieldRenderer({ field, value, error, onChange }: Props) {
  if (field.type === 'textarea') {
    return (
      <TextField label={field.label} multiline rows={4} value={value ?? ''} onChange={(e) => onChange(e.target.value)} error={!!error} helperText={error} />
    )
  }

  if (field.type === 'select') {
    return (
      <TextField select label={field.label} value={value ?? ''} onChange={(e) => onChange(e.target.value)} error={!!error} helperText={error}>
        {(field.options ?? []).map((o) => (<MenuItem key={o.id} value={o.value}>{o.label}</MenuItem>))}
      </TextField>
    )
  }

  if (field.type === 'radio') {
    return (
      <FormControl error={!!error}>
        <RadioGroup value={value ?? ''} onChange={(e) => onChange(e.target.value)}>
          {(field.options ?? []).map((o) => (<FormControlLabel key={o.id} value={o.value} control={<Radio />} label={o.label} />))}
        </RadioGroup>
        <FormHelperText>{error}</FormHelperText>
      </FormControl>
    )
  }

  if (field.type === 'checkbox') {
    return (
      <FormControl error={!!error}>
        <FormControlLabel control={<Checkbox checked={!!value} onChange={(e) => onChange(e.target.checked)} />} label={field.label} />
        <FormHelperText>{error}</FormHelperText>
      </FormControl>
    )
  }

  if (field.type === 'date') {
    return (
      <TextField type="date" label={field.label} InputLabelProps={{ shrink: true }} value={value ?? ''} onChange={(e) => onChange(e.target.value)} error={!!error} helperText={error} />
    )
  }

  return (
    <TextField label={field.label} type={field.type === 'number' ? 'number' : 'text'} value={value ?? ''} onChange={(e) => onChange(e.target.value)} error={!!error} helperText={error} />
  )
}
