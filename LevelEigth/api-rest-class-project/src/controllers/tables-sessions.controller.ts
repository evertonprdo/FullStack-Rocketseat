import { NextFunction, Request, Response } from 'express'
import z from 'zod'

import { knex } from '@/database/knex'
import { AppError } from '@/utils/app.error'

export class TablesSessionsController {
   async create(request: Request, response: Response, next: NextFunction) {
      try {
         const bodySchema = z.object({
            table_id: z.number(),
         })

         const { table_id } = bodySchema.parse(request.body)

         const session = await knex<TablesSessionsRepository>('tables_sessions')
            .select()
            .where({ table_id })
            .orderBy('opened_at', 'desc')
            .first()

         if (session && !session.closed_at) {
            throw new AppError('Table in use')
         }

         await knex<TablesSessionsRepository>('tables_sessions').insert({
            table_id,
            opened_at: knex.fn.now(),
         })

         response.status(201).send()
      } catch (error) {
         next(error)
      }
   }

   async index(request: Request, response: Response, next: NextFunction) {
      try {
         const sessions = await knex<TablesSessionsRepository>(
            'tables_sessions',
         )
            .select()
            .orderBy('closed_at')

         response.json(sessions)
      } catch (error) {
         next(error)
      }
   }

   async update(request: Request, response: Response, next: NextFunction) {
      try {
         const id = z
            .string()
            .transform((value) => Number(value))
            .refine((value) => !isNaN(value), {
               message: 'id must be a number',
            })
            .parse(request.params.id)

         const session = await knex<TablesSessionsRepository>('tables_sessions')
            .where({ id })
            .first()

         if (!session) {
            throw new AppError('session table not found')
         }

         if (session.closed_at) {
            throw new AppError('This session table is already closed')
         }

         await knex<TablesSessionsRepository>('tables_sessions')
            .update({ closed_at: knex.fn.now() })
            .where({ id })

         response.status(204).send()
      } catch (error) {
         next(error)
      }
   }
}
