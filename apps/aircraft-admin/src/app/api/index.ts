
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
  adminCreateSeatByClass: '/seatsByClass/admin/create',
  //AIRPORT
  adminGetAllAirports: '/airport/getAll',
  //AIRWAY
  adminGetAllAirways: '/airway/getAll',
  //FLIGHT
  adminGetAllFlight: '/flight/getAll',
  adminUpdateFlight: '/flight/admin/updateTime',
  adminCreateFlight: '/flight/admin/create',
  adminDeleteFlight: '/flight/delete',
  //TICKET
  adminGetAllTickets: '/ticket/getAll',
  //DISCOUNT
  adminGetAllDiscounts: '/discountEvent/getAll',
  //PROFILE
  adminGetAllProfile: '/profile/admin/allRecords'
})

export default API
