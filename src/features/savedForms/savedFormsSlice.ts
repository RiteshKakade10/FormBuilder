import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { FormSchema } from '../formBuilder/types'
import { loadFromStorage, saveToStorage } from '../../utils/localStorage'

const STORAGE_KEY = 'upliance_forms_v1'

interface SavedFormsState {
  forms: FormSchema[]
}

const initialState: SavedFormsState = {
  forms: loadFromStorage<FormSchema[]>(STORAGE_KEY) ?? []
}

const slice = createSlice({
  name: 'savedForms',
  initialState,
  reducers: {
    setForms(state, action: PayloadAction<FormSchema[]>) {
      state.forms = action.payload
      saveToStorage(STORAGE_KEY, state.forms)
    },
    upsertForm(state, action: PayloadAction<FormSchema>) {
      const form = action.payload
      const idx = state.forms.findIndex((f) => f.id === form.id)
      if (idx >= 0) state.forms[idx] = form
      else state.forms.unshift(form)
      saveToStorage(STORAGE_KEY, state.forms)
    },
    deleteForm(state, action: PayloadAction<string>) {
      state.forms = state.forms.filter((f) => f.id !== action.payload)
      saveToStorage(STORAGE_KEY, state.forms)
    }
  }
})

export const { setForms, upsertForm, deleteForm } = slice.actions
export default slice.reducer
