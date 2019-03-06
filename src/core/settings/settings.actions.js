export const settingsActions = {
  I18N_INITIALIZED: 'I18N_INITIALIZED',
  OFFLINE_MODE: 'OFFLINE_MODE',
  SET_DEPARTMENT: 'SET_DEPARTMENT',
  SET_CITY: 'SET_CITY',
  SET_LANG: 'SET_LANG',
  SET_LOCATION: 'SET_LOCATION',
  SET_TITLE: 'SET_TITLE',

  i18nInitialized: () => ({
    type: settingsActions.I18N_INITIALIZED
  }),

  setDepartment: department => ({
    type: settingsActions.SET_DEPARTMENT,
    payload: { department }
  }),

  setCity: city => ({
    type: settingsActions.SET_CITY,
    payload: { city }
  }),

  setLang: lang => ({
    type: settingsActions.SET_LANG,
    payload: { lang }
  }),

  setLocation: (lat, lng) => ({
    type: settingsActions.SET_LOCATION,
    payload: {
      location: {
        lat,
        lng
      }
    }
  }),

  setTitle: title => ({
    type: settingsActions.SET_TITLE,
    payload: { title }
  })
}
