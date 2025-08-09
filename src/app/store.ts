import { configureStore } from '@reduxjs/toolkit'
import formBuilderReducer from '../features/formBuilder/formBuilderSlice'
import savedFormsReducer from '../features/savedForms/savedFormsSlice'

export const store = configureStore({
  reducer: {
    formBuilder: formBuilderReducer,
    savedForms: savedFormsReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
