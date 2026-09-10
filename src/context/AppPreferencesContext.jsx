import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { profileService, settingsService } from '@/services/profileService'

const AppPreferencesContext = createContext(null)

function applyTheme(theme) {
  const root = document.documentElement
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  const shouldUseDark = theme === 'dark' || (theme === 'system' && prefersDark)
  root.classList.toggle('dark', shouldUseDark)
}

export function AppPreferencesProvider({ children }) {
  const [profile, setProfile] = useState(() => profileService.getProfile())
  const [settings, setSettings] = useState(() => settingsService.getSettings())

  useEffect(() => {
    applyTheme(settings.theme)

    if (settings.theme !== 'system') return undefined

    const media = window.matchMedia('(prefers-color-scheme: dark)')
    const onChange = () => applyTheme('system')
    media.addEventListener('change', onChange)
    return () => media.removeEventListener('change', onChange)
  }, [settings.theme])

  const updateProfile = useCallback((nextProfile) => {
    const saved = profileService.saveProfile(nextProfile)
    setProfile(saved)
    return saved
  }, [])

  const updateSettings = useCallback((nextSettings) => {
    const saved = settingsService.saveSettings({
      ...settings,
      ...nextSettings,
      notifications: {
        ...settings.notifications,
        ...(nextSettings.notifications ?? {}),
      },
    })
    setSettings(saved)
    return saved
  }, [settings])

  const value = useMemo(
    () => ({
      profile,
      settings,
      updateProfile,
      updateSettings,
    }),
    [profile, settings, updateProfile, updateSettings],
  )

  return (
    <AppPreferencesContext.Provider value={value}>
      {children}
    </AppPreferencesContext.Provider>
  )
}

export function useAppPreferences() {
  const context = useContext(AppPreferencesContext)
  if (!context) {
    throw new Error('useAppPreferences must be used within an AppPreferencesProvider')
  }
  return context
}
