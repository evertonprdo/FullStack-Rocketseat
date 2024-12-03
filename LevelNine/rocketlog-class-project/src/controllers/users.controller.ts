import { NextFunction, Request, Response } from 'express'

export class UsersController {
   create(request: Request, response: Response, next: NextFunction) {
      response.json({ message: 'OK' })
   }
}
