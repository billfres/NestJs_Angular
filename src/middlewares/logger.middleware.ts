import { Request, Response, NextFunction, request } from 'express';

//export const logger = (req: Request, res: Response, next: NextFunction) =>{ 
export function logger(req: Request, res: Response, next: NextFunction) {
  //console.log(`Request...`);
  console.log('my ip address:', req.ip);
  next();
};