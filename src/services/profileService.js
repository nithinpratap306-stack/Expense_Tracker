const PROFILE_KEY = 'student-expense-tracker:profile'
const SETTINGS_KEY = 'student-expense-tracker:settings'

export const DEFAULT_PROFILE = {
  name: 'Nithin Pratap',
  email: 'nithin.pratap@university.edu',
  role: 'Student',
  college: 'State University',
  course: 'Computer Science',
  yearOfStudy: '3rd Year',
  avatarInitials: 'NP',
}

export const DEFAULT_SETTINGS = {
  theme: 'system',
  currency: 'INR',
  defaultPaymentMethod: 'UPI',
  defaultCategory: 'Food',
  monthlyBudget: 8000,
  notifications: {
    budgetAlerts: true,
    spendingReminders: true,
    weeklySummary: false,
  },
}

function readJson(key, fallback) {
  try {
    const raw = localStorage.getItem(key)
    if (!raw) return fallback
    return { ...fallback, ...JSON.parse(raw) }
  } catch {
    return fallback
  }
}

export const profileService = {
  getProfile() {
    return readJson(PROFILE_KEY, DEFAULT_PROFILE)
  },

  saveProfile(profile) {
    const next = {
      ...DEFAULT_PROFILE,
      ...profile,
      avatarInitials: getInitials(profile.name || DEFAULT_PROFILE.name),
    }
    localStorage.setItem(PROFILE_KEY, JSON.stringify(next))
    return next
  },
}

export const settingsService = {
  getSettings() {
    const settings = readJson(SETTINGS_KEY, DEFAULT_SETTINGS)
    return {
      ...DEFAULT_SETTINGS,
      ...settings,
      notifications: {
        ...DEFAULT_SETTINGS.notifications,
        ...(settings.notifications ?? {}),
      },
    }
  },

  saveSettings(settings) {
    const next = {
      ...DEFAULT_SETTINGS,
      ...settings,
      notifications: {
        ...DEFAULT_SETTINGS.notifications,
        ...(settings.notifications ?? {}),
      },
    }
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(next))
    return next
  },
}

function getInitials(name) {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('')
}
