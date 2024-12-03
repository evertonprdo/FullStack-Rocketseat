import { Request, Response } from 'express'
import z from 'zod'

import { prisma } from '@/database/prisma'
import { AppError } from '@/utils/app.error'

export class DeliveryLogsController {
   async create(request: Request, response: Response) {
      const bodySchema = z.object({
         delivery_id: z.string().uuid(),
         description: z.string(),
      })

      const { delivery_id, description } = bodySchema.parse(request.body)

      const delivery = await prisma.delivery.findUnique({
         where: {
            id: delivery_id,
         },
      })

      if (!delivery) {
         throw new AppError('Delivery not found', 404)
      }

      if (delivery.status === 'delivered') {
         throw new AppError('That order has already been delivered')
      }

      if (delivery.status === 'processing') {
         throw new AppError('Change status to shipped')
      }

      await prisma.deliveryLog.create({
         data: {
            deliveryId: delivery_id,
            description,
         },
      })

      response.status(201).send()
   }

   async show(request: Request, response: Response) {
      const paramsSchema = z.object({
         delivery_id: z.string().uuid(),
      })

      const { delivery_id } = paramsSchema.parse(request.params)

      const delivery = await prisma.delivery.findUnique({
         where: { id: delivery_id },
         include: {
            user: true,
            logs: true,
         },
      })

      if (
         request.user?.role === 'customer' &&
         request.user.id !== delivery?.userId
      ) {
         throw new AppError('Users only can view their own deliveries', 401)
      }

      response.json(delivery)
   }
}
