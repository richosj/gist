const THEMES = ['default', 'dark', 'navy', 'soft']
const STORAGE_KEY = 'gis-theme'

export function getTheme() {
  return localStorage.getItem(STORAGE_KEY) || 'default'
}

export function setTheme(name) {
  if (!THEMES.includes(name)) name = 'default'
  localStorage.setItem(STORAGE_KEY, name)
  document.documentElement.setAttribute('data-theme', name)
  return name
}

export function cycleTheme() {
  const current = getTheme()
  const idx = THEMES.indexOf(current)
  const next = THEMES[(idx + 1) % THEMES.length]
  return setTheme(next)
}

export function initTheme() {
  setTheme(getTheme())
}
