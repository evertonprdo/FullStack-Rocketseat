import { Request, Response, NextFunction } from 'express'
import { ZodError } from 'zod'
import { AppError } from '@/utils/app.error'

export function errorHandling(
   error: any,
   request: Request,
   response: Response,
   next: NextFunction,
) {
   if (error instanceof AppError) {
      response.status(error.statusCode).json({ message: error.message })
   }

   if (error instanceof ZodError) {
      response.status(400).json({
         message: 'Validation error',
         issues: error.format(),
      })
   }

   response.status(500).json({ message: error.message })
}
