import { Router } from 'express';
import { authenticateToken } from '@/middlewares';
import ticketsController from '@/controllers/tickets-controller';

const ticketsRouter = Router();

ticketsRouter.get('/', authenticateToken);
ticketsRouter.get('/types', authenticateToken,ticketsController.getTicketsTypes);
ticketsRouter.post('/', authenticateToken);

export { ticketsRouter };
