import { Payment, TicketType } from '@prisma/client';
import { prisma } from '@/config';

async function getPaymentData(ticketId: number): Promise<Payment> {
  return await prisma.payment.findFirst({
    where: {
      ticketId: ticketId,
    },
  });
}

async function createPayment(
  ticketId: number,
  cardIssuer: string,
  cardLastDigits: string,
  value: number,
): Promise<Payment> {
  await prisma.payment.create({
    data: { ticketId, cardIssuer, cardLastDigits, value },
  });

  return await prisma.payment.findFirst({
    where: { ticketId: 1 },
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

export default {
  createPayment,
  getPaymentData,
};
