import { Router } from 'express';
import { authenticateToken } from '@/middlewares';
import ticketsController from '@/controllers/tickets-controller';

const ticketsRouter = Router();

ticketsRouter.get('/', authenticateToken, ticketsController.myTickets);
ticketsRouter.get('/types', authenticateToken, ticketsController.getTicketsTypes);
ticketsRouter.post('/', authenticateToken, ticketsController.createTicket);

export { ticketsRouter };
