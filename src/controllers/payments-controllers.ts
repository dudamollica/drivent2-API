import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import paymentsService from '@/services/payments-service/index';
import { badRequestError } from '@/errors';

async function getTicketPayment(req: Request, res: Response, next: NextFunction) {
    const userId = res.locals.userId;
  try {
    // const ticketPayment = await paymentsService.getTicketPayment();
    const ticketPayment =""
    res.status(httpStatus.OK).send(ticketPayment);
  } catch (e) {
    if (e.name != 'UnauthorizedError') return next(e);
    return res.status(httpStatus.UNAUTHORIZED).send({});
  }
}

async function paymentProcess(req: Request, res: Response, next: NextFunction) {
    const userId = res.locals.userId;
    const ticketId = req.body.ticketId
    const cardData = req.body.cardData
    if(!ticketId || !cardData) throw badRequestError("Bad Request Error")
  try {
    const cardIssuer = cardData.issuer
    const cardNumber = cardData.number
    const paymentProcess = await paymentsService.paymentProcess(userId, ticketId, cardIssuer, cardNumber);
    res.status(httpStatus.OK).send(paymentProcess);
  } catch (e) {
    if (e.name != 'UnauthorizedError') return next(e);
    return res.status(httpStatus.UNAUTHORIZED).send({});
  }
}

export default {
  paymentProcess,
  getTicketPayment
};
