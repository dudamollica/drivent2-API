import {TicketType } from '@prisma/client';
import { prisma } from '@/config';

async function getTicketsTypes(): Promise<TicketType[]> {
    return await prisma.ticketType.findMany()
}

export default{
    getTicketsTypes
}