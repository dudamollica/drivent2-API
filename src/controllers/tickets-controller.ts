import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import ticketsServices from "@/services/tickets-service/index"

async function getTicketsTypes(req: Request, res: Response, next: NextFunction) {
    try {
      const ticketsTypes = await ticketsServices.getTicketsTypes();
      res.status(httpStatus.OK).send(ticketsTypes);
    } catch (e) {
      if(e.name != "UnauthorizedError") return next(e);
      return res.status(httpStatus.UNAUTHORIZED).send({});
    }
  }

  async function myTickets(req: Request, res: Response, next: NextFunction) {
    const userId = res.locals.userId;
    try {
        const myTickets = await ticketsServices.myTickets(userId);
        res.status(httpStatus.OK).send(myTickets);
      } catch (e) {
        if(e.name != "UnauthorizedError") return next(e);
        return res.status(httpStatus.UNAUTHORIZED).send({});
      }
  }

  async function createTicket(req: Request, res: Response, next: NextFunction) {
    const userId = res.locals.userId;
    const {ticketTypeId} = req.body
    try { 
        const ticket = await ticketsServices.createTicket(userId, ticketTypeId);
        res.status(httpStatus.CREATED).send(ticket);
      } catch (e) {
        if(e.name != "UnauthorizedError") return next(e);
        return res.status(httpStatus.UNAUTHORIZED).send(e.message);
      }
  }

  export default{
    getTicketsTypes,
    myTickets,
    createTicket
  }