import { badRequestError, notFoundError } from '@/errors';
import ticketsRepository from '@/repositories/tickets-repository/index';
import userRepository from '@/repositories/user-repository/index';
import { TicketType } from '@prisma/client';

async function getTicketsTypes(): Promise<TicketType[]> {
  const ticketsTypes: TicketType[] = await ticketsRepository.getTicketsTypes();
  return ticketsTypes;
}

async function myTickets(userId: number) {
  const user = await userRepository.findUserById(userId);
  if (!user) throw notFoundError();

  const enrollment = await ticketsRepository.findUserEnrollment(userId);
  if (!enrollment) throw notFoundError()
  const enrollmentId = enrollment.id;

  const tickets = await ticketsRepository.getUserTickets(enrollmentId);
  if(!tickets) throw notFoundError()
  return tickets;
}

async function createTicket(userId: number, ticketTypeId: number | void) {
  if (!ticketTypeId) throw badRequestError('Invalid data')

  const user = await userRepository.findUserById(userId);
  if (!user) throw notFoundError();

  const enrollment = await ticketsRepository.findUserEnrollment(userId);
  if (!enrollment) throw notFoundError();
  const enrollmentId = enrollment.id;
  return await ticketsRepository.createTicket(ticketTypeId, enrollmentId);
}

export default {
  getTicketsTypes,
  myTickets,
  createTicket,
};
