import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import CreatePage from '../views/CreatePage'
import PreviewPage from '../views/PreviewPage'
import MyFormsPage from '../views/MyFormsPage'

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/create" replace />} />
      <Route path="/create" element={<CreatePage />} />
      <Route path="/preview" element={<PreviewPage />} />
      <Route path="/preview/:formId" element={<PreviewPage />} />
      <Route path="/myforms" element={<MyFormsPage />} />
    </Routes>
  )
}
