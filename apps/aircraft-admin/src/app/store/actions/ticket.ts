import { adminGetAllTicket } from "../../services/ticket"
import { TICKET } from "../types"

export const getAllTickets = (params: string) => {
  return adminGetAllTicket(params).then(
    (res: any) => ({
      type: TICKET.GET_ALL_TICKET,
      payload: res.data
    }),
    (err: any) => ({
      type: TICKET.TICKET_ERROR,
      payload: err
    })
  )
}
