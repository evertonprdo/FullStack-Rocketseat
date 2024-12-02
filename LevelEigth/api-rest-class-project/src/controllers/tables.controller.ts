import { knex } from '@/database/knex'
import { NextFunction, Request, Response } from 'express'
export class TablesController {
   async index(request: Request, response: Response, next: NextFunction) {
      try {
         const tables = await knex<TableRepository>('tables')
            .select()
            .orderBy('table_number')

         response.json(tables)
      } catch (error) {
         next(error)
      }
   }
}
