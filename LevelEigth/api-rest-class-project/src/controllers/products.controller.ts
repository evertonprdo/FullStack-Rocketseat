import { NextFunction, Request, Response } from 'express'
import z from 'zod'

import { knex } from '@/database/knex'
import { AppError } from '@/utils/app.error'

export class ProductController {
   async index(request: Request, response: Response, next: NextFunction) {
      try {
         const { name } = request.query
         const products = await knex<ProductRepository>('products')
            .select()
            .whereLike('name', `%${name ?? ''}%`)
            .orderBy('name')

         response.json(products)
      } catch (error) {
         next(error)
      }
   }

   async create(request: Request, response: Response, next: NextFunction) {
      try {
         const bodySchema = z.object({
            name: z.string().trim().min(6),
            price: z.number().gt(0),
         })

         const { name, price } = bodySchema.parse(request.body)

         await knex<ProductRepository>('products').insert({ name, price })

         response.status(201).send()
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

         const bodySchema = z.object({
            name: z.string().trim().min(6),
            price: z.number().gt(0),
         })

         const { name, price } = bodySchema.parse(request.body)

         const product = await knex<ProductRepository>('products')
            .select()
            .where({ id })
            .first()

         if (!product) {
            throw new AppError('Product not found')
         }

         await knex<ProductRepository>('products')
            .update({ name, price, updated_at: knex.fn.now() })
            .where({ id })

         response.status(204).send()
      } catch (error) {
         next(error)
      }
   }

   async remove(request: Request, response: Response, next: NextFunction) {
      try {
         const id = z
            .string()
            .transform((value) => Number(value))
            .refine((value) => !isNaN(value), {
               message: 'id must be a number',
            })
            .parse(request.params.id)

         const product = await knex<ProductRepository>('products')
            .select()
            .where({ id })
            .first()

         if (!product) {
            throw new AppError('Product not found')
         }

         await knex<ProductRepository>('products').delete().where({ id })

         response.status(204).send()
      } catch (error) {
         next(error)
      }
   }
}
