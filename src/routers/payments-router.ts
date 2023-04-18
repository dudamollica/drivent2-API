import { Router } from 'express';
import { authenticateToken } from '@/middlewares';
import paymentsController from '@/controllers/payments-controllers';

const paymentsRouter = Router();

paymentsRouter.get('/', authenticateToken, paymentsController.getTicketPayment);
paymentsRouter.post('/process', authenticateToken, paymentsController.paymentProcess);

export { paymentsRouter };
