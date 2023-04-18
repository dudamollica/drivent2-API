import { Payment, TicketType } from '@prisma/client';
import { prisma } from '@/config';
import { PaymentProcess } from '@/protocols';

// async function getTicketsTypes(): Promise<TicketType[]> {
//   return await prisma.ticketType.findMany();
// }

async function createPayment(ticketId : number, cardIssuer: string, cardLastDigits: string, value: number): Promise<Payment> {
  await prisma.payment.create({
    data: {ticketId, cardIssuer, cardLastDigits, value},
  });

  return await prisma.payment.findFirst({
    where: { ticketId: 1},
    select: {
      id: true,
      ticketId: true,
      value: true,
      cardIssuer: true,
      cardLastDigits: true,
      createdAt: true,
      updatedAt: true,
    },
  });
}

// async function findUser(userId: number) {
//   return await prisma.user.findFirst({ where: { id: userId } });
// }

// async function findEnrollment(userId: number) {
//   return await prisma.enrollment.findFirst({ where: { userId: userId } });
// }

// async function createTicket(ticketTypeId: number, enrollmentId: number): Promise<TicketOutput>{
//   await prisma.ticket.create({
//     data: {
//       ticketTypeId: ticketTypeId,
//       enrollmentId: enrollmentId,
//       status: 'RESERVED',
//     },
//   });

//   return await prisma.ticket.findFirst({
//     where: { enrollmentId },
//     select: {
//       id: true,
//       status: true,
//       ticketTypeId: true,
//       enrollmentId: true,
//       TicketType: {
//         select: {
//           id: true,
//           name: true,
//           price: true,
//           isRemote: true,
//           includesHotel: true,
//           createdAt: true,
//           updatedAt: true,
//         },
//       },
//       createdAt: true,
//       updatedAt: true,
//     },
//   });
// }

export default {
  createPayment,
};
