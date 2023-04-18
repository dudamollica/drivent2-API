import { notFoundError, unauthorizedError } from '@/errors';
import paymentsRepository from '@/repositories/payments-repository/index';
import ticketsRepository from '@/repositories/tickets-repository/index';
import userRepository from '@/repositories/user-repository/index';
import { Payment } from '@prisma/client';

async function getTicketPayment(ticketId: number, userId: number): Promise<Payment> {
  const ticket = await ticketsRepository.findTicket(ticketId);
  if (!ticket) throw notFoundError();
  const enrollmentId = ticket.enrollmentId;

  const enrollment = await ticketsRepository.findUserEnrollment(userId);

  if (enrollmentId != enrollment.id) throw unauthorizedError();

  const payment: Payment = await paymentsRepository.getPaymentData(ticketId);
  if (!payment) throw notFoundError();

  return payment;
}

async function paymentProcess(userId: number, ticketId: number, cardIssuer: string, cardNumber: number) {
  const user = await userRepository.findUserById(userId);
  if (!user) throw notFoundError();

  const ticket = await ticketsRepository.findTicket(ticketId);
  if (!ticket) throw notFoundError();

  const enrollment = await ticketsRepository.findUserEnrollment(userId);
  if (!enrollment) throw notFoundError();
  const enrollmentId = enrollment.id;

  if (ticket.enrollmentId != enrollmentId) throw unauthorizedError();

  let cardLastDigits = cardNumber.toString().substring(cardNumber.toString().length - 3);

  const ticketType = await ticketsRepository.getTicketTypeById(ticket.ticketTypeId);
  const value = ticketType.price;

  await ticketsRepository.ticketStatusPayed(ticketId);

  return await paymentsRepository.createPayment(ticketId, cardIssuer, cardLastDigits, value);
}

export default {
  getTicketPayment,
  paymentProcess,
};
