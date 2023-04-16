import ticketsRepository from "@/repositories/tickets-repository/index"
import { TicketType } from "@prisma/client";

async function getTicketsTypes() :  Promise<TicketType[]> {
    const ticketsTypes :  TicketType[] = await ticketsRepository.getTicketsTypes();
    return ticketsTypes;
  }

export default {
    getTicketsTypes
}