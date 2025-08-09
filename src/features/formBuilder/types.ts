export type FieldType = 'text' | 'number' | 'textarea' | 'select' | 'radio' | 'checkbox' | 'date' | 'derived'

export interface ValidationRule {
  id: string
  type: 'required' | 'minLength' | 'maxLength' | 'email' | 'passwordCustom' | 'min' | 'max' | 'custom'
  value?: string | number
  message?: string
}

export interface FieldOption {
  id: string
  label: string
  value: string
}

export interface DerivedConfig {
  parentFieldIds: string[]
  expression: string
}

export interface FormField {
  id: string
  type: FieldType
  name: string
  label: string
  placeholder?: string
  required?: boolean
  defaultValue?: any
  options?: FieldOption[]
  validations?: ValidationRule[]
  derived?: DerivedConfig | null
  order?: number
}

export interface FormSchema {
  id: string
  name: string
  createdAt: string
  updatedAt?: string
  fields: FormField[]
  schemaVersion?: number
}
