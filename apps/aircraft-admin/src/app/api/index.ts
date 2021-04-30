
const API = Object.freeze({
  login: '/auth/signin',
  getMe: '/auth/getMe',
  createAccount: '/account/create',
  getAllAccount: '/account/admin/getAll',
  getAccountProfile: '/profile/admin/get-one',
  updateAccount: '/account/admin/update',
  updateProfile: '/profile/admin/update-one',

  //CRAFT
  getAllCrafts: '/aircraft/getAll',
  adminCreateAircraft: '/aircraft/admin/create',
  adminGetDetailAircraft: '/aircraft/getById',
  adminDeleteAircraft: '/aircraft/admin/delete',
  adminUpdateAircraft: '/aircraft/admin/updateById',
  //CRAFT TYPE
  adminGetAllCraftType: '/aircraftType/getAll',
  adminCreateCraftType: '/aircraftType/admin/create',
  adminCreateCraftSeatByClass: '/seatsByClass/admin/create',
  //FLIGHT
  adminGetAllFlight: '/flight/getAll',
})

export default API
