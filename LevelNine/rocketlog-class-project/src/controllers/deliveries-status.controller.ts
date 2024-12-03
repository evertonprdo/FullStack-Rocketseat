import { Request, Response } from 'express'
import z from 'zod'

import { prisma } from '@/database/prisma'

export class DeliveriesStatusController {
   async update(request: Request, response: Response) {
      const paramsSchema = z.object({
         id: z.string().uuid(),
      })

      const bodySchema = z.object({
         status: z.enum(['processing', 'shipped', 'delivered']),
      })

      const { id } = paramsSchema.parse(request.params)
      const { status } = bodySchema.parse(request.body)

      await prisma.delivery.update({
         data: {
            status,
         },
         where: {
            id,
         },
      })

      await prisma.deliveryLog.create({
         data: {
            deliveryId: id,
            description: status,
         },
      })

      response.status(204).send()
   }
}