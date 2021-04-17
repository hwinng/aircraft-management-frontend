
const API = Object.freeze({
  login: '/auth/signin',
  getMe: '/auth/getMe',
  createAccount: '/account/create',
  getAllAccount: '/account/admin/getAll',
  getAccountProfile: '/profile/admin/get-one',
  updateAccountByID: '/account/admin/update'
})

export default API
