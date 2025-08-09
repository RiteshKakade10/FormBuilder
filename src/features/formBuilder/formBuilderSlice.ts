import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { FormSchema, FormField } from './types'
import { createEmptyForm } from './utils'
import { loadFromStorage, saveToStorage } from '../../utils/localStorage'

const STORAGE_KEY_DRAFT = 'upliance_builder_draft_v1'

interface FormBuilderState {
  currentForm: FormSchema | null
  editingFieldId?: string | null
  previewMode: boolean
  dirty: boolean
}

const initialState: FormBuilderState = {
  currentForm: loadFromStorage<FormSchema>(STORAGE_KEY_DRAFT) ?? createEmptyForm(),
  editingFieldId: null,
  previewMode: false,
  dirty: false
}

const slice = createSlice({
  name: 'formBuilder',
  initialState,
  reducers: {
    createNewForm(state) {
      state.currentForm = createEmptyForm()
      state.editingFieldId = null
      state.dirty = true
      saveToStorage(STORAGE_KEY_DRAFT, state.currentForm)
    },
    loadFormIntoBuilder(state, action: PayloadAction<FormSchema>) {
      state.currentForm = action.payload
      state.editingFieldId = null
      state.dirty = false
      saveToStorage(STORAGE_KEY_DRAFT, state.currentForm)
    },
    addField(state, action: PayloadAction<FormField>) {
      if (!state.currentForm) return
      const f = action.payload
      f.order = state.currentForm.fields.length
      state.currentForm.fields.push(f)
      state.dirty = true
      saveToStorage(STORAGE_KEY_DRAFT, state.currentForm)
    },
    updateField(state, action: PayloadAction<{ id: string; patch: Partial<FormField> }>) {
      if (!state.currentForm) return
      const { id, patch } = action.payload
      const idx = state.currentForm.fields.findIndex((x) => x.id === id)
      if (idx >= 0) {
        state.currentForm.fields[idx] = { ...state.currentForm.fields[idx], ...patch }
        state.dirty = true
        state.currentForm.updatedAt = new Date().toISOString()
        saveToStorage(STORAGE_KEY_DRAFT, state.currentForm)
      }
    },
    deleteField(state, action: PayloadAction<string>) {
      if (!state.currentForm) return
      state.currentForm.fields = state.currentForm.fields.filter((f) => f.id !== action.payload)
      state.currentForm.fields = state.currentForm.fields.map((f, idx) => ({ ...f, order: idx }))
      state.dirty = true
      state.currentForm.updatedAt = new Date().toISOString()
      saveToStorage(STORAGE_KEY_DRAFT, state.currentForm)
    },
    setCurrentForm(state, action: PayloadAction<FormSchema>) {
      state.currentForm = action.payload
      saveToStorage(STORAGE_KEY_DRAFT, state.currentForm)
    },
    setPreviewMode(state, action: PayloadAction<boolean>) {
      state.previewMode = action.payload
    },
    setEditingField(state, action: PayloadAction<string | null>) {
      state.editingFieldId = action.payload
    },
    setDirty(state, action: PayloadAction<boolean>) {
      state.dirty = action.payload
    },
    clearDraft(state) {
      state.currentForm = createEmptyForm()
      state.dirty = false
      saveToStorage(STORAGE_KEY_DRAFT, state.currentForm)
    }
  }
})

export const {
  createNewForm,
  loadFormIntoBuilder,
  addField,
  updateField,
  deleteField,
  setCurrentForm,
  setPreviewMode,
  setEditingField,
  setDirty,
  clearDraft
} = slice.actions

export default slice.reducer
