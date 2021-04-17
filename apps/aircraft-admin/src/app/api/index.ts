
const API = Object.freeze({
  login: '/auth/signin',
  getMe: '/auth/getMe',
  createAccount: '/account/create',
  getAllAccount: '/account/admin/getAll',
  getAccountProfile: '/profile/admin/get-one',
  updateAccount: '/account/admin/update',
  updateProfile: '/profile/admin/update-one'
})

export default API
