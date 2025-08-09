import { FormField, FormSchema } from './types'

export function uid(prefix = '') {
  return prefix + Math.random().toString(36).slice(2, 9) + '-' + Date.now().toString(36).slice(-4)
}

export function sanitizeName(s: string) {
  return s.toLowerCase().replace(/\s+/g, '_').replace(/[^a-z0-9_]/g, '')
}

export function createEmptyForm(): FormSchema {
  const now = new Date().toISOString()
  return {
    id: uid(),
    name: 'Untitled Form',
    createdAt: now,
    updatedAt: now,
    schemaVersion: 1,
    fields: []
  }
}

export function createField(overrides?: Partial<FormField>): FormField {
  const id = uid()
  const name = overrides?.name ?? sanitizeName('field_' + id)
  return {
    id,
    type: overrides?.type ?? 'text',
    name,
    label: overrides?.label ?? 'New Field',
    placeholder: overrides?.placeholder ?? '',
    required: overrides?.required ?? false,
    defaultValue: overrides?.defaultValue ?? '',
    options: overrides?.options ?? [],
    validations: overrides?.validations ?? [],
    derived: overrides?.derived ?? null,
    order: overrides?.order ?? 0
  }
}
