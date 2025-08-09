export function saveToStorage<T = any>(key: string, data: T) {
  try {
    localStorage.setItem(key, JSON.stringify(data))
  } catch (e) {
    console.error('localStorage save failed', e)
  }
}

export function loadFromStorage<T = any>(key: string): T | null {
  try {
    const raw = localStorage.getItem(key)
    if (!raw) return null
    return JSON.parse(raw) as T
  } catch (e) {
    console.error('localStorage load failed', e)
    return null
  }
}
