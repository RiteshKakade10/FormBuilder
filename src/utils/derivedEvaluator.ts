export function evaluateDerivedExpression(expression: string, parents: Record<string, any>): string | number {
  if (!expression) return ''

  const ageMatch = expression.match(/age\(\s*([a-zA-Z0-9_\-]+)\s*\)/i)
  if (ageMatch) {
    const key = ageMatch[1]
    const dateStr = parents[key]
    if (!dateStr) return ''
    const d = new Date(dateStr)
    if (isNaN(d.getTime())) return ''
    const years = Math.floor((Date.now() - d.getTime()) / (1000 * 60 * 60 * 24 * 365.25))
    return years
  }

  let expr = expression
  Object.keys(parents).forEach((k) => {
    const val = parents[k]
    const safeVal =
      val === null || val === undefined || val === ''
        ? '0'
        : typeof val === 'number'
        ? String(val)
        : !isNaN(Number(val))
        ? String(Number(val))
        : `"${String(val).replace(/"/g, '\\"')}"`
    expr = expr.replace(new RegExp(`\\b${k}\\b`, 'g'), safeVal)
  })

  const safeChars = /^[0-9+\-*/().,"' \t]+$/
  if (!safeChars.test(expr)) return ''

  try {
    // limited evaluation
    // eslint-disable-next-line no-new-func
    const fn = new Function(`return (${expr});`)
    const res = fn()
    return res
  } catch {
    return ''
  }
}
