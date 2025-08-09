export function uid(prefix = '') {
  return prefix + Math.random().toString(36).slice(2, 9) + '-' + Date.now().toString(36).slice(-4)
}

export function sanitizeName(s: string) {
  return s.toLowerCase().replace(/\s+/g, '_').replace(/[^a-z0-9_]/g, '')
}

export function formatDateIso(iso?: string) {
  if (!iso) return ''
  const d = new Date(iso)
  return d.toLocaleString()
}
