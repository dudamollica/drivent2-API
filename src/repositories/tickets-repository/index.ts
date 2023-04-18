import { TicketType } from '@prisma/client';
import { prisma } from '@/config';
import { TicketOutput } from '@/protocols';

async function getTicketsTypes(): Promise<TicketType[]> {
  return await prisma.ticketType.findMany();
}

async function getTicketTypeById(ticketTypeId: number): Promise<TicketType> {
  return await prisma.ticketType.findFirst({ where: { id: ticketTypeId } });
}

async function ticketStatusPayed(id:number) {
  await prisma.ticket.update({where:{id}, data:{status:"PAID"}})
}

async function getUserTickets(enrollmentId: number): Promise<TicketOutput> {
  return await prisma.ticket.findFirst({
    where: { enrollmentId },
    select: {
      id: true,
      status: true,
      ticketTypeId: true,
      enrollmentId: true,
      TicketType: {
        select: {
          id: true,
          name: true,
          price: true,
          isRemote: true,
          includesHotel: true,
          createdAt: true,
          updatedAt: true,
        },
      },
      createdAt: true,
      updatedAt: true,
    },
  });
}

async function findUserEnrollment(userId: number) {
  return await prisma.enrollment.findFirst({ where: { userId: userId } });
}

async function createTicket(ticketTypeId: number, enrollmentId: number): Promise<TicketOutput> {
  await prisma.ticket.create({
    data: {
      ticketTypeId: ticketTypeId,
      enrollmentId: enrollmentId,
      status: 'RESERVED',
    },
  });

  return await prisma.ticket.findFirst({
    where: { enrollmentId },
    select: {
      id: true,
      status: true,
      ticketTypeId: true,
      enrollmentId: true,
      TicketType: {
        select: {
          id: true,
          name: true,
          price: true,
          isRemote: true,
          includesHotel: true,
          createdAt: true,
          updatedAt: true,
        },
      },
      createdAt: true,
      updatedAt: true,
    },
  });
}

async function findTicket(ticketId: number) {
  return await prisma.ticket.findFirst({ where: { id: ticketId } });
}

export default {
  getTicketsTypes,
  getTicketTypeById,
  getUserTickets,
  createTicket,
  findUserEnrollment,
  findTicket,
  ticketStatusPayed
};
