import { FormField } from '../features/formBuilder/types'

export function validateField(field: FormField, value: any): string | null {
  const rules = field.validations ?? []
  for (const r of rules) {
    const t = r.type
    if (t === 'required') {
      if (
        value === undefined ||
        value === null ||
        value === '' ||
        (Array.isArray(value) && value.length === 0)
      ) {
        return r.message ?? 'This field is required'
      }
    }
    if (t === 'minLength') {
      if (String(value ?? '').length < Number(r.value)) return r.message ?? `Minimum ${r.value} characters required`
    }
    if (t === 'maxLength') {
      if (String(value ?? '').length > Number(r.value)) return r.message ?? `Maximum ${r.value} characters allowed`
    }
    if (t === 'email') {
      const val = String(value ?? '')
      if (val && !/^\S+@\S+\.\S+$/.test(val)) return r.message ?? 'Invalid email'
    }
    if (t === 'passwordCustom') {
      const val = String(value ?? '')
      if (!(val.length >= 8 && /\d/.test(val))) return r.message ?? 'Password must be 8+ chars and contain a number'
    }
    if (t === 'min') {
      if (Number(value) < Number(r.value)) return r.message ?? `Minimum ${r.value}`
    }
    if (t === 'max') {
      if (Number(value) > Number(r.value)) return r.message ?? `Maximum ${r.value}`
    }
    if (t === 'custom') {
      try {
        const rx = new RegExp(String(r.value))
        if (!rx.test(String(value ?? ''))) return r.message ?? 'Invalid format'
      } catch {}
    }
  }
  return null
}
