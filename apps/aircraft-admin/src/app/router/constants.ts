export const HOME = {
  LOGIN: { name: 'Login', path: ['/', '/login'] },

  HOME: { name: '', path: '/home' },

  ACCOUNT: { name: 'Account', path: '/home/account' },

  ACCOUNT_DETAIL: { name: 'Account Detail', path: '/home/account/detail/:id'},

  AIRCRAFT: { name: 'Aircraft', path: '/home/aircraft' },

  AIRCRAFT_DETAIL: { name: 'Aircraft Detail', path: '/home/aircraft/detail/:id' },

  AIRCRAFT_TYPE: { name: 'Aircraft Type', path: '/home/aircraft-type' },

  AIRCRAFT_CREATE: { name: 'Create Craft Type', path: '/home/aircraft-type/create' },

  AIRPORT: { name: 'Airport', path: '/home/airport' },

  AIRWAY: { name: 'Airway', path: '/home/airway' },

  FLIGHT: { name: 'Flight', path: '/home/flight' },

  TICKET: { name: 'Ticket', path: '/home/ticket' },

  NOMATCH: { name: '404 Not Found', path: '*' },
}
