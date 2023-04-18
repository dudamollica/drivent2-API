import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import paymentsService from '@/services/payments-service/index';
import { badRequestError } from '@/errors';
import { Payment } from '@prisma/client';

async function getTicketPayment(req: Request, res: Response, next: NextFunction) {
  if (!req.query.ticketId) throw badRequestError('Inform Ticket Id');
  const ticketId = req.query.ticketId as string;
  const userId = res.locals.userId as number;
  try {
    const payment: Payment = await paymentsService.getTicketPayment(parseInt(ticketId), userId);
    return res.status(httpStatus.OK).send(payment);
  } catch (e) {
    console.log(e);
    if (e.name != 'UnauthorizedError') return next(e);
    return res.status(httpStatus.UNAUTHORIZED).send({});
  }
}

async function paymentProcess(req: Request, res: Response, next: NextFunction) {
  const userId = res.locals.userId as number;
  const ticketId = req.body.ticketId as number;
  const cardData = req.body.cardData;
  if (!ticketId || !cardData) throw badRequestError('Bad Request Error');
  try {
    const cardIssuer = cardData.issuer;
    const cardNumber = cardData.number;
    const paymentProcess = await paymentsService.paymentProcess(userId, ticketId, cardIssuer, cardNumber);
    res.status(httpStatus.OK).send(paymentProcess);
  } catch (e) {
    if (e.name != 'UnauthorizedError') return next(e);
    return res.status(httpStatus.UNAUTHORIZED).send({});
  }
}

export default {
  paymentProcess,
  getTicketPayment,
};
