import { Request, Response } from 'express';
import httpStatus from 'http-status';
import ticketsServices from "@/services/tickets-service/index"

async function getTicketsTypes(req: Request, res: Response) {
    try {
      const ticketsTypes = await ticketsServices.getTicketsTypes();
      res.status(httpStatus.OK).send(ticketsTypes);
    } catch (e) {
      console.log(e);
      return res.status(httpStatus.UNAUTHORIZED).send({});
    }
  }

  export default{
    getTicketsTypes
  }